<template>
    <div>
        <h1 class="page-title">
            Stepper
        </h1>
        <p>
            Stepper is a component that displays content as a process with defined by user milestones. Steps are separated and connected by buttons. This is a great solution for a variety of
            registration forms, where you don't want to scare the user with loads of fields and questions. Stepper can be aligned vertically as well as horizontally.
        </p>
        <div class="row">
            <div class="col-sm-8">
                <Stepper :steps="steps" :current="current" />
            </div>
        </div>
    </div>
</template>

<script>
import Stepper from '@/components/Stepper.vue';

export default {
    name: 'StepperExample',
    components: {
        Stepper
    },
    data() {
        return {
            steps: [
                {
                    index: 1,
                    name: 'Fill up form'
                },
                {
                    index: 2,
                    name: 'Payment'
                },
                {
                    index: 3,
                    name: 'Setup up your profile'
                },
                {
                    index: 4,
                    name: 'Verification'
                }
            ],
            current: 3
        };
    }
};
</script>
