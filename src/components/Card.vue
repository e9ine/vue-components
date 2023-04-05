<template>
    <div class="card">
        <div class="card-container">
            <div v-if="options.actions && options.cardActionsLocation == 'top'" class="card-actions-wrapper">
                <a href="" class="card-actions-toggle"
                    ><span class="material-icons" @click.prevent="toggleCardActions = !toggleCardActions">
                        more_vert
                    </span></a
                >
                <div v-show="toggleCardActions" class="card-actions">
                    <a v-for="(action, key) in options.actions" :key="key" class="link" :href="action.href" @click="handleAction(action.clickAction)">
                        {{ action.name }}
                    </a>
                </div>
            </div>
            <div v-if="!options.cardInfoLocation || options.cardInfoLocation == 'top'" class="card-info">
                <Avatar v-if="options.avatarOptions" :text="options.avatarOptions.text" :image-url="options.avatarOptions.imageUrl" :size="48" />
                <div class="details">
                    <h6 v-text="title" />
                    <p class="subtitle-s" v-text="subTitle" />
                </div>
            </div>
            <div class="card-media">
                <div v-if="cardMediaImage" class="card-media-image" :style="{'background-image': 'url(' + cardMediaImage + ')', height: cardMediaImageHeight + 'px'}" />
                <div v-else class="card-media-content">
                    <slot name="cardMediaContent" />
                </div>
            </div>
            <div v-if="options.cardInfoLocation == 'middle'" class="card-info">
                <Avatar v-if="options.avatarOptions" :text="options.avatarOptions.text" :image-url="options.avatarOptions.imageUrl" :size="48" />
                <div class="details">
                    <h6 v-text="title" />
                    <p class="subtitle-s" v-text="subTitle" />
                </div>
            </div>
            <div v-if="cardSupportingText" class="card-supporting">
                <p class="body-s" v-text="cardSupportingText" />
            </div>
            <div v-if="$slots.cardCustomContent" class="card-custom">
                <hr />
                <div class="card-custom-content">
                    <div class="card-custom-content-details">
                        <slot name="cardCustomContent" />
                    </div>
                </div>
            </div>
            <div v-if="$slots.cardExpandedContent" class="card-expanded">
                <hr />
                <div class="card-expanded-content">
                    <div v-show="toggle" class="card-expanded-content-details">
                        <slot name="cardExpandedContent" />
                    </div>
                    <a v-if="!options.expandedContentTitle" class="link expand" @click="toggle = !toggle">{{ toggle ? 'Collapse' : 'Expand' }}</a>
                    <a v-if="options.expandedContentTitle" class="link expand" @click="toggle = !toggle">{{ toggle ? 'Collapse' : options.expandedContentTitle }}</a>
                </div>
            </div>
            <div v-if="options.actions && (!options.cardActionsLocation || options.cardActionsLocation == 'bottom')" class="card-actions">
                <a v-for="(action, key) in options.actions" :key="key" class="link" :href="action.href" @click="handleAction(action.clickAction)">
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
    components: {
        Avatar
    },
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
                return value.substring(0, 4) === 'http';
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
