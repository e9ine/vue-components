<template>
    <div class="progress-bar" :style="{height: height + 'px'}">
        <div ref="progress-bar-value" class="value" :style="style" />
    </div>
</template>

<script>
import {checkValidHex} from '../utils/CommonUtils';

export default {
    name: 'ProgressBar',
    props: {
        value: {
            type: Number
        },
        color: {
            type: String,
            default: '#7ED321'
        },
        height: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            id: null
        };
    },
    computed: {
        style() {
            let obj = {};
            obj['background-color'] = checkValidHex(this.color);
            obj['height'] = this.height + 'px';
            return obj;
        }
    },
    mounted() {
        setTimeout(() => {
            this.$refs['progress-bar-value'].style.width = this.value + '%';
        }, 0);
    }
};
</script>
