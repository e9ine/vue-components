<template>
    <div>
        <h4 class="section-title">
            Card with Custom Content Area
        </h4>
        <Card
            title="John Doe"
            :options="cardOptions"
            sub-title="Developer at e9ine"
            card-media-image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
            card-supporting-text="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam unde consequuntur repellat quia asperiores voluptatibus consectetur repudiandae voluptate? Qui veniam quidem error quod nisi asperiores sit illo illum alias maiores."
        >
            <template #cardCustomContent>
                <div class="custom-content-example">
                    <h6>Example Custom Content</h6>
                    <p class="body-s">
                        Custom content is always visible. There is no need for it to be expanded or collapsed. All padding and spacing needs to be managed within the custom content html.
                    </p>
                    <div class="highlights">
                        <img src="https://image.flaticon.com/icons/svg/2446/2446057.svg" alt="" />
                        <img src="https://image.flaticon.com/icons/svg/2446/2446120.svg" alt="" />
                        <img src="https://image.flaticon.com/icons/svg/2446/2446260.svg" alt="" />
                        <img src="https://image.flaticon.com/icons/svg/2446/2446137.svg" alt="" />
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
    name: 'CardCustomSlotExample',
    components: {
        Card
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
                ]
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

<style lang="scss" scoped>
.wrapper {
    width: 320px;
    margin-right: 16px;
    margin-bottom: 40px;
    h4 {
        margin-top: 32px;
        margin-bottom: 32px;
        color: #888;
    }
    span {
        background-color: #d21d1d;
        color: white;
        border-radius: 4px;
        padding: 2px 8px;
        margin-right: 8px;
        margin-bottom: 8px;
    }
    .description {
        margin-bottom: 16px;
    }
}
.custom-content-example {
    padding: 12px 16px 16px;
    //background-color: #eee;
    h4 {
        margin: 0;
        color: #000;
        line-height: 28px;
    }
    p {
        font-size: 12px;
        color: #777;
    }
    .highlights {
        display: flex;
        justify-content: flex-start;
        margin: 1.5rem 0 1rem;
        img {
            height: 40px;
            margin-right: 16px;
        }
    }
}
p {
    margin-block-start: 0em;
    margin-block-end: 0em;
}
</style>
