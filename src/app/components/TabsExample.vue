<template>
    <div>
        <Tabs :data="tabTypes" type="pills" :active.sync="currentType" @changed="changeType" />
        <div class="options-wrapper">
            <div class="option-wrapper">
                <div class="form-element">
                    <input id="tabs-navigable" v-model="navigable" type="checkbox" class="check" />
                    <label class="check-label box" for="tabs-navigable">
                        <span />
                    </label>
                    <strong>Navigable</strong>
                </div>
            </div>
            <div class="option-wrapper">
                <div class="form-element">
                    <input id="tabs-fill" v-model="fillTabs" type="checkbox" class="check" />
                    <label class="check-label box" for="tabs-fill">
                        <span />
                    </label>
                    <strong>Fill</strong>
                </div>
            </div>
            <div class="option-wrapper">
                <div class="form-element">
                    <input id="tabs-stacked" v-model="stackedTabs" type="checkbox" class="check" />
                    <label class="check-label box" for="tabs-stacked">
                        <span />
                    </label>
                    <strong>Stacked</strong>
                </div>
            </div>
            <div class="option-wrapper">
                <div class="form-element">
                    <input id="tabs-wrapped" v-model="wrapTabs" type="checkbox" class="check" />
                    <label class="check-label box" for="tabs-wrapped">
                        <span />
                    </label>
                    <strong>Wrapped</strong>
                </div>
            </div>
            <div class="option-wrapper">
                <strong>Align:</strong>
                <div class="form-element">
                    <input id="tabs-right" v-model="alignTabs" type="radio" class="check" name="tabs-left" value="left" />
                    <label class="check-label radio" for="tabs-left" />
                    <span>Left</span>
                </div>
                <div class="form-element">
                    <input id="tabs-right" v-model="alignTabs" type="radio" class="check" name="tabs-right" value="right" />
                    <label class="check-label radio" for="tabs-right" />
                    <span>Right</span>
                </div>
                <div class="form-element">
                    <input id="tabs-center" v-model="alignTabs" type="radio" class="check" name="tabs-center" value="center" />
                    <label class="check-label radio" for="tabs-center" />
                    <span>Center</span>
                </div>
            </div>
        </div>
        <div v-if="navigable">
            <Tabs :data="navigableTabs" :type="type" :limit="5" :active.sync="currentTab" :fill="fillTabs" :stacked="stackedTabs" :align="alignTabs" />
        </div>
        <div v-else>
            <Tabs :data="navigationLessTabs" :type="type" :limit="5" :active.sync="currentTab" :fill="fillTabs" :stacked="stackedTabs" :align="alignTabs" :wrap="wrapTabs" />
            <div class="spacer" />
            <div class="tab-content">
                Showing content for <b>{{ navigationLessTabs[currentTab].name }}</b>
            </div>
        </div>
    </div>
</template>

<script>
import Tabs from '@/components/Tabs.vue';

export default {
    name: 'TabsExample',
    components: {
        Tabs
    },
    data() {
        return {
            tabTypes: [{name: 'Simple', selected: true}, {name: 'Angled'}, {name: 'Pills'}],
            navigableTabs: [
                {
                    name: 'Home',
                    path: '/home'
                },
                {
                    name: 'Components',
                    path: '/main/components/'
                },
                {
                    name: 'Views',
                    path: '/main/views/'
                }
            ],
            navigationLessTabs: [
                {
                    name: 'Item 1',
                    selected: true
                },
                {
                    name: 'Item 2'
                },
                {
                    name: 'Item 3',
                    disabled: true
                },
                {
                    name: 'Item 4'
                },
                {
                    name: 'Item 5'
                },
                {
                    name: 'Item 6'
                }
            ],
            navigable: false,
            currentTab: 0,
            type: 'simple',
            currentType: 0,
            fillTabs: false,
            stackedTabs: false,
            alignTabs: 'left',
            wrapTabs: null
        };
    },
    methods: {
        changeType(index) {
            this.type = this.tabTypes[index].name.toLowerCase();
        }
    }
};
</script>

<style lang="scss" scoped>
.tabs-wrapper,
.options-wrapper {
    margin-bottom: 32px;
}
.option-wrapper {
    display: inline-flex;
    margin-right: 32px;
    margin-bottom: 16px;
    .form-element {
        margin-right: 1rem;
        margin-left: 1rem;
    }
}
</style>
