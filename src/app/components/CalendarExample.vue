<template>
    <div>
        <a href="" class="btn btn-sm btn-primary" @click.prevent="mode = 'day'">Day Mode</a><span class="spacer-h" />
        <a href="" class="btn btn-sm btn-primary" @click.prevent="mode = 'week'">Week Mode</a><span class="spacer-h" />
        <a href="" class="btn btn-sm btn-primary" @click.prevent="mode = 'month'">Month Mode</a>
        <div class="spacer-v" />
        <div class="row">
            <div class="col-sm-4">
                <div class="datepicker-wrapper">
                    <datepicker :key="mode" ref="datepickerExample" :value.sync="date" :calendar-config="getCalendarConfig()" :select-mode="mode">
                        <!-- <Button size="md" type="primary">
                            <i class="material-icons">today</i>
                        </Button>
                        <span>{{ date }}</span> -->
                    </datepicker>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Datepicker from '@/components/Datepicker.vue';

import('flatpickr/dist/themes/dark.css');

export default {
    name: 'CalendarExample',
    components: {
        Datepicker
    },
    data() {
        return {
            dates: ['2020-07-02', '2020-06-20'],
            date: null,
            mode: 'range'
        };
    },
    methods: {
        getCalendarConfig() {
            return {
                dateFormat: 'd/m/Y',
                altFormat: 'M j, Y',
                altInput: true,
                // mode:'range',
                weekNumbers: true
                // altInputClass:'soumya'
                // inline:true
            };
        },
        calendarOpened() {
            this.$refs.datepickerExample.setDate('2021;07-10', false, 'Y-m-d');
        }
    }
};
</script>
