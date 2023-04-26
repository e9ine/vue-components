<template>
    <div>
        <apexchart class="pie-chart" :width="width" :height="height" type="pie" :options="chartOptions" :series="data.series" />
    </div>
</template>

<script>
let defaultOptions = {
    chart: {
        type: 'pie-chart'
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
    name: 'Pie',
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
