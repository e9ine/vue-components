<template>
    <button class="icon-button" @click="action">
        <Icon :name="icon" />
    </button>
</template>

<script>
import Icon from '../../components/rich-text/Icon.vue';
export default {
    name: 'IconButton',
    components: {
        Icon
    },
    props: {
        icon: {
            type: String,
            required: true
        },
        action: {
            type: Function,
            default: () => {}
        }
    }
};
</script>

<style scoped></style>
