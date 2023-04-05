<template>
    <div>
        <AvatarGroup :avatar-size="48" :avatars="avatars" :max="3" />
    </div>
</template>

<script>
import AvatarGroup from '@/components/AvatarGroup.vue';
export default {
    name: 'AvatarGroupExample',
    components: {
        AvatarGroup
    },
    data() {
        return {
            avatars: [
                {
                    imageUrl: 'https://66.media.tumblr.com/3f6c3a89a576a4a09a2ea18c5f2d5da9/tumblr_pk0lqkbqM31ss2e34o1_1280.jpg'
                },
                {
                    imageUrl: 'https://m.media-amazon.com/images/M/MV5BOThhZTkxMWMtY2UyYS00MTdlLTk1ZmMtZWQ0OWFkZjE2YTA1XkEyXkFqcGdeQXVyMjU0ODI4MzY@._V1_UX172_CR0,0,172,256_AL_.jpg'
                },
                {
                    text: 'Will Smith'
                },
                {
                    imageUrl: 'https://66.media.tumblr.com/3f6c3a89a576a4a09a2ea18c5f2d5da9/tumblr_pk0lqkbqM31ss2e34o1_1280.jpg'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
