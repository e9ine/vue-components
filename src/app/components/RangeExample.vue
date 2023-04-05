<template>
    <div>
        <div class="item-wrapper">
            <h5>Single</h5>
            <Range :min="0" :max="200" :step="10" :range="range1">
                <template #pre>
                    <div class="range-value">
                        {{ range1[0] }}
                    </div>
                </template>
            </Range>
        </div>
        <div class="item-wrapper">
            <h5>Range</h5>
            <Range :min="0" :max="200" :range="range2">
                <template #pre>
                    <div class="range-value">
                        {{ range2[0] }}
                    </div>
                </template>
                <template #post>
                    <div class="range-value">
                        {{ range2[1] }}
                    </div>
                </template>
            </Range>
        </div>
    </div>
</template>
<script>
import Range from '@/components/Range.vue';
export default {
    name: 'RangeExample',
    components: {
        Range
    },
    data() {
        return {
            range1: [0],
            range2: [30, 150]
        };
    }
};
</script>

<style lang="scss" scoped>
.range-wrapper {
    display: flex;
    align-items: center;
    .range-value {
        padding: 0.5rem 1rem;
        position: relative;
        top: 2px;
    }
}
</style>
