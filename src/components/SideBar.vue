<template>
    <div class="sidebar" :class="[compact ? 'sidebar-compact' : '', primary ? 'sidebar-primary' : '']">
        <div class="sidebar-top">
            <slot name="sidebarTop" />
        </div>
        <div class="sidebar-navigation">
            <div v-for="(item, index) in menu" :key="index" class="menu-section">
                <h6 v-if="item.menuTitle" class="menu-title">
                    {{ item.menuTitle }}
                </h6>
                <ul class="menu">
                    <li v-for="(route, key) in item.menuItems" :key="key" :class="{'has-dropdown': route.subItems && route.subItems.length > 0}">
                        <router-link v-if="!route.subItems" :to="route.path" active-class="active" @click.native="toggleSidebar">
                            <i v-if="route.icon" class="material-icons">{{ route.icon }}</i>
                            <span v-text="route.name" />
                        </router-link>
                        <a v-else @click="expandNav(route)">
                            <i v-if="route.icon" class="material-icons">{{ route.icon }}</i>
                            <span v-text="route.name" />
                            <i v-if="route.subItems && route.subItems.length > 0" class="material-icons toggle-sub-nav">keyboard_arrow_down</i>
                        </a>
                        <ul v-if="route.subItems && route.expanded" class="sub-nav" :class="{open: route.expanded}">
                            <li>
                                <router-link v-for="(subRoute, subKey) in route.subItems" :key="subKey" :to="subRoute.path" active-class="active" @click.native="toggleSidebar">
                                    <span v-text="subRoute.name" />
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="sidebar-bottom">
            <slot name="sidebarBottom" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'SideBar',
    props: {
        compact: {
            type: Boolean,
            default: false
        },
        primary: {
            type: Boolean,
            default: false
        },
        menu: {
            type: Array,
            required: true
        }
    },
    created() {
        let err = '';
        if (!this.$store || !this.$store.state.sideBarModule) {
            err = 'No sideBarModule found as part of the Vuex store. Kindly register a store with a sideBarModule';
        }
        if (err) {
            throw new Error(err);
        }
    },
    methods: {
        expandNav(route) {
            route.expanded = !route.expanded;
        },
        toggleSidebar() {
            this.$parent.$emit('toggle-sidebar');
        }
    }
};
</script>
