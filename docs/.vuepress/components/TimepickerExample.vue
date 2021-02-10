<template>
    <div>
        <Timepicker :value.sync="date" :hour-step="1" :minute-step="5" :show-seconds="true" :second-step="5" @changed="timeChanged"> </Timepicker>
    </div>
</template>

<script>
export default {
    name: 'TimepickerExample',
    data() {
        return {
            date: new Date(2020, 5, 1),
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

<style lang="scss">
.timepicker-wrapper {
    table {
        tbody {
            tr {
                border: none;

                td {
                    border: none;
                    padding: 0;

                    a {
                        color: #0b58d4;

                        &:hover {
                            color: #0062ff;
                        }
                    }
                }
            }
        }
    }
}
</style>
