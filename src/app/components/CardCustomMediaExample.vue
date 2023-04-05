<template>
    <div>
        <h4 class="section-title">
            Card with media content (without image)
        </h4>
        <Card
            card-supporting-text="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
        >
            <template #cardMediaContent>
                <div>
                    <iframe
                        width="100%"
                        height="180px"
                        src="https://www.youtube.com/embed/onOEns_MnC4"
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    />
                </div>
            </template>
        </Card>
    </div>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
    name: 'CardCustomMediaExample',
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
                expandedContentTitle: 'Expanded Connections',
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

<style lang="scss" scoped></style>
