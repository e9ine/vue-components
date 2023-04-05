export const ModalMixin = {
    props: {
        show: Boolean,
        default: false
    },
    methods: {
        cancel() {
            this.$emit('close', false);
        }
    }
};
