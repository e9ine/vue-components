<template>
    <div
        class="page layout-variation-2"
        :class="[sidebarOn == true ? 'show-sidebar' : '', sidebar == true ? 'has-sidebar' : '', showBackBtn && $route.fullPath.split('/').length > 2 ? 'show-back-btn' : '']"
    >
        <a v-if="sidebar" id="mobile-menu-toggle" @click="sidebarOn = !sidebarOn">
            <i v-if="!sidebarOn" class="material-icons animated fadeInRight faster" :style="{color: menuIconColor}">menu</i>
            <i v-if="sidebarOn" class="material-icons animated rotateIn faster" :style="{color: menuIconColor}">cancel</i>
        </a>
        <transition name="backTransition">
            <a v-if="showBackBtn && $route.fullPath.split('/').length > 2" id="back-nav" @click="$router.go(-1)">
                <i class="material-icons" :style="{color: menuIconColor}">keyboard_backspace</i>
            </a>
        </transition>
        <div class="topbar">
            <slot name="topbar" />
        </div>
        <div v-if="sidebar">
            <slot name="sidebar" />
        </div>
        <slot name="globalSearch" />
        <div class="content-view">
            <slot name="breadcrumbs" />
            <div class="content-wrapper">
                <transition name="pageTransition" mode="out-in">
                    <router-view />
                </transition>
            </div>
        </div>
        <slot name="tabbar" />
    </div>
</template>

<script>
export default {
    name: 'LayoutVariation2',
    props: {
        sidebar: {
            type: Boolean,
            default: true
        },
        menuIconColor: {
            type: String,
            default: '#696974'
        },
        showBackBtn: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            sidebarOn: false
        };
    },
    mounted() {
        this.$on('toggle-sidebar', function() {
            this.sidebarOn = false;
        });
    },
    methods: {
        back() {
            this.$router.go(-1);
        }
    }
};
</script>
