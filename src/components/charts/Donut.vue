<template>
    <div>
        <apexchart class="donut-chart" :width="width" :height="height" type="donut" :options="chartOptions" :series="data.series" />
    </div>
</template>

<script>
let defaultOptions = {
    chart: {
        type: 'donut'
    },
    legend: {
        show: false
    },
    title: {
        text: '',
        offsetY: 8
    },
    plotOptions: {},
    labels: []
};
export default {
    name: 'Donut',
    components: {
        apexchart: () => import('vue-apexcharts')
    },
    props: {
        tite: {
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
            chartOptions.labels = this.data.categories;
            return chartOptions;
        }
    },
    created() {}
};
</script>

<style lang="scss" scoped></style>
