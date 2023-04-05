<template>
    <div class="range-wrapper">
        <slot name="pre" />
        <div :id="'range-slider-' + id" class="range-slider">
            <input v-model="range[0]" :min="min" :max="max" type="range" :step="step" @input="lowerSliderInput" />
            <input v-if="range.length > 1" v-model="range[1]" :min="min" :max="max" type="range" :step="step" @input="upperSliderInput" />
        </div>
        <slot name="post" />
    </div>
</template>

<script>
const prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];
export default {
    name: 'Range',
    props: {
        min: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        },
        step: {
            type: Number,
            default: 1
        },
        range: {
            type: Array,
            required: true
        },
        trackBg: {
            type: Array,
            default: function() {
                return ['#B5B5BE', '#0B58D4'];
            }
        }
    },
    data() {
        return {
            id: this._uid,
            sheet: null
        };
    },
    mounted() {
        this.sheet = document.createElement('style');
        this.sheet.setAttribute('id', this.id);
        document.body.appendChild(this.sheet);
        this.sheet.textContent = this.getTrackStyle();
    },
    methods: {
        upperSliderInput() {
            this.range[0] = parseInt(this.range[0]);
            this.range[1] = parseInt(this.range[1]);
            if (this.range[1] <= this.range[0]) {
                this.range[0] = this.range[1];
            }
            this.sheet.textContent = this.getTrackStyle();
        },
        lowerSliderInput() {
            if (this.range.length > 1) {
                this.range[0] = parseInt(this.range[0]);
                this.range[1] = parseInt(this.range[1]);
                if (this.range[0] >= this.range[1]) {
                    this.range[1] = this.range[0];
                }
            }
            this.sheet.textContent = this.getTrackStyle();
        },
        getTrackStyle() {
            let style = '';
            if (this.range.length > 1) {
                for (let i = 0; i < prefs.length; i++) {
                    style +=
                        '#range-slider-' +
                        this.id +
                        ' input::-' +
                        prefs[i] +
                        '{background: linear-gradient(to right, ' +
                        this.trackBg[0] +
                        ' 0%, ' +
                        this.trackBg[0] +
                        ' ' +
                        (this.range[0] / this.max) * 100 +
                        '%,' +
                        this.trackBg[1] +
                        ' ' +
                        (this.range[0] / this.max) * 100 +
                        '%, ' +
                        this.trackBg[1] +
                        ' ' +
                        (this.range[1] / this.max) * 100 +
                        '%,' +
                        this.trackBg[0] +
                        ' ' +
                        (this.range[1] / this.max) * 100 +
                        '%, ' +
                        this.trackBg[0] +
                        ' 100%)}';
                }
            } else {
                for (let i = 0; i < prefs.length; i++) {
                    style +=
                        '#range-slider-' +
                        this.id +
                        ' input::-' +
                        prefs[i] +
                        '{background: linear-gradient(to right, ' +
                        this.trackBg[1] +
                        ' 0%, ' +
                        this.trackBg[1] +
                        ' ' +
                        (this.range[0] / this.max) * 100 +
                        '%,' +
                        this.trackBg[0] +
                        ' ' +
                        (this.range[0] / this.max) * 100 +
                        '%, ' +
                        this.trackBg[0] +
                        ' 100%)}';
                }
            }
            return style;
        }
    }
};
</script>
