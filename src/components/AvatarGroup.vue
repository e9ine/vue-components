<template>
    <div class="avatar-group" :style="{marginLeft: avatarSize / 6 + 'px'}">
        <Avatar
            :text="item.text"
            :size="avatarSize"
            :image-url="item.imageUrl"
            :gravatar-email="item.gravatarEmail"
            v-for="(item, index) in avatarsToDisplay"
            :key="index"
            :style="{'z-index': avatars.length - index, marginLeft: -(avatarSize / 6) + 'px'}"
        ></Avatar>
        <div class="avatar avatar-count" v-if="avatars.length > max" :style="{marginLeft: -(avatarSize / 6) + 'px'}">
            <div class="wrapper" :style="{width: avatarSize + 'px', height: avatarSize + 'px'}">
                <p :style="{fontSize: avatarSize / 2.5 + 'px'}">+{{ avatars.length - max }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from './Avatar.vue';

export default {
    name: 'AvatarGroup',
    props: {
        avatars: {
            type: Array
        },
        avatarSize: {
            type: Number,
            required: true,
            default: 48
        },
        max: {
            type: Number,
            default: 3
        }
    },
    components: {
        Avatar
    },
    computed: {
        avatarsToDisplay: function() {
            if (this.max) {
                return this.avatars.slice(0, this.max);
            } else {
                return this.avatars;
            }
        }
    }
};
</script>
