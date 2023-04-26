<template>
    <div :class="classObject">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Shimmer',
    props: {
        rounded: {
            type: Boolean,
            default: false
        },
        centered: {
            type: Boolean,
            default: false
        },
        animated: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        classObject() {
            return {
                shimmer: true,
                'shimmer-is-rounded': this.rounded,
                'shimmer-is-centered': this.centered,
                'shimmer-is-animated': this.animated
            };
        }
    }
};
</script>
