<template>
    <div class="page layout-variation-3" :class="[showBackBtn && $route.fullPath.split('/').length > 2 ? 'show-back-btn' : '']">
        <slot v-if="$slots.topbar" name="topbar" />
        <div v-else class="mobile-topbar">
            <transition name="fade">
                <h4 v-show="showNavTitle" class="mobile-topbar-page-title">
                    {{ $route.name }}
                </h4>
            </transition>
            <a v-if="showBackBtn && $route.fullPath.split('/').length > 2" id="back-nav" @click="$router.go(-1)">
                <i class="material-icons">arrow_back_ios</i>
            </a>
            <div v-else class="mobile-topbar-options mobile-topbar-left-options">
                <div v-for="(option, key) in topbarLeftOptions" :key="key" class="mobile-topbar-option">
                    <Tooltip v-if="option.type == 'icon'" :message="option.text" position="right">
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
                <div v-for="(option, key) in topbarRightOptions" :key="key" class="mobile-topbar-option">
                    <Tooltip v-if="option.type == 'icon'" :message="option.text" position="left">
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
            <slot name="breadcrumbs" />
            <div class="content-wrapper">
                <div class="content-header">
                    <h1 class="content-page-title">
                        {{ $route.name }}
                    </h1>
                    <div class="search-box">
                        <input
                            type="text"
                            :placeholder="searchOptions.placeholder"
                            :value="searchText"
                            :readonly="searchOptions.clickAction"
                            @input="$emit('update:search-text', $event.target.value)"
                            @click="handleAction(searchOptions.clickAction)"
                        />
                    </div>
                </div>
                <transition name="pageTransition" mode="out-in">
                    <router-view />
                </transition>
            </div>
        </div>
        <slot name="tabbar" />
    </div>
</template>

<script>
import Tooltip from '../../../components/Tooltip.vue';

export default {
    name: 'LayoutVariation3',
    components: {
        Tooltip
    },
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
    data() {
        return {
            showNavTitle: false
        };
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
    }
};
</script>
