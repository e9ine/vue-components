<template>
    <div ref="chip" class="chip">
        <slot name="pre" />
        {{ text }} <i v-if="!hideRemove" class="material-icons" @click="$emit('removed', value)">cancel</i>
        <slot name="post" />
    </div>
</template>

<script>
export default {
    name: 'Chip',
    props: {
        text: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        hideRemove: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        let height = this.$refs.chip.clientHeight;
        this.$refs.chip.style.borderRadius = height / 2 + 'px';
    }
};
</script>
