<template>
    <div :class="className">
        <div v-if="img" :class="`${className}-img`" />
        <div :class="`${className}-content`">
            <div :class="`${className}-title`" />
            <div :class="`${className}-subtitle`" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShimmerHeading',
    props: {
        img: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            className: 'shimmer-heading'
        };
    }
};
</script>
