<template>
    <div :class="className">
        <div v-for="n in lines" :key="n" :class="`${className}-line`" />
    </div>
</template>

<script>
export default {
    name: 'ShimmerText',
    props: {
        lines: {
            type: Number,
            default: 4
        }
    },
    data() {
        return {
            className: 'shimmer-text'
        };
    }
};
</script>
