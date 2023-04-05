<template>
    <transition name="fade">
        <div v-if="show" :class="{relative: relative}">
            <div class="overlay" :style="getOpacity">
                <img v-show="showClose && relative" src="../assets/close.svg?url" class="close" @click="close" />
                <div class="overlay-content" :class="customContentClass">
                    <img v-show="showClose && !relative" src="../assets/close-dark.svg?url" class="close" @click="close" />
                    <slot />
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
    computed: {
        getOpacity() {
            return {
                'background-color': 'rgba(33, 33, 33,' + this.opacity + ')'
            };
        }
    },
    methods: {
        close() {
            this.$emit('update:show', false);
        }
    }
};
</script>
