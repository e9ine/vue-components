<template>
    <div>
        <apexchart class="bar-chart" :width="width" :height="height" type="bar" :options="chartOptions" :series="data.series" />
    </div>
</template>

<script>
let defaultOptions = {
    chart: {
        type: 'bar'
    },
    plotOptions: {
        bar: {
            horizontal: true
        }
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
            type: [Object, Array],
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
    }
};
</script>
