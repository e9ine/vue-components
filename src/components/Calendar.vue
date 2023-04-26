<template>
    <div>
        <v-date-picker
            ref="picker"
            v-model="clonedValue"
            :mode="mode"
            :is-inline="isInline"
            :is-dark="isDark"
            :color="color"
            :is-expanded="isExpanded"
            :title-position="titlePosition"
            :rows="rows"
            :columns="columns"
            :step="step"
            :min-date="minDate"
            :max-date="maxDate"
            :attributes="attributes"
            :is-required="isRequired"
            :update-on-input="updateOnInput"
            :input-debounce="inputDebounce"
            :select-attribute="selectAttribute"
            :drag-attribute="dragAttribute"
            :input-props="inputProps"
            @input="eventHandler('update:value', clonedValue)"
            @drag="eventHandler('drag')"
            @dayclick="handleClick"
            @update:from-page="pageChange"
        >
            <slot />
        </v-date-picker>
    </div>
</template>

<script>
import VDatePicker from 'v-calendar/lib/components/date-picker.umd';
import {setupCalendar} from 'v-calendar';

export default {
    name: 'Calendar',
    components: {
        VDatePicker
    },
    props: {
        value: {
            type: [String, Date, Object, Array]
        },
        mode: {
            type: String,
            validator: (value) => {
                return ['single', 'multiple', 'range'].indexOf(value) > -1 || !value;
            },
            default: 'single'
        },
        isInline: {
            type: Boolean,
            default: false
        },
        isRequired: {
            type: Boolean,
            default: true
        },
        updateOnInput: {
            type: Boolean,
            default: true
        },
        inputDebounce: {
            type: Number
        },
        inputProps: {
            type: Object,
            default: () => {
                return {};
            }
        },
        selectAttribute: {
            type: Object,
            default: () => {
                return {};
            }
        },
        dragAttribute: {
            type: Object,
            default: () => {
                return {};
            }
        },
        isDark: {
            type: Boolean,
            default: false
        },
        color: {
            type: String
        },
        isExpanded: {
            type: Boolean
        },
        titlePosition: {
            type: String
        },
        rows: {
            type: Number
        },
        columns: {
            type: Number
        },
        step: {
            type: Number
        },
        minDate: {
            type: Date
        },
        maxDate: {
            type: Date
        },
        attributes: {
            type: Array
        }
    },
    data() {
        return {
            clonedValue: this.value
        };
    },
    created() {
        setupCalendar();
    },
    methods: {
        eventHandler(name, value) {
            console.log(this.$refs);
            this.$emit(name, value);
        },
        pageChange(event) {
            let {year, month} = event;
            const attrs = this.attributes.slice();
            attrs[0].dates = {
                start: new Date(year, month - 1, 1),
                months: month
            };
            this.attributes = attrs;
        },
        handleClick() {}
    }
};
</script>
