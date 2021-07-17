<template>
    <transition name="modal" appear>
        <div class="modal-mask" :class="centered ? 'centered' : ''">
            <div class="modal-wrapper" :class="'modal-' + size">
                <div class="modal-container">
                    <slot v-if="$slots.header" name="header"></slot>
                    <div v-else>
                        <div class="modal-header">
                            <h4>
                                <slot name="title">Modal Title</slot>
                            </h4>
                            <a href="" class="modal-close" @click.prevent="close"><img src="https://storage.googleapis.com/page9-dev-bucket/vue-components/close-dark.svg" alt="" /></a>
                        </div>
                    </div>
                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>
                    <div class="modal-footer" v-if="$slots.footer">
                        <slot name="footer"> </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'ModalDialog',
    props: {
        size: {
            type: String,
            default: 'md'
        },
        centered: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        close() {
            this.$emit('closed');
        }
    },
    mounted() {
        this.$emit('opened');
    }
};
</script>
