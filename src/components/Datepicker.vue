<template>
    <div>
        <div class="form-group">
            <flat-pickr ref="datepicker" v-model="clonedValue" :config="configObj" class="form-control datepicker" @on-change="emitOnChange" v-on="$listeners" />
            <div data-toggle class="custom-datepicker-markup">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import weekSelect from 'flatpickr/dist/plugins/weekSelect/weekSelect.js';
import monthSelect from 'flatpickr/dist/plugins/monthSelect/index.js';
import 'flatpickr/dist/plugins/monthSelect/style.css';

let flatPickrInstance;
export default {
    name: 'Datepicker',
    components: {
        flatPickr
    },
    props: {
        value: {
            type: [String, Date, Array]
        },
        calendarConfig: {
            type: Object
        },
        selectMode: {
            type: String,
            default: 'day'
        }
    },
    data() {
        return {
            clonedValue: this.value,
            config: {
                defaultDate: 'today',
                locale: {
                    firstDayOfWeek: 1
                }
            },
            customMarkupConfig: {
                wrap: true,
                altInputClass: 'hide-default-datepicker-input'
            },
            weekSelectConfig: {
                mode: 'single',
                plugins: [new weekSelect()]
            },
            monthSelectConfig: {
                weekNumbers: false,
                mode: 'single',
                plugins: [
                    new monthSelect({
                        dateFormat: this.calendarConfig.dateFormat ? this.calendarConfig.dateFormat : 'd-m-Y'
                    })
                ]
            }
        };
    },
    computed: {
        configObj() {
            let conf = {...this.config, ...this.calendarConfig};
            if (this.selectMode === 'week') {
                conf = {...conf, ...this.weekSelectConfig};
            } else if (this.selectMode === 'month') {
                conf = {...conf, ...this.monthSelectConfig};
            }
            if (this.$slots.default) {
                conf = {...conf, ...this.customMarkupConfig};
            }
            return conf;
        }
    },
    mounted() {
        flatPickrInstance = this.$refs.datepicker.fp;
    },
    methods: {
        emitOnChange(selectedDates, dateStr, instance) {
            if (instance.config.mode === 'range') {
                dateStr = dateStr.split(' to ');
            } else if (instance.config.mode === 'multiple') {
                dateStr = dateStr.split(',');
            }

            if (this.selectMode === 'week') {
                // flatPickrInstance.selectedDates=[instance.weekStartDay,instance.weekEndDay];
                dateStr = [instance.formatDate(instance.weekStartDay, instance.config.dateFormat), instance.formatDate(instance.weekEndDay, instance.config.dateFormat)];
            } else if (this.selectMode === 'month') {
                dateStr = [dateStr, instance.formatDate(new Date(instance.currentYear, instance.currentMonth + 1, 0), instance.config.dateFormat)];
            }
            this.$emit('update:value', dateStr);
        },
        clear() {
            flatPickrInstance.clear();
        },
        close() {
            flatPickrInstance.close();
        },
        destroy() {
            flatPickrInstance.destroy();
        },
        formatDate(dateObj, formatStr) {
            flatPickrInstance.formatDate(dateObj, formatStr);
        },
        jumpToDate(dateObj, triggerChange) {
            flatPickrInstance.formatDate(dateObj, triggerChange);
        },
        open() {
            flatPickrInstance.open();
        },
        parseDate(dateStr, dateFormat) {
            flatPickrInstance.parseDate(dateStr, dateFormat);
        },
        redraw() {
            flatPickrInstance.redraw();
        },
        set(option, value) {
            flatPickrInstance.set(option, value);
        },
        setDate(date, triggerChange, dateStrFormat) {
            flatPickrInstance.setDate(date, triggerChange, dateStrFormat);
        },
        toggle() {
            flatPickrInstance.toggle();
        }
    }
};
</script>
