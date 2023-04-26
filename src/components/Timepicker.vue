<template>
    <div class="timepicker-wrapper">
        <div class="form-group">
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label class="control-label">Hrs</label>
                        </td>
                        <td />
                        <td>
                            <label class="control-label">Mins</label>
                        </td>
                        <td v-show="showSeconds" />
                        <td v-show="showSeconds">
                            <label class="control-label">Secs</label>
                        </td>
                        <td v-show="showMeridian" />
                    </tr>
                    <tr>
                        <td class="form-element">
                            <input
                                ref="hours"
                                type="number"
                                :value="strHours"
                                class="form-control"
                                :min="showMeridian ? 1 : 0"
                                :max="showMeridian ? 12 : 23"
                                @input="handleHours($event.target.value)"
                                @keyup.up="incrementHours"
                                @keyup.down="decrementHours"
                            />
                            <div class="timepicker-arrows">
                                <a @click="incrementHours"><i class="material-icons">keyboard_arrow_up</i></a
                                ><a @click="decrementHours"><i class="material-icons">keyboard_arrow_down</i></a>
                            </div>
                        </td>
                        <td><span class="timepicker-delimiter">:</span></td>
                        <td class="form-element">
                            <input
                                ref="minutes"
                                type="number"
                                :value="strMinutes"
                                class="form-control"
                                min="0"
                                max="59"
                                @input="handleMinutes($event.target.value)"
                                @keyup.up="incrementMinutes"
                                @keyup.down="decrementMinutes"
                            />
                            <div class="timepicker-arrows">
                                <a @click="incrementMinutes"><i class="material-icons">keyboard_arrow_up</i></a
                                ><a @click="decrementMinutes"><i class="material-icons">keyboard_arrow_down</i></a>
                            </div>
                        </td>
                        <td v-show="showSeconds">
                            <span class="timepicker-delimiter">:</span>
                        </td>
                        <td v-show="showSeconds" class="form-element">
                            <input
                                ref="seconds"
                                type="number"
                                :value="strSeconds"
                                class="form-control"
                                min="0"
                                max="59"
                                @input="handleSeconds($event.target.value)"
                                @keyup.up="incrementSeconds"
                                @keyup.down="decrementSeconds"
                            />
                            <div class="timepicker-arrows">
                                <a @click="incrementSeconds"><i class="material-icons">keyboard_arrow_up</i></a
                                ><a @click="decrementSeconds"><i class="material-icons">keyboard_arrow_down</i></a>
                            </div>
                        </td>
                        <td v-show="showMeridian">
                            <div class="timepicker-meridian">
                                <a :class="{active: meridian == 'AM'}" @click="toggleMeridian">AM</a><a :class="{active: meridian == 'PM'}" @click="toggleMeridian">PM</a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Timepicker',
    props: {
        value: {},
        hourStep: {
            type: Number,
            default: 1
        },
        minuteStep: {
            type: Number,
            default: 1
        },
        secondStep: {
            type: Number,
            default: 1
        },
        showMeridian: {
            type: Boolean,
            default: true
        },
        showSeconds: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            hours: this.value.getHours(),
            minutes: this.value.getMinutes(),
            seconds: this.value.getSeconds(),
            strHours: '',
            strMinutes: '',
            strSeconds: '',
            meridian: 'AM'
        };
    },
    created() {
        if (this.showMeridian) {
            if (this.hours >= 12) {
                this.meridian = 'PM';
                if (this.hours > 12) this.hours -= 12;
            } else if (this.hours === 0) {
                this.hours = 12;
            }
        }
        this.handleHours(this.hours);
        this.handleMinutes(this.minutes);
        if (this.showSeconds) this.handleSeconds(this.seconds);
    },
    methods: {
        emitValue(type) {
            let clonedValue = this.value;
            if (type === 'hr') {
                let hours = this.hours;
                if (this.showMeridian) {
                    if (this.meridian === 'PM' && this.hours < 12) hours += 12;
                    else if (this.meridian === 'AM' && this.hours === 12) hours = 0;
                }
                clonedValue.setHours(hours);
            } else if (type === 'min') clonedValue.setMinutes(this.minutes);
            else clonedValue.setSeconds(this.seconds);

            this.$emit('update:value', clonedValue);
            this.$emit('changed', clonedValue);
        },
        handleHours(val, type) {
            let min = this.showMeridian ? 1 : 0;
            let max = this.showMeridian ? 12 : 23;
            let h = parseInt(val);
            if (Number.isNaN(h)) return;

            if (type === 'inc') h = h + this.hourStep;
            else if (type === 'dec') h = h - this.hourStep;

            if (h > max) {
                this.hours = max;
                this.$refs.hours.value = max;
            } else if (h < min) {
                this.hours = min;
                this.$refs.hours.value = '0' + min;
            } else {
                this.hours = h;
            }

            this.strHours = this.hours > 9 ? this.hours : '0' + this.hours;

            this.emitValue('hr');
        },
        handleMinutes(val, type) {
            let min = 0;
            let max = 59;
            let m = parseInt(val);
            if (Number.isNaN(m)) return;
            if (type === 'inc') m = m + this.minuteStep;
            else if (type === 'dec') m = m - this.minuteStep;

            if (m > max) {
                this.minutes = max;
                this.$refs.minutes.value = max;
            } else if (m < min) {
                this.minutes = min;
                this.$refs.minutes.value = '0' + min;
            } else {
                this.minutes = m;
            }
            this.strMinutes = this.minutes > 9 ? this.minutes : '0' + this.minutes;

            this.emitValue('min');
        },
        handleSeconds(val, type) {
            let min = 0;
            let max = 59;
            let s = parseInt(val);
            if (Number.isNaN(s)) return;
            if (type === 'inc') s = s + this.secondStep;
            else if (type === 'dec') s = s - this.secondStep;

            if (s > max) {
                this.seconds = max;
                this.$refs.seconds.value = max;
            } else if (s < min) {
                this.seconds = min;
                this.$refs.seconds.value = '0' + min;
            } else {
                this.seconds = s;
            }
            this.strSeconds = this.seconds > 9 ? this.seconds : '0' + this.seconds;

            this.emitValue('sec');
        },
        incrementHours() {
            this.handleHours(this.hours, 'inc');
        },
        incrementMinutes() {
            this.handleMinutes(this.minutes, 'inc');
        },
        incrementSeconds() {
            this.handleSeconds(this.seconds, 'inc');
        },
        decrementHours() {
            this.handleHours(this.hours, 'dec');
        },
        decrementMinutes() {
            this.handleMinutes(this.minutes, 'dec');
        },
        decrementSeconds() {
            this.handleSeconds(this.seconds, 'dec');
        },
        toggleMeridian() {
            if (this.showMeridian && this.meridian === 'AM') {
                this.meridian = 'PM';
                this.handleHours(this.hours);
            } else {
                this.meridian = 'AM';
                this.handleHours(this.hours);
            }
        }
    }
};
</script>
