<template>
    <div>
        <h5>Size variations</h5>
        <div class="buttons">
            <div class="buttons-info">
                <label>Large</label>
                <Button size="lg" type="secondary" text="lg" :action="buttonClicked"></Button>
            </div>
            <div class="buttons-info">
                <label>Medium</label>
                <Button size="md" type="secondary" text="md" :action="buttonClicked"></Button>
            </div>
            <div class="buttons-info">
                <label>Small</label>
                <Button size="sm" type="secondary" text="sm" :action="buttonClicked"></Button>
            </div>
            <div class="buttons-info">
                <label>x-small</label>
                <Button size="xs" type="secondary" text="xs" :action="buttonClicked"></Button>
            </div>
        </div>
        <div class="spacer-v"></div>
        <h5>Type variations</h5>
        <h6 class="section-subtitle">Filled</h6>
        <div class="buttons">
            <div class="buttons-info">
                <label>Primary</label>
                <Button size="md" type="red" text="Primary" :action="buttonClicked"></Button>
            </div>
            <div class="buttons-info">
                <label>Secondary</label>
                <Button size="md" type="secondary" text="Secondary" :action="buttonClicked"></Button>
            </div>
            <div class="buttons-info">
                <label>Tertiary</label>
                <Button size="md" type="tertiary" text="Tertiary" :action="buttonClicked"></Button>
            </div>
            <div class="buttons-info">
                <label>Success</label>
                <Button size="md" type="success" text="Success" :action="buttonClicked"></Button>
            </div>
            <div class="buttons-info">
                <label>Warning</label>
                <Button size="md" type="warning" text="Warning"></Button>
            </div>
            <div class="buttons-info">
                <label>Info</label>
                <Button size="md" type="info" text="Info" :action="buttonClicked"></Button>
            </div>
            <div class="buttons-info">
                <label>Danger</label>
                <Button size="md" type="danger" text="Danger" :action="buttonClicked"></Button>
            </div>
            <div class="buttons-info">
                <label>Danger</label>
                <Button size="md" type="dark" text="Dark" :action="buttonClicked"></Button>
            </div>
            <div class="buttons-info">
                <label>Light</label>
                <Button size="md" type="light" text="Light" :action="buttonClicked"></Button>
            </div>
        </div>
        <div class="spacer-v"></div>
        <h6 class="section-subtitle">Bordered</h6>
        <div class="buttons">
            <div class="buttons-info">
                <label>Primary</label>
                <Button size="md" type="border-primary" text="Primary" :action="buttonClicked"></Button>
            </div>
            <div class="buttons-info">
                <label>Secondary</label>
                <Button size="md" type="border-secondary" text="Secondary" :action="buttonClicked"></Button>
            </div>
            <div class="buttons-info">
                <label>Tertiary</label>
                <Button size="md" type="border-tertiary" text="Tertiary" :action="buttonClicked"></Button>
            </div>
            <div class="buttons-info">
                <label>Success</label>
                <Button size="md" type="border-success" text="Success" :action="buttonClicked"></Button>
            </div>
            <div class="buttons-info">
                <label>Warning</label>
                <Button size="md" type="border-warning" text="Warning" :action="buttonClicked"></Button>
            </div>
            <div class="buttons-info">
                <label>Info</label>
                <Button size="md" type="border-info" text="Info" :action="buttonClicked"></Button>
            </div>
            <div class="buttons-info">
                <label>Danger</label>
                <Button size="md" type="border-danger" text="Danger" :action="buttonClicked"></Button>
            </div>
            <div class="buttons-info">
                <label>Danger</label>
                <Button size="md" type="border-dark" text="Dark" :action="buttonClicked"></Button>
            </div>
            <div class="buttons-info">
                <label>Light</label>
                <Button size="md" type="border-light" text="Light" :action="buttonClicked"></Button>
            </div>
        </div>
        <div class="spacer-v"></div>
        <h5>Other variations</h5>
        <div class="buttons">
            <div class="buttons-info">
                <label>Loader</label>
                <Button size="md" type="primary" text="Click to load" :async="true" :action="callAsyncApi"></Button>
            </div>
            <div class="buttons-info">
                <label>Loader with Text</label>
                <Button size="md" type="success" text="Click to load" :async="true" :action="callAsyncApi" loader-text="Loading..."></Button>
            </div>
            <div class="buttons-info">
                <label>Disabled</label>
                <Button size="md" type="warning" text="Click if you can" :action="buttonClicked" disabled></Button>
            </div>
            <div class="buttons-info">
                <label>Icon</label>
                <Button size="md" type="secondary" text="Cancel" :action="buttonClicked">
                    <i class="material-icons">undo</i>
                </Button>
            </div>
            <div class="buttons-info">
                <label>Async. Action</label>
                <Button size="md" type="tertiary" text="Fetch Data" :async="true" :action="callAsyncApi"></Button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {Button} from '../../../dist/vue-components';

export default {
    name: 'ButtonExample',
    components: {
        Button
    },
    methods: {
        async callAsyncApi() {
            try {
                let result = await axios.get('http://slowwly.robertomurray.co.uk/delay/3000/url/https://jsonplaceholder.typicode.com/todos/1');
                alert(JSON.stringify(result.data));
            } catch (e) {
                console.log('Handle Error');
            }
        },
        buttonClicked() {
            alert('Button Clicked Acknowledgement');
        }
    }
};
</script>

<style lang="scss" scoped>
.buttons {
    &-info {
        display: inline-grid;
        margin: 0 16px 16px 0;
        label {
            display: block;
            color: $grey;
            margin-bottom: 8px;
        }
    }
}
</style>
