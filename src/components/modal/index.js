import Button from '../Button.vue';

export default {
    name: 'Modal',
    props: {
        size: {
            type: String
        },
        show: {
            type: Boolean
        },
        hideFooter: {
            type: Boolean,
            default: false
        }
    },
    model: {
        prop: 'show',
        event: 'cancel'
    },
    render(h) {
        if (this.show) {
            return h(
                'transition',
                {
                    attrs: {
                        name: 'modal',
                        appear: true
                    }
                },
                [
                    h(
                        'div',
                        {
                            staticClass: 'modal-mask'
                        },
                        [
                            h(
                                'div',
                                {
                                    staticClass: 'modal-wrapper',
                                    class: 'modal-' + this.size
                                },
                                [this.setupModal(h)]
                            )
                        ]
                    )
                ]
            );
        }
    },
    methods: {
        cancel() {
            this.$emit('cancel', false);
        },
        save() {
            this.$emit('save');
        },
        setupModal(h) {
            return h(
                'div',
                {
                    class: 'modal-container'
                },
                [this.setupHeader(h), this.setupBody(h), this.setupFooter(h)]
            );
        },
        setupHeader(h) {
            if (this.$slots.header) {
                return h(
                    'div',
                    {
                        class: 'modal-header'
                    },
                    this.$slots.header
                );
            } else if (this.$slots.title) {
                return h(
                    'div',
                    {
                        class: 'modal-header'
                    },
                    [this.setupHeaderTitle(h, this.$slots.title), this.setupHeaderCloseButton(h)]
                );
            } else {
                return h(
                    'div',
                    {
                        class: 'modal-header'
                    },
                    [this.setupHeaderTitle(h), this.setupHeaderCloseButton(h)]
                );
            }
        },
        setupHeaderTitle(h, slot) {
            return h('h4', {}, slot);
        },
        setupHeaderCloseButton(h) {
            return h('a', {
                class: 'modal-close',
                on: {
                    click: this.cancel
                }
            });
        },
        setupBody(h) {
            return h(
                'div',
                {
                    class: 'modal-body'
                },
                this.$slots.body
            );
        },
        /*
         * Footer should be visible with default buttons if slot not provided
         */
        setupFooter(h) {
            if (this.$slots.footer) {
                return h(
                    'div',
                    {
                        class: 'modal-footer'
                    },
                    this.$slots.footer
                );
            } else if (!this.hideFooter) {
                return h(
                    'div',
                    {
                        class: 'modal-footer'
                    },
                    [this.setupFooterButtons(h)]
                );
            }
        },
        setupFooterButtons(h) {
            return [
                h(Button, {
                    props: {
                        type: 'border-primary',
                        action: this.cancel,
                        text: 'Cancel'
                    }
                }),
                h(Button, {
                    props: {
                        type: 'primary',
                        action: this.save,
                        text: 'OK'
                    }
                })
            ];
        }
    },
    mounted() {
        this.$root.$el.append(this.$el);
    },
    destroyed() {
        this.$el.parentNode.removeChild(this.$el);
    }
};
