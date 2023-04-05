<template>
    <div class="row">
        <div class="col-sm-4">
            <Panel>
                <template #panelBody>
                    <div class="shimmer-wrapper">
                        <Shimmer>
                            <ShimmerHeading :img="true" />
                            <ShimmerText :lines="4" />
                        </Shimmer>
                    </div>
                </template>
            </Panel>
        </div>
    </div>
</template>

<script>
import Shimmer from '@/components/shimmer/Component.vue';
import ShimmerHeading from '@/components/shimmer/ShimmerHeading.vue';
import ShimmerText from '@/components/shimmer/ShimmerText.vue';
import Panel from '@/components/Panel.vue';

export default {
    name: 'ShimmerExample',
    components: {
        Shimmer,
        ShimmerHeading,
        ShimmerText,
        Panel
    },
    data() {
        return {
            value: true,
            repeatCount: 3
        };
    }
};
</script>

<style lang="scss" scoped>
.shimmer-wrapper {
    padding: $default-content-padding;
}
</style>
