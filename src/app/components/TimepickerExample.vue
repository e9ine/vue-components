<template>
    <div>
        <Timepicker :value.sync="date" :hour-step="1" :minute-step="5" :show-seconds="true" :second-step="5" @changed="timeChanged" />
    </div>
</template>

<script>
import Timepicker from '@/components/Timepicker.vue';

export default {
    name: 'TimepickerExample',
    components: {
        Timepicker
    },
    data() {
        return {
            date: new Date(),
            newDate: null
        };
    },
    methods: {
        timeChanged(data) {
            this.newDate = data;
        }
    }
};
</script>
