<template>
    <transition name="modal" appear>
        <div class="modal-mask" :class="centered ? 'centered' : ''">
            <div class="modal-wrapper" :class="'modal-' + size">
                <div class="modal-container">
                    <slot v-if="$slots.header" name="header" />
                    <div v-else>
                        <div class="modal-header">
                            <h4>
                                <slot name="title">
                                    Modal Title
                                </slot>
                            </h4>
                            <a href="" class="modal-close" @click.prevent="close"><img src="../../assets/close-dark.svg?url" alt=""/></a>
                        </div>
                    </div>
                    <div class="modal-body">
                        <slot name="body" />
                    </div>
                    <div v-if="$slots.footer" class="modal-footer">
                        <slot name="footer" />
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
    mounted() {
        this.$emit('opened');
    },
    methods: {
        close() {
            this.$emit('closed');
        }
    }
};
</script>
