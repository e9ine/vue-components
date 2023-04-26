<template>
    <div>
        <apexchart class="line-chart" :width="width" :height="height" type="line" :options="chartOptions" :series="data.series" />
    </div>
</template>

<script>
let defaultOptions = {
    chart: {
        type: 'line'
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight'
    },
    title: {
        text: '',
        offsetY: 8
    },
    xaxis: {
        categories: []
    }
};
export default {
    name: 'LineChart',
    components: {
        apexchart: () => import('vue-apexcharts')
    },
    props: {
        title: {
            type: String
        },
        colors: {
            type: Array
        },
        width: {
            type: [Number, String]
        },
        height: {
            type: [Number, String],
            default: '300px'
        },
        data: {
            type: Object,
            required: true
        },
        options: {
            type: Object,
            default: null
        }
    },
    computed: {
        chartOptions() {
            let chartOptions = this.$parent.populateChartOptions(defaultOptions);
            chartOptions.xaxis.categories = this.data.categories;
            return chartOptions;
        }
    },
    created() {}
};
</script>

<style lang="scss" scoped></style>
