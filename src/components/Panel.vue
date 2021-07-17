<template>
    <div class="panel" :class="collapsed ? 'panel-collapsed' : ''">
        <div class="panel-header">
            <div class="panel-info" v-if="title || subTitle">
                <h6 v-text="title" class="title-s"></h6>
                <p class="subtitle-s" v-text="subTitle"></p>
            </div>
            <div class="panel-options">
                <a href="" @click.prevent="handleAction(options.download)" v-if="options.download">
                    <span class="material-icons">get_app</span>
                </a>
                <a href="" @click.prevent="handleAction(options.refresh)" v-if="options.refresh">
                    <span class="material-icons">refresh</span>
                </a>
                <a href="" v-if="options.info">
                    <Tooltip :message="options.info.message" :position="options.info.position">
                        <span class="material-icons">info</span>
                    </Tooltip>
                </a>
                <a href="" @click.prevent="toggleCollapse()" class="collapse" v-if="collapsible">
                    <span class="material-icons">keyboard_arrow_up</span>
                </a>
            </div>
        </div>
        <div class="collapsible" ref="collapsible">
            <div class="panel-body">
                <slot name="panelBody"></slot>
            </div>
            <div class="panel-footer">
                <slot name="panelFooter"></slot>
            </div>
        </div>
    </div>
</template>
<script>
import Tooltip from '../components/Tooltip.vue';
export default {
    name: 'Panel',
    props: {
        title: {
            type: String
        },
        subTitle: {
            type: String
        },
        collapsible: {
            type: Boolean,
            default: false
        },
        options: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    components: {
        Tooltip
    },
    data() {
        return {
            collapsed: false
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
        toggleCollapse() {
            this.collapsed = !this.collapsed;
            if (this.collapsed) this.$refs.collapsible.style.maxHeight = 0;
            else this.$refs.collapsible.style.maxHeight = this.$refs.collapsible.scrollHeight + 'px';
        }
    },
    mounted() {
        if (this.collapsible) this.$refs.collapsible.style.maxHeight = this.$refs.collapsible.scrollHeight + 'px';
    }
};
</script>
