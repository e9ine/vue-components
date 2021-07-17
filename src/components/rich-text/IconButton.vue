<template>
    <button class="icon-button" @click="action">
        <Icon :name="icon" />
    </button>
</template>

<script>
import Icon from '../../components/rich-text/Icon.vue';
export default {
    name: 'IconButton',
    props: {
        icon: {
            type: String,
            required: true
        },
        action: {
            type: Function,
            default: () => {}
        }
    },
    components: {
        Icon
    }
};
</script>

<style scoped></style>
