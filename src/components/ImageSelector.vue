<template>
    <Modal v-model="showModal" :size="size" hide-footer :primary="$attrs.primary" @cancel="cancel">
        <template #title>
            Select &amp; Crop Image
        </template>
        <template #body>
            <p>Please choose an image and crop the section you would like to upload.</p>
            <div class="mt16">
                <h5>1. Choose File</h5>
                <input id="file-upload" ref="fileUpload" type="file" accept="image/*" @change="fileUploaded" />
                <label for="file-upload" class="custom-file-upload">
                    <span class="btn btn-sm btn-primary">Choose file</span><span>{{ upload.chosen ? upload.chosen.name : 'No file chosen' }}</span>
                </label>
            </div>
            <div v-if="upload.src" class="mt16">
                <h5>2. Crop Image</h5>
                <cropper ref="cropper" classname="cropper" :src="upload.src" :stencil-props="stencilProps" @change="onChange" />
            </div>
            <div v-if="upload.src" class="upload-actions mt16">
                <h5>3. Confirm</h5>
                <Button text="Upload Uncropped" type="primary" :disabled="!isValid" :action="selectFullImage">
                    <i class="material-icons">crop_free</i>
                </Button>
                <Button text="Upload Cropped" type="dark-grey" :disabled="!isValid" :action="selectCroppedImage">
                    <i class="material-icons">crop</i>
                </Button>
            </div>
        </template>
    </Modal>
</template>

<script>
import {Cropper} from 'vue-advanced-cropper';
import Modal from './modal';
import Button from './Button.vue';

export default {
    name: 'ImageSelector',
    components: {
        Cropper,
        Modal,
        Button
    },
    model: {
        prop: 'show',
        event: 'cancel'
    },
    props: {
        show: {
            type: Boolean
        },
        size: {
            type: String,
            default: 'lg'
        },
        config: {
            type: Object,
            default: () => {
                return {
                    maxSize: 5,
                    aspectRatio: 0,
                    minWidth: null
                };
            }
        }
    },
    data() {
        return {
            showModal: false,
            upload: {
                chosen: null,
                src: null
            },
            position: {
                left: 0,
                top: 0,
                width: 0,
                height: 0
            },
            stencilProps: {
                aspectRatio: this.config.aspectRatio
            },
            options: {
                minWidth: this.config.minWidth
            },
            isValid: false,
            showCropper: true
        };
    },
    watch: {
        show: function(newVal) {
            this.showModal = newVal;
        }
    },
    mounted() {
        this.showModal = this.show;
    },
    methods: {
        close(image, cropInfo, src) {
            this.$emit('close', {image, cropInfo, src});
            this.$emit('cancel', false);
        },
        cancel() {
            this.$emit('cancel', false);
        },
        extractImage() {
            let img = new Image();
            let reader = new FileReader();
            img.onload = () => {
                // Image Validation
                if (this.config.minWidth) {
                    if (img.width < this.config.minWidth) {
                        alert(`Image width should be at least ${this.config.minWidth}px wide.`);
                        return;
                    } else if (this.config.aspectRatio && img.width / this.config.aspectRatio > img.height) {
                        alert('Image does not match the required specification.');
                        return;
                    }
                }
                if (this.config.maxSize && this.upload.chosen.size > 1024 * 1024 * this.config.maxSize) {
                    alert(`Image exceeds the minimum size of ${this.config.maxSize}MB.`);
                    return;
                }

                // Image is validated
                this.isValid = true;
                reader.onload = (e) => {
                    this.upload.src = e.target.result;
                };
                reader.readAsDataURL(this.upload.chosen);
            };
            img.src = window.URL.createObjectURL(this.upload.chosen);
        },
        fileUploaded() {
            // This is executed when user selects an image.
            this.upload.chosen = this.$refs.fileUpload.files[0];
            this.isValid = false;
            this.extractImage();
        },
        onChange({coordinates}) {
            this.position = coordinates;
        },
        async selectFullImage() {
            try {
                let formData = new window.FormData();
                formData.append('file', this.upload.chosen);
                this.close(formData, null, this.upload.src);
            } catch (err) {
                console.error(err);
            }
        },
        async selectCroppedImage() {
            try {
                let formData = new window.FormData();
                formData.append('file', this.upload.chosen);

                let bodyObj = {
                    cropx: this.position.left,
                    cropy: this.position.top,
                    cropw: this.position.width,
                    croph: this.position.height
                };
                const {canvas} = this.$refs.cropper.getResult();
                this.close(formData, bodyObj, canvas.toDataURL());
            } catch (err) {
                console.error(err);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
input[type='file'] {
    display: none;
}
.custom-file-upload {
    display: inline-block;
    .btn {
        margin-right: 0.5rem;
    }
}
.upload-actions {
    .btn:first-of-type {
        margin-right: 1rem;
        margin-bottom: 1rem;
    }
}
</style>
