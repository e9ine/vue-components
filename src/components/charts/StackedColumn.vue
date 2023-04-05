<template>
    <div>
        <apexchart class="stackedcolumn-chart" :width="width" :height="height" type="bar" :options="chartOptions" :series="data.series" />
    </div>
</template>

<script>
let defaultOptions = {
    chart: {
        type: 'bar',
        stacked: true
    },
    dataLabels: {
        enabled: false
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
    name: 'Bar',
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
            chartOptions.xaxis.categories = this.data.categories;
            return chartOptions;
        }
    },
    created() {}
};
</script>

<style lang="scss" scoped></style>
