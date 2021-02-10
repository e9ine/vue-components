<template>
    <div class="avatar-info">
        <div class="avatar-wrapper">
            <slot name="avatar"> </slot>
        </div>
        <div class="info-wrapper" v-if="title || subtitle">
            <h4>{{ title }}</h4>
            <p>
                <a :href="subtitleOptions.href" @click="handleAction(subtitleOptions.clickAction)" v-if="subtitleOptions.href || subtitleOptions.clickAction">
                    {{ subtitle }}
                </a>
                <span v-else>
                    {{ subtitle }}
                </span>
            </p>
        </div>
        <div class="avatar-actions-wrapper" v-if="avatarActions || $slots.avatarActions" v-click-outside="hideAvatarActions">
            <a class="avatar-actions-toggle" @click="toggleAvatarActions = !toggleAvatarActions">
                <span class="material-icons">
                    arrow_drop_down
                </span>
            </a>
            <div class="avatar-actions-container" v-show="toggleAvatarActions">
                <slot name="avatarActions">
                    <div class="avatar-actions">
                        <a v-for="(action, key) in avatarActions" :key="key" :href="action.href" @click="handleAction(action.clickAction)">
                            {{ action.name }}
                        </a>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
require('../directives/v-click-outside');
export default {
    name: 'AvatarInfo',
    props: {
        title: {
            type: String
        },
        subtitle: {
            type: String
        },
        subtitleOptions: {
            type: Object,
            default: () => {
                return {};
            }
        },
        avatarActions: {
            type: Array
        }
    },
    data() {
        return {
            toggleAvatarActions: false
        };
    },
    methods: {
        handleAction(fn) {
            if (fn) {
                fn();
            } else {
                return false;
            }
        },
        hideAvatarActions() {
            this.toggleAvatarActions = false;
        }
    }
};
</script>
