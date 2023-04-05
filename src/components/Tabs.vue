<template>
    <div class="tabs-wrapper">
        <ul :id="'tabs-' + id" class="tabs" :class="[type, fill ? 'tabs-fill' : '', align ? 'tabs-' + align : '', stacked ? 'tabs-stacked' : '', wrap ? 'tabs-wrap' : '']">
            <li v-for="(tab, key) in displayedTabs" :key="key">
                <router-link v-if="tab.path" tag="a" :to="tab.path" active-class="active">
                    <span>{{ tab.name }}</span>
                </router-link>
                <a v-else :class="{active: active === key, disabled: tab.disabled}" @click="selectTab(tab, key)">
                    <span>{{ tab.name }}</span>
                </a>
            </li>
            <li v-if="limit && data.length - displayedTabs.length > 0" id="more-nav-selector" class="has-dropdown">
                <a>
                    More
                    <div class="arrow-down" />
                </a>
                <ul id="more-nav" class="sub-nav">
                    <li v-for="(tab, subKey) in data.slice(limit)" :key="subKey + displayedTabs.length">
                        <router-link v-if="tab.path" tag="a" :to="tab.path">
                            {{ tab.name }}
                        </router-link>
                        <a v-else :class="{disabled: tab.disabled}" @click="selectTab(tab, subKey + displayedTabs.length)">{{ tab.name }}</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Tabs',
    props: {
        active: {
            type: Number,
            default: 0
        },
        data: {
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
        fill: {
            type: Boolean,
            default: false
        },
        align: {
            type: String
        },
        stacked: {
            type: Boolean,
            default: false
        },
        wrap: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            id: null
        };
    },
    computed: {
        displayedTabs() {
            if (this.limit && !this.stacked) {
                return this.data.slice(0, this.limit);
            }
            return this.data;
        }
    },
    mounted() {
        let tabsId = '#tabs-' + this.id;
        let moreSelector = $(tabsId + ' #more-nav-selector');
        if (moreSelector.length !== 0) {
            let position = $(moreSelector).position();
            if ($(tabsId).width() < position.left) {
                window.$(tabsId + ' #more-nav').css({left: 'unset', right: 0});
            } else {
                window.$(tabsId + ' #more-nav').css({left: position.left, right: 'unset'});
            }
        }
    },
    created() {
        this.id = this._uid;
    },
    methods: {
        selectTab(tab, index) {
            if (tab.disabled) return false;
            this.$emit('update:active', index);
            this.$emit('changed', index);
        }
    }
};
</script>
