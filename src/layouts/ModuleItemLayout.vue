<template>
    <div class="tabs-wrapper">
        <div :class="{'pre-tabs': $slots.pre}">
            <slot name="pre" />
        </div>
        <Tabs :data="tabs" :type="type" :limit="3" />
        <div v-if="rData && !$route.meta.isKeepAlive" class="tab-content">
            <router-view />
        </div>
        <div v-else-if="rData && $route.meta.isKeepAlive" class="tab-content">
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>
    </div>
</template>

<script>
import Tabs from '../components/Tabs.vue';
export default {
    name: 'ModuleItemLayout',
    components: {Tabs},
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
