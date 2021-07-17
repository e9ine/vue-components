<template>
    <div class="card">
        <div class="card-container">
            <div class="card-actions-wrapper" v-if="options.actions && options.cardActionsLocation == 'top'">
                <a href="" class="card-actions-toggle"
                ><span class="material-icons" @click.prevent="toggleCardActions = !toggleCardActions">
                    more_vert
                </span></a
                >
                <div class="card-actions" v-show="toggleCardActions">
                    <a class="link" v-for="(action, key) in options.actions" :key="key" :href="action.href" @click="handleAction(action.clickAction)">
                        {{ action.name }}
                    </a>
                </div>
            </div>
            <div class="card-info" v-if="!options.cardInfoLocation || options.cardInfoLocation == 'top'">
                <Avatar :text="options.avatarOptions.text" :image-url="options.avatarOptions.imageUrl" :size="48" v-if="options.avatarOptions"></Avatar>
                <div class="details">
                    <h6 v-text="title"></h6>
                    <p class="subtitle-s" v-text="subTitle"></p>
                </div>
            </div>
            <div class="card-media">
                <div class="card-media-image" v-if="cardMediaImage" :style="{'background-image': 'url(' + cardMediaImage + ')', height: cardMediaImageHeight + 'px'}"></div>
                <div class="card-media-content" v-else>
                    <slot name="cardMediaContent"></slot>
                </div>
            </div>
            <div class="card-info" v-if="options.cardInfoLocation == 'middle'">
                <Avatar :text="options.avatarOptions.text" :image-url="options.avatarOptions.imageUrl" :size="48" v-if="options.avatarOptions"></Avatar>
                <div class="details">
                    <h6 v-text="title"></h6>
                    <p class="subtitle-s" v-text="subTitle"></p>
                </div>
            </div>
            <div class="card-supporting" v-if="cardSupportingText">
                <p class="body-s" v-text="cardSupportingText"></p>
            </div>
            <div class="card-custom" v-if="$slots.cardCustomContent">
                <hr />
                <div class="card-custom-content">
                    <div class="card-custom-content-details">
                        <slot name="cardCustomContent"></slot>
                    </div>
                </div>
            </div>
            <div class="card-expanded" v-if="$slots.cardExpandedContent">
                <hr />
                <div class="card-expanded-content">
                    <div class="card-expanded-content-details" v-show="toggle">
                        <slot name="cardExpandedContent"></slot>
                    </div>
                    <a @click="toggle = !toggle" class="link expand" v-if="!options.expandedContentTitle">{{ toggle ? 'Collapse' : 'Expand' }}</a>
                    <a @click="toggle = !toggle" class="link expand" v-if="options.expandedContentTitle">{{ toggle ? 'Collapse' : options.expandedContentTitle }}</a>
                </div>
            </div>
            <div class="card-actions" v-if="options.actions && (!options.cardActionsLocation || options.cardActionsLocation == 'bottom')">
                <a class="link" v-for="(action, key) in options.actions" :key="key" :href="action.href" @click="handleAction(action.clickAction)">
                    {{ action.name }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from './Avatar.vue';

export default {
    name: 'Card',
    props: {
        title: {
            type: String,
            default: 'Card Title'
        },
        subTitle: {
            type: String,
            default: 'This is the card description.'
        },
        cardMediaImage: {
            type: String,
            validator: (value) => {
                return value.substring(0, 4) == 'http';
            }
        },
        cardMediaImageHeight: {
            type: Number,
            default: 160
        },
        cardSupportingText: {
            type: String
        },
        options: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    components: {
        Avatar
    },
    data() {
        return {
            toggle: false,
            toggleCardActions: false
        };
    },
    methods: {
        handleAction(fn) {
            if (fn) {
                fn();
            } else {
                return false;
            }
        }
    }
};
</script>
