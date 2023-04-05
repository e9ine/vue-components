<template>
    <div class="panel" :class="collapsed ? 'panel-collapsed' : ''">
        <div class="panel-header">
            <div v-if="title || subTitle" class="panel-info">
                <h6 class="title-s" v-text="title" />
                <p class="subtitle-s" v-text="subTitle" />
            </div>
            <div class="panel-options">
                <a v-if="options.download" href="" @click.prevent="handleAction(options.download)">
                    <span class="material-icons">get_app</span>
                </a>
                <a v-if="options.refresh" href="" @click.prevent="handleAction(options.refresh)">
                    <span class="material-icons">refresh</span>
                </a>
                <a v-if="options.info" href="">
                    <Tooltip :message="options.info.message" :position="options.info.position">
                        <span class="material-icons">info</span>
                    </Tooltip>
                </a>
                <a v-if="collapsible" href="" class="collapse" @click.prevent="toggleCollapse()">
                    <span class="material-icons">keyboard_arrow_up</span>
                </a>
            </div>
        </div>
        <div ref="collapsible" class="collapsible">
            <div class="panel-body">
                <slot name="panelBody" />
            </div>
            <div class="panel-footer">
                <slot name="panelFooter" />
            </div>
        </div>
    </div>
</template>
<script>
import Tooltip from '../components/Tooltip.vue';
export default {
    name: 'Panel',
    components: {
        Tooltip
    },
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
    data() {
        return {
            collapsed: false
        };
    },
    mounted() {
        if (this.collapsible) this.$refs.collapsible.style.maxHeight = this.$refs.collapsible.scrollHeight + 'px';
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
    }
};
</script>
