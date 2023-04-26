<template>
    <div class="wrapper">
        <div class="item-wrapper">
            <h5>Full overlay</h5>
            <div>
                <Button type="success" text="Show Overlay" :action="() => (show1 = true)"></Button>
                <Overlay :show.sync="show1" :show-close="true" custom-content-class="mt16">
                    <div class="overlay-wrapper">
                        <div class="form-group">
                            <input type="number" placeholder="Please enter the amount..." class="form-control" />
                        </div>
                        <Button type="primary" size="sm" text="Save" :action="hideOverlay"></Button>
                    </div>
                </Overlay>
            </div>
        </div>
        <div class="item-wrapper">
            <h5>Relative overlay</h5>
            <Button type="info" text="Show Overlay" :action="() => (show2 = true)" custom-class="mb16"></Button>
            <div class="relative-example">
                <Overlay :show.sync="show2" :show-close="false" :relative="true">
                    <div class="overlay-flex-wrapper">
                        <Button type="danger" text="Hide Overlay" :action="hideOverlay"></Button>
                    </div>
                </Overlay>
            </div>
        </div>
        <div class="item-wrapper">
            <h5>Loader overlay</h5>
            <div>
                <Button type="warning" text="Launch Application" :action="showLoader">
                    <i class="material-icons">open_in_new</i>
                </Button>
                <Overlay :show.sync="show3" :show-close="false" custom-content-class="full-loader" :opacity="0.9">
                    <img class="spinner" :src="loaderSVG" />
                </Overlay>
            </div>
        </div>
    </div>
</template>
<script>
import loaderSVG from '../assets/loader.svg?url';
export default {
    name: 'OverlaysExample',
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
        width: 500px;
        color: #777;
        padding: 16px;
        border-radius: 4px;
        .form-group {
            width: 50%;
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
