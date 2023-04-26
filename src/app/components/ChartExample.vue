<template>
    <div>
        <div>
            <Tabs :data="navigationLessTabs" :type="type" :active.sync="activeTabIndex" />
        </div>
        <div class="tab-content">
            <Chart v-show="activeTabIndex == 0" title="Bar Chart" type="Bar" height="500px" :data="barChartData" :allow-click="true" :show-table="true" @chartItemClicked="chartItemClicked" />
            <Chart
                v-show="activeTabIndex == 1"
                title="Stacked Bar Chart"
                type="StackedBar"
                :data="stackedBarChartData"
                :options="stackedBarChartOptions"
                :colors="['#546E7A', '#E91E63']"
                :show-table="true"
                :allow-click="true"
                @chartItemClicked="chartItemClicked"
            />
            <Chart v-show="activeTabIndex == 2" title="Line Chart" type="Line" :data="lineChartData" :show-table="true" :allow-click="true" @chartItemClicked="chartItemClicked" />
            <Chart v-show="activeTabIndex == 3" title="Pie Chart" type="Pie" :data="pieChartData" :show-table="true" :allow-click="true" @chartItemClicked="chartItemClicked" />
            <Chart v-show="activeTabIndex == 4" title="Donut Chart" type="Donut" :data="donutChartData" />
            <Chart v-show="activeTabIndex == 5" title="Column Chart" type="Column" :data="barChartData" />
            <Chart v-show="activeTabIndex == 6" title="Stacked Column Chart" height="400px" type="StackedColumn" :data="stackedBarChartData" />
            <Chart v-show="activeTabIndex == 7" title="Radial Bar" height="400px" type="RadialBar" :data="radialBarChartData" :options="radialBarChartOptions" />
            <Chart v-show="activeTabIndex == 8" title="Area Chart" height="400px" type="Area" :data="lineChartData" :colors="['#34D399']" :show-table="true" />
        </div>
    </div>
</template>
<script>
import Chart from '@/components/charts';
import Tabs from '@/components/Tabs.vue';
export default {
    name: 'ChartExample',
    components: {
        Chart,
        Tabs
    },
    data() {
        return {
            type: 'simple',
            // componentKey: 0,
            activeTabIndex: 0,
            navigationLessTabs: [
                {
                    name: 'Bar Chart'
                },
                {
                    name: 'Stacked Bar Chart'
                },
                {
                    name: 'Line Chart'
                },
                {
                    name: 'Pie Chart'
                },
                {
                    name: 'Donut Chart'
                },
                {
                    name: 'Column Chart'
                },
                {
                    name: 'Stacked Column Chart'
                },
                {
                    name: 'Radial Bar Stroked Chart'
                },
                {
                    name: 'Area Chart'
                }
            ],
            stackedBarChartData: {
                categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan', 'United States', 'China', 'Germany'],
                series: [
                    {
                        name: 'Series 1',
                        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
                    },
                    {
                        name: 'Series 2',
                        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
                    },
                    {
                        name: 'Series 3',
                        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
                    }
                ]
            },
            barChartData: {
                categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan', 'United States', 'China', 'Germany'],
                series: [
                    {
                        Name: 'Series1',
                        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
                    }
                ]
            },
            lineChartData: {
                categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan', 'United States', 'China', 'Germany'],
                series: [
                    {
                        name: 'Desktops',
                        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 12]
                    }
                ]
            },
            pieChartData: {
                categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan', 'United States', 'China', 'Germany'],
                series: [10, 41, 35, 51, 49, 62, 69, 91, 148, 12]
            },
            donutChartData: {
                categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan', 'United States', 'China', 'Germany'],
                series: [10, 41, 35, 51, 49, 62, 69, 91, 148, 12]
            },
            radialBarChartData: {
                categories: [],
                series: [67]
            },
            radialBarChartOptions: {
                plotOptions: {
                    radialBar: {
                        startAngle: -135,
                        endAngle: 135,
                        dataLabels: {
                            name: {
                                fontSize: '16px',
                                color: undefined,
                                offsetY: 120
                            },
                            value: {
                                offsetY: 76,
                                fontSize: '22px',
                                color: undefined,
                                formatter: function(val) {
                                    return val + '%';
                                }
                            }
                        }
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        shadeIntensity: 0.15,
                        inverseColors: false,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 50, 65, 91]
                    }
                },
                stroke: {
                    dashArray: 4
                },
                labels: ['Median Ratio']
            },
            stackedBarChartOptions: {
                fontFamily: 'Inter',
                legend: {
                    show: false
                },
                title: {
                    style: {
                        fontFamily: 'Inter'
                    }
                },
                chart: {
                    stackType: '100%'
                },
                dataLabels: {
                    enabled: true
                }
            },
            google: {},
            address: {},
            options: {
                componentRestrictions: {
                    country: 'gb'
                }
            }
        };
    },
    methods: {
        activateTab(index) {
            this.activeTabIndex = index;
        },
        chartItemClicked(item) {
            alert(JSON.stringify(item));
        }
    }
};
</script>

<style lang="scss" scoped>
.tab-content {
    margin-top: 16px;
}
</style>
