<template>
    <button class="btn" type="button" :class="['btn-' + size, 'btn-' + type, customClass]" :disabled="isLoading || disabled" @click="callAction" :style="backgroundColor" ref="button">
        <span class="icon" v-if="$slots.default && !isLoading">
            <slot></slot>
        </span>
        <img class="loader" v-show="isLoading" :src="loaderImageUrl" />
        <span v-show="loaderText && isLoading">{{ loaderText }}</span>
        <span v-show="!isLoading">
            {{ text }}
        </span>
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        action: {
            type: Function,
            default: () => {}
        },
        async: {
            type: Boolean,
            default: false
        },
        color: {
            type: String
        },
        customClass: {
            type: String
        },
        disabled: {
            type: Boolean,
            default: false
        },
        loaderText: {
            type: String
        },
        loaderImage: {
            type: String
        },
        size: {
            type: String,
            validator: (value) => {
                return ['xs', 'sm', 'md', 'lg'].indexOf(value) > -1 || !value;
            },
            default: 'md'
        },
        text: {
            type: String
        },
        type: {
            type: String,
            default: 'primary'
        }
    },
    data() {
        return {
            isLoading: false,
            actions: {}
        };
    },
    methods: {
        async callAction() {
            if (this.isLoading) return;
            if (this.async) {
                let oldWidth = this.$refs.button.style.width;
                this.$refs.button.style.width = this.$refs.button.offsetWidth + 'px';
                this.isLoading = true;
                try {
                    await this.actions.click();
                    this.isLoading = false;
                } catch (e) {
                    this.isLoading = false;
                }
                if (this.$refs.button) this.$refs.button.style.width = oldWidth;
            } else {
                this.action();
            }
        }
    },
    computed: {
        backgroundColor() {
            if (this.color) {
                return {
                    'background-color': this.color
                };
            }
            return {};
        },
        loaderImageUrl() {
            if (this.loaderImage) {
                return this.loaderImage;
            }
            return 'https://storage.googleapis.com/page9-dev-bucket/vue-components/loader.svg';
        }
    },
    created() {
        this.$set(this.actions, 'click', () => {
            return new Promise(async (resolve, reject) => {
                try {
                    await this.action();
                    resolve();
                } catch (err) {
                    return reject(err);
                }
            });
        });
    }
};
</script>
