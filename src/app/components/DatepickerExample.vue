<template>
    <div>
        <div class="item-wrapper">
            <a href="" class="btn btn-sm btn-primary" @click.prevent="mode = 'day'">Day Mode</a><span class="spacer-h" />
            <a href="" class="btn btn-sm btn-primary" @click.prevent="mode = 'week'">Week Mode</a><span class="spacer-h" />
            <a href="" class="btn btn-sm btn-primary" @click.prevent="mode = 'month'">Month Mode</a>
        </div>
        <div class="datepicker-wrapper">
            <datepicker :key="mode" ref="datepickerExample" :value.sync="date" :calendar-config="getCalendarConfig()" :select-mode="mode" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'CalendarExample',
    data() {
        return {
            date: new Date(),
            mode: 'day'
        };
    },
    methods: {
        getCalendarConfig() {
            return {
                dateFormat: 'd/m/Y',
                altFormat: 'd/m/Y',
                altInput: true,
                weekNumbers: false
            };
        },
        calendarOpened() {
            this.$refs.datepickerExample.setDate('2021;07-10', false, 'Y-m-d');
        }
    }
};
</script>

<style lang="scss">
.datepicker-wrapper {
    width: 420px;
}
</style>
