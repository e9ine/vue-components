<template>
    <div>
        <h4>Initials</h4>
        <avatar text="John Hugh" :size="160" />
        <div class="spacer-v" />
        <h4>Gravatar Email</h4>
        <avatar gravatar-email="jitewaboh@lagify.com" :size="120" />
        <div class="spacer-v" />
        <h4>Image Url</h4>
        <avatar image-url="https://m.media-amazon.com/images/M/MV5BOThhZTkxMWMtY2UyYS00MTdlLTk1ZmMtZWQ0OWFkZjE2YTA1XkEyXkFqcGdeQXVyMjU0ODI4MzY@._V1_UX172_CR0,0,172,256_AL_.jpg" :size="80" />
        <div class="spacer-v" />
        <h4>Square</h4>
        <avatar
            variant="square"
            image-url="https://m.media-amazon.com/images/M/MV5BOThhZTkxMWMtY2UyYS00MTdlLTk1ZmMtZWQ0OWFkZjE2YTA1XkEyXkFqcGdeQXVyMjU0ODI4MzY@._V1_UX172_CR0,0,172,256_AL_.jpg"
            :size="80"
        />
        <div class="spacer-v" />
        <h4>Rounded</h4>
        <avatar
            variant="rounded"
            image-url="https://m.media-amazon.com/images/M/MV5BOThhZTkxMWMtY2UyYS00MTdlLTk1ZmMtZWQ0OWFkZjE2YTA1XkEyXkFqcGdeQXVyMjU0ODI4MzY@._V1_UX172_CR0,0,172,256_AL_.jpg"
            :size="80"
        />
    </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue';

export default {
    name: 'AvatarExample',
    components: {
        Avatar
    }
};
</script>

<style lang="scss" scoped></style>
