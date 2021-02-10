<template>
    <transition name="fade">
        <div v-if="show" :class="{relative: relative}">
            <div class="overlay" :style="getOpacity">
                <img src="@e9ine/vue_components/src/assets/close.svg" class="close" v-show="showClose && relative" @click="close" />
                <div class="overlay-content" :class="customContentClass">
                    <img src="@e9ine/vue_components/src/assets/close-dark.svg" class="close" v-show="showClose && !relative" @click="close" />
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'Overlay',
    props: {
        customContentClass: {
            type: String
        },
        show: {
            type: Boolean,
            default: false
        },
        showClose: {
            type: Boolean,
            default: true
        },
        relative: {
            type: Boolean,
            default: false
        },
        opacity: {
            type: Number,
            default: 0.6,
            validator: (value) => {
                return !value || (value <= 1 && value > 0);
            }
        }
    },
    methods: {
        close() {
            this.$emit('update:show', false);
        }
    },
    computed: {
        getOpacity() {
            return {
                'background-color': 'rgba(33, 33, 33,' + this.opacity + ')'
            };
        }
    }
};
</script>
