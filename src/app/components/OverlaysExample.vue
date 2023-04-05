<template>
    <div class="wrapper">
        <h4>Full overlay</h4>
        <div>
            <Button type="success" text="Show Overlay" :action="() => (show1 = true)" />
            <Overlay :show.sync="show1" :show-close="true" custom-content-class="mt16">
                <div class="overlay-wrapper">
                    <input type="number" placeholder="Please enter the amount..." />
                    <Button type="primary" size="sm" text="Save" :action="hideOverlay" custom-class="mt16" />
                </div>
            </Overlay>
        </div>
        <div class="spacer-v" />
        <h4>Relative overlay</h4>
        <Button type="info" text="Show Overlay" :action="() => (show2 = true)" custom-class="mb16" />
        <div class="relative-example">
            <Overlay :show.sync="show2" :show-close="false" :relative="true">
                <div class="overlay-flex-wrapper">
                    <Button type="danger" text="Hide Overlay" :action="hideOverlay" />
                </div>
            </Overlay>
        </div>
        <div class="spacer-v" />
        <h4>Example Case - Loader</h4>
        <div>
            <Button type="warning" text="Launch Application" :action="showLoader">
                <i class="material-icons">open_in_new</i>
            </Button>
            <Overlay :show.sync="show3" :show-close="false" custom-content-class="full-loader" :opacity="0.9">
                <img class="spinner" src="../../assets/loader.svg?url" />
            </Overlay>
        </div>
    </div>
</template>

<script>
import Overlay from '@/components/Overlay.vue';
import Button from '@/components/Button.vue';

export default {
    name: 'OverlaysExample',
    components: {
        Overlay,
        Button
    },
    data() {
        return {
            show1: false,
            show2: false,
            show3: false
        };
    },
    methods: {
        hideOverlay() {
            this.show1 = false;
            this.show2 = false;
        },
        showLoader() {
            this.show3 = true;
            setTimeout(() => {
                this.show3 = false;
            }, 3000);
        }
    }
};
</script>

<style lang="scss" scoped>
.wrapper {
    padding: 8px;
    position: relative;
    .relative-example {
        height: 300px;
        border: 1px solid #e9e9e9;
    }
    .overlay-wrapper {
        background-color: #fff;
        color: #777;
        padding: 16px;
        input {
            outline: 0;
            border: 1px solid #e9e9e9;
            height: 36px;
            border-radius: 4px;
            padding: 4px 12px;
            font-size: 14px;
            width: 40%;
        }
    }
    .overlay-flex-wrapper {
        height: 100%;
        color: #777;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .spinner {
        height: 100px;
        width: 100px;
    }
    i {
        font-size: 18px !important;
    }
}
</style>
<style lang="scss">
.mt16 {
    margin-top: 16px;
}
.mb16 {
    margin-bottom: 16px;
}
.full-loader {
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
