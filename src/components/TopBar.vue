<template>
    <div class="topbar">
        <div class="topbar-logo" v-if="logo" :class="logo.mobile ? 'mobile-visible' : ''">
            <img :src="logo.url" alt="" />
        </div>
        <h3 class="topbar-page-title" v-if="pageTitle" :class="[pageTitle.mobile ? 'mobile-visible' : '', pageTitle.align ? 'align-' + pageTitle.align : '']">{{ pageTitle.text }}</h3>
        <div class="topbar-options">
            <a class="search-box" :class="searchOptions.mobile ? 'mobile-visible' : ''" v-if="searchOptions">
                <input
                    type="text"
                    :placeholder="searchOptions.placeholder"
                    :value="searchText"
                    @input="$emit('update:search-text', $event.target.value)"
                    :readonly="searchOptions.clickAction"
                    @click="handleAction(searchOptions.clickAction)"
                />
            </a>
            <div v-if="topbarOptions" class="topbar-options-wrapper">
                <div class="topbar-option" v-for="(option, key) in topbarOptions" :key="key" :class="option.mobile ? 'mobile-visible' : ''">
                    <Tooltip :message="option.text" position="bottom" v-if="option.type == 'icon'">
                        <a class="topbar-option-icon" :href="option.href" @click="handleAction(option.clickAction)">
                            <Badge :size="12" overlap="circle" color="#FC5A5A" v-if="option.pending" position="top-right">
                                <i class="material-icons">{{ option.icon }}</i>
                            </Badge>
                            <i v-else class="material-icons">{{ option.icon }}</i>
                        </a>
                    </Tooltip>
                    <Button v-else size="sm" :type="option.btnClass" :text="option.text" :action="option.clickAction">
                        <i class="material-icons" v-if="option.icon">{{ option.icon }}</i>
                    </Button>
                </div>
            </div>
            <slot></slot>
        </div>
        <AvatarInfo v-bind="allAvatarOptions" v-if="allAvatarOptions">
            <template v-slot:avatar>
                <Avatar
                    :text="avatarOptions.title"
                    :size="avatarOptions.size"
                    :variant="avatarOptions.variant"
                    :gravatar-email="avatarOptions.gravatarEmail"
                    :image-url="avatarOptions.imageUrl"
                ></Avatar>
            </template>
            <template v-slot:avatarActions>
                <slot name="topbarAvatarActions"></slot>
            </template>
        </AvatarInfo>
    </div>
</template>

<script>
import AvatarInfo from './AvatarInfo';
import Avatar from './Avatar';
import Tooltip from './Tooltip';
import Button from './Button';
import Badge from './Badge';

export default {
    name: 'TopBar',
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
    components: {
        AvatarInfo,
        Avatar,
        Tooltip,
        Button,
        Badge
    },
    data() {
        return {
            allAvatarOptions: null
        };
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
    }
};
</script>
