<template>
    <div class="e9-chart">
        <component :is="component" :options="mutableOptions" :width="width" :height="height" :data="data" v-if="!showTable"></component>
        <div class="chart-table-graph" v-if="showTable">
            <div class="graph-wrapper" :class="type.toLowerCase()">
                <component :is="component" :options="mutableOptions" :width="width" :height="height" :data="data"></component>
            </div>
            <div class="chart-table-wrapper" :class="type.toLowerCase()" v-if="tableData && tableData.data && tableData.data.length > 0" :style="{'max-height': height}">
                <div class="chart-table-header">
                    <div v-for="(item, key) in tableData.header" :key="key" class="header" :style="getStyle(tableData.header.length, key)">
                        {{ item }}
                    </div>
                </div>
                <div class="chart-table-body">
                    <div class="chart-table-row" v-for="(item, key1) in tableData.data" :key="key1" @click="allowClick && itemSelected(item, key1)" :style="getRowStyle()">
                        <div class="chart-table-column" v-for="(col, key2) in item" :key="key2" :style="getStyle(tableData.header.length, key2)">{{ col }}</div>
                        <br style=" clear:both " />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
Vue.filter('truncateChars', (val, num) => {
    let result = '';
    val = val + '';
    if (val) {
        result = val.substring(0, num);
        if (val.length > num) {
            result += '...';
        }
    }
    return result;
});

export default {
    name: 'Chart',
    props: {
        title: {
            type: String
        },
        type: {
            type: String,
            required: true
        },
        width: {
            type: [Number, String]
        },
        height: {
            type: [Number, String],
            default: '300px'
        },
        showTable: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            required: true
        },
        colors: {
            type: Array,
            default: function() {
                return ['#1D3461', '#0069AA', '#376996', '#6290C8', '#829CBC'];
            }
        },
        allowClick: {
            type: Boolean,
            default: false
        },
        options: {
            type: Object
        }
    },
    data() {
        return {
            component: null,
            mutableOptions: {}
        };
    },
    methods: {
        itemSelected(row, key) {
            let filter = this.tableData.data[key];
            let _id = this.data.keys ? this.data.keys[key] : null;
            this.$emit('chartItemClicked', {id: _id, title: filter.Title});
        },
        getRowStyle() {
            return this.allowClick ? [{cursor: 'pointer'}] : [{cursor: 'auto'}];
        },
        getStyle(size, key) {
            if (size <= 2) {
                if (key == 0 || key == 'Title') return [{width: '70%', 'text-align': 'left'}];
                else return [{width: '30%', 'text-align': 'right'}];
            } else {
                if (key == 0 || key == 'Title') return [{width: '40%', 'text-align': 'left'}];
                else return [{width: 60 / (size - 1) + '%', 'text-align': 'right'}];
            }
        },
        populateChartOptions(defaultOptions) {
            let chartOptions = defaultOptions;
            chartOptions.chart.id = this.title ? this.title : this.type;
            if (!chartOptions.chart.fontFamily) {
                chartOptions.chart.fontFamily = 'Arial';
            }
            if (this.mutableOptions) {
                for (const p in this.mutableOptions) {
                    if (!chartOptions[p]) chartOptions[p] = {};
                    if (typeof this.mutableOptions[p] == 'object') {
                        for (const innerP in this.mutableOptions[p]) {
                            if (!chartOptions[p][innerP]) chartOptions[p][innerP] = {};
                            chartOptions[p][innerP] = this.mutableOptions[p][innerP];
                        }
                    } else {
                        chartOptions[p] = this.mutableOptions[p];
                    }
                }
            }
            chartOptions.colors = this.colors;
            chartOptions.title.text = this.title ? this.title : '';
            if (!chartOptions.chart.toolbar) {
                chartOptions.chart.toolbar = {
                    show: true,
                    tools: {
                        download: '<img src="' + require('@e9ine/vue_components/src/assets/menu.svg') + '" width="30">'
                    }
                };
            }
            return chartOptions;
        }
    },
    computed: {
        tableData() {
            let tableData = {
                header: ['Title'],
                data: []
            };
            for (var i = 0, len = this.data.categories.length; i < len; i++) {
                let _data = {
                    Title: this.data.categories[i]
                };
                if (this.type != 'Pie' && this.type != 'Donut') {
                    for (let j = 0, leng = this.data.series.length; j < leng; j++) {
                        if (i == 0) {
                            tableData.header.push(this.data.series[j].name || 'Value ' + (j + 1));
                        }
                        let _name = this.data.series[j].name || 'Value ' + (j + 1);
                        _data[_name] = this.data.series[j].data[i];
                    }
                } else {
                    for (let j = 0, leng = this.data.series.length; j < leng; j++) {
                        if (i == 0 && j == 0) {
                            tableData.header.push('Value');
                        }
                        _data['Value'] = this.data.series[i];
                    }
                }
                tableData.data.push(_data);
            }
            return tableData;
        }
    },
    mounted() {
        this.mutableOptions = Vue.util.extend({}, this.options);
        if (!this.mutableOptions.chart) {
            this.mutableOptions.chart = {};
        }

        if (!this.mutableOptions.chart.events) {
            this.mutableOptions.chart.events = {};
        }
        if (this.allowClick) {
            this.mutableOptions.chart.events = {
                dataPointSelection: (event, chartContext, config) => {
                    let filter = this.tableData.data[config.dataPointIndex];
                    let _id = this.data.keys ? this.data.keys[config.dataPointIndex] : null;
                    this.$emit('chartItemClicked', {id: _id, title: filter.Title});
                }
            };
        } else {
            this.mutableOptions.chart.events = {
                dataPointSelection: null
            };
        }
    },
    created() {
        this.component = () => import('./' + this.type + '.vue');
    }
};
</script>
