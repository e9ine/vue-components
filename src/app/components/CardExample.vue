<template>
    <div>
        <p>A card is a flexible and extensible content container. It includes options for headers, content areas, and a powerful set of display options.</p>
        <div class="spacer-v" />
        <div class="row">
            <div class="col-sm-4">
                <div class="card-wrapper">
                    <h4>Simple Card</h4>
                    <Card title="John Doe" sub-title="Developer at e9ine" />
                </div>
            </div>
            <div class="col-sm-4">
                <div class="card-wrapper">
                    <h4>Card with Media Image</h4>
                    <Card
                        title="John Doe"
                        sub-title="Developer at e9ine"
                        card-media-image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                        card-supporting-text="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
                    />
                </div>
            </div>
            <div class="col-sm-4">
                <div class="card-wrapper">
                    <h4>Card with Button Options and card info below the media</h4>
                    <Card
                        :options="cardOptions"
                        title="John Doe"
                        sub-title="Developer at e9ine"
                        card-media-image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                        card-supporting-text="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
                    />
                </div>
            </div>
        </div>
        <div class="spacer-v" />
        <div class="row">
            <div class="col-sm-4">
                <CardCustomMediaExample />
            </div>

            <div class="col-sm-4">
                <CardCustomSlotExample />
            </div>

            <div class="col-sm-4">
                <CardExpandedSlotExample />
            </div>
        </div>
    </div>
</template>

<script>
import Card from '@/components/Card.vue';
import CardCustomMediaExample from '@/app/components/CardCustomMediaExample.vue';
import CardCustomSlotExample from '@/app/components/CardCustomSlotExample.vue';
import CardExpandedSlotExample from '@/app/components/CardExpandedSlotExample.vue';

export default {
    name: 'CardExample',
    components: {
        Card,
        CardCustomMediaExample,
        CardCustomSlotExample,
        CardExpandedSlotExample
    },
    data() {
        return {
            cardOptions: {
                avatarOptions: {
                    text: 'John Doe',
                    imageUrl: 'https://images.unsplash.com/photo-1514543250559-83867827ecce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2211&q=80'
                },
                actions: [
                    {
                        name: 'Click and Nav',
                        href: 'https://www.google.com',
                        clickAction: this.sayHi
                    },
                    {
                        name: 'Hello',
                        clickAction: this.sayHello
                    },
                    {
                        name: 'Navigate',
                        href: 'https://www.yahoo.com'
                    }
                ],
                cardInfoLocation: 'middle',
                cardActionsLocation: 'top'
            }
        };
    },
    methods: {
        sayHi() {
            alert('Hi');
        },
        sayHello() {
            alert('Hello');
        }
    }
};
</script>

<style lang="scss">
.card-wrapper {
    margin-bottom: 2rem;
}
</style>
