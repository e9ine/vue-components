<template>
    <div>
        <Tooltip message="Tooltip on right" position="right">
            <Button size="md" type="primary" text="Tooltip on right" :action="buttonClicked" />
        </Tooltip>
        <Tooltip message="Tooltip on left" position="left">
            <Button size="md" type="primary" text="Tooltip on left" :action="buttonClicked" />
        </Tooltip>
        <Tooltip message="Tooltip on top" position="top">
            <Button size="md" type="primary" text="Tooltip on top" :action="buttonClicked" />
        </Tooltip>
        <Tooltip message="Tooltip on bottom" position="bottom">
            <Button size="md" type="primary" text="Tooltip on bottom" :action="buttonClicked" />
        </Tooltip>
        <Tooltip message="Tooltip on top left" position="top-left">
            <Button size="md" type="primary" text="Tooltip on top left" :action="buttonClicked" />
        </Tooltip>
        <Tooltip message="Tooltip on bottom left" position="bottom-left">
            <Button size="md" type="primary" text="Tooltip on bottom left" :action="buttonClicked" />
        </Tooltip>
        <Tooltip message="Tooltip on top right" position="top-right">
            <Button size="md" type="primary" text="Tooltip on top right" :action="buttonClicked" />
        </Tooltip>
        <Tooltip message="Tooltip on bottom right" position="bottom-right">
            <Button size="md" type="primary" text="Tooltip on bottom right" :action="buttonClicked" />
        </Tooltip>
    </div>
</template>
<script>
import Tooltip from '@/components/Tooltip.vue';
import Button from '@/components/Button.vue';
export default {
    name: 'TooltipExample',
    components: {
        Tooltip,
        Button
    },
    methods: {
        buttonClicked() {
            alert('Button Clicked Acknowledgement');
        }
    }
};
</script>
<style lang="scss" scoped>
.tooltip-wrapper {
    margin-right: 1rem;
    margin-bottom: 1rem;
}
</style>
