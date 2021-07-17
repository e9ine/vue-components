<template>
    <div class="tabs-wrapper">
        <div :class="{'pre-tabs': $slots.pre}">
            <slot name="pre"></slot>
        </div>
        <Tabs :data="tabs" :type="type" :limit="3"></Tabs>
        <div class="tab-content" v-if="rData && !$route.meta.isKeepAlive">
            <router-view></router-view>
        </div>
        <div class="tab-content" v-else-if="rData && $route.meta.isKeepAlive">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import Tabs from '../components/Tabs.vue';
export default {
    name: 'ModuleItemLayout',
    props: {
        tabs: {
            type: Array,
            required: true
        },
        type: {
            type: String,
            default: 'simple'
        },
        limit: {
            type: Number,
            default: 0
        },
        rData: {
            type: [Object, Boolean],
            default: () => {
                return null;
            }
        }
    },
    components: {Tabs},
    data() {
        return {
            morePosition: {}
        };
    }
};
</script>

<style lang="scss" scoped>
.tabs-wrapper {
    font-family: Arial, Helvetica, sans-serif;
    width: 100%;
    .pre-tabs {
        margin-bottom: 16px;
    }
    .tab-content {
        margin-top: -2px;
    }
}
</style>
