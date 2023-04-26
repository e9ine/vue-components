<template>
    <div class="topbar">
        <div v-if="logo" class="topbar-logo" :class="logo.mobile ? 'mobile-visible' : ''">
            <img :src="logo.url" alt="" />
        </div>
        <h3 v-if="pageTitle" class="topbar-page-title" :class="[pageTitle.mobile ? 'mobile-visible' : '', pageTitle.align ? 'align-' + pageTitle.align : '']">
            {{ pageTitle.text }}
        </h3>
        <div class="topbar-options">
            <a v-if="searchOptions" class="search-box" :class="searchOptions.mobile ? 'mobile-visible' : ''">
                <input
                    type="text"
                    :placeholder="searchOptions.placeholder"
                    :value="searchText"
                    :readonly="searchOptions.clickAction"
                    @input="$emit('update:search-text', $event.target.value)"
                    @click="handleAction(searchOptions.clickAction)"
                />
            </a>
            <div v-if="topbarOptions" class="topbar-options-wrapper">
                <div v-for="(option, key) in topbarOptions" :key="key" class="topbar-option" :class="option.mobile ? 'mobile-visible' : ''">
                    <Tooltip v-if="option.type == 'icon'" :message="option.text" position="bottom">
                        <a class="topbar-option-icon" :href="option.href" @click="handleAction(option.clickAction)">
                            <Badge v-if="option.pending" :size="12" overlap="circle" color="#FC5A5A" position="top-right">
                                <i class="material-icons">{{ option.icon }}</i>
                            </Badge>
                            <i v-else class="material-icons">{{ option.icon }}</i>
                        </a>
                    </Tooltip>
                    <Button v-else size="sm" :type="option.btnClass" :text="option.text" :action="option.clickAction">
                        <i v-if="option.icon" class="material-icons">{{ option.icon }}</i>
                    </Button>
                </div>
            </div>
            <slot />
        </div>
        <AvatarInfo v-if="allAvatarOptions" v-bind="allAvatarOptions">
            <template #avatar>
                <Avatar :text="avatarOptions.title" :size="avatarOptions.size" :variant="avatarOptions.variant" :gravatar-email="avatarOptions.gravatarEmail" :image-url="avatarOptions.imageUrl" />
            </template>
            <template #avatarActions>
                <slot name="topbarAvatarActions" />
            </template>
        </AvatarInfo>
    </div>
</template>

<script>
import AvatarInfo from './AvatarInfo.vue';
import Avatar from './Avatar.vue';
import Tooltip from './Tooltip.vue';
import Button from './Button.vue';
import Badge from './Badge.vue';

export default {
    name: 'TopBar',
    components: {
        AvatarInfo,
        Avatar,
        Tooltip,
        Button,
        Badge
    },
    props: {
        logo: {
            type: Object
        },
        pageTitle: {
            type: Object
        },
        avatarOptions: {
            type: Object
        },
        topbarOptions: {
            type: Array
        },
        searchOptions: {
            type: Object
        },
        searchText: {
            type: String
        }
    },
    data() {
        return {
            allAvatarOptions: null
        };
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        });
    },
    created() {
        this.onResize();
    },
    methods: {
        handleAction(fn) {
            if (fn) {
                return fn();
            } else {
                return false;
            }
        },
        onResize() {
            this.allAvatarOptions = $.extend(true, {}, this.avatarOptions);
            if (this.avatarOptions.subtitleOptions && window.innerWidth < 991.98) {
                if (typeof this.allAvatarOptions.avatarActions !== 'undefined' && this.allAvatarOptions.avatarActions.length > 0) {
                    this.allAvatarOptions.avatarActions.push({
                        name: this.avatarOptions.subtitle,
                        href: this.avatarOptions.subtitleOptions.href,
                        clickAction: this.avatarOptions.subtitleOptions.clickAction
                    });
                } else {
                    this.allAvatarOptions.avatarActions = [
                        {
                            name: this.avatarOptions.subtitle,
                            href: this.avatarOptions.subtitleOptions.href,
                            clickAction: this.avatarOptions.subtitleOptions.clickAction
                        }
                    ];
                }
            }
        }
    }
};
</script>
