<template>
    <div>
        <h4>Normal Progress Bar</h4>
        <p>
            Progress indicators inform users about the status of ongoing processes, such as loading an app, submitting a form, or saving updates. They communicate an app’s state and indicate available
            actions, such as whether users can navigate away from the current screen.
        </p>
        <div class="spacer-v" />
        <div class="row">
            <div class="col-sm-8">
                <ProgressBar :value="50" :height="10" />
            </div>
        </div>
    </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue';

export default {
    name: 'ProgressBarExample',
    components: {
        ProgressBar
    }
};
</script>

<style lang="scss" scoped></style>
