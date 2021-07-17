<template>
    <div class="page layout-variation-3" :class="[showBackBtn && $route.fullPath.split('/').length > 2 ? 'show-back-btn' : '']">
        <slot name="topbar" v-if="$slots.topbar"></slot>
        <div class="mobile-topbar" v-else>
            <transition name="fade">
                <h4 class="mobile-topbar-page-title" v-show="showNavTitle">{{ $route.name }}</h4>
            </transition>
            <a id="back-nav" v-if="showBackBtn && $route.fullPath.split('/').length > 2" @click="$router.go(-1)">
                <i class="material-icons">arrow_back_ios</i>
            </a>
            <div class="mobile-topbar-options mobile-topbar-left-options" v-else>
                <div class="mobile-topbar-option" v-for="(option, key) in topbarLeftOptions" :key="key">
                    <Tooltip :message="option.text" position="right" v-if="option.type == 'icon'">
                        <a class="topbar-option-icon" :href="option.href" @click="handleAction(option.clickAction)">
                            <i class="material-icons">{{ option.icon }}</i>
                        </a>
                    </Tooltip>
                    <a v-else :href="option.href" @click="handleAction(option.clickAction)">
                        {{ option.text }}
                    </a>
                </div>
            </div>
            <div class="mobile-topbar-options">
                <div class="mobile-topbar-option" v-for="(option, key) in topbarRightOptions" :key="key">
                    <Tooltip :message="option.text" position="left" v-if="option.type == 'icon'">
                        <a class="topbar-option-icon" :href="option.href" @click="handleAction(option.clickAction)">
                            <i class="material-icons">{{ option.icon }}</i>
                        </a>
                    </Tooltip>
                    <a v-else :href="option.href" @click="handleAction(option.clickAction)">
                        {{ option.text }}
                    </a>
                </div>
            </div>
        </div>
        <div class="content-view">
            <slot name="breadcrumbs"></slot>
            <div class="content-wrapper">
                <div class="content-header">
                    <h1 class="content-page-title">{{ $route.name }}</h1>
                    <div class="search-box">
                        <input
                            type="text"
                            :placeholder="searchOptions.placeholder"
                            :value="searchText"
                            @input="$emit('update:search-text', $event.target.value)"
                            :readonly="searchOptions.clickAction"
                            @click="handleAction(searchOptions.clickAction)"
                        />
                    </div>
                </div>
                <transition name="pageTransition" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
        <slot name="tabbar"></slot>
    </div>
</template>

<script>
import Tooltip from '../../../components/Tooltip.vue';

export default {
    name: 'LayoutVariation3',
    props: {
        showBackBtn: {
            type: Boolean,
            default: false
        },
        topbarLeftOptions: {
            type: Array
        },
        topbarRightOptions: {
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
        Tooltip
    },
    data() {
        return {
            showNavTitle: false
        };
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        handleAction(fn) {
            if (fn) {
                return fn();
            } else {
                return false;
            }
        }
    },
    mounted() {
        let obj = window.$('.content-page-title');
        let topbar = window.$('.mobile-topbar');
        obj.width(obj.width());

        window.$('.content-view').scroll(() => {
            let currentScroll = window.$('.content-view').scrollTop();
            if (currentScroll > 72) {
                this.showNavTitle = true;
                topbar.css({
                    'border-bottom-style': 'solid'
                });
            } else {
                this.showNavTitle = false;
                topbar.css({
                    'border-bottom-style': 'none'
                });
            }

            if (currentScroll > 54) {
                obj.css({
                    position: 'absolute',
                    top: 54
                });
            } else {
                obj.css({
                    position: 'fixed',
                    top: 44
                });
            }
        });
    }
};
</script>
