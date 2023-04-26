<template>
    <div class="stepper">
        <div v-for="(step, key) in steps" :key="key" class="stepper-item" :class="{completed: step.index < currentStep, current: step.index == currentStep}">
            <div class="stepper-item-bar">
                <div class="stepper-item-bar-number">
                    {{ step.index }}
                </div>
            </div>
            <span class="stepper-item-name">{{ step.name }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Stepper',
    props: {
        steps: {
            type: Array,
            required: true
        },
        current: {
            type: Number
        }
    },
    computed: {
        currentStep: function() {
            if (this.current) {
                return this.current;
            } else {
                return this.steps[0].index;
            }
        }
    }
};
</script>
