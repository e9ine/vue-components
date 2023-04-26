<template>
    <div class="ratings">
        <i
            v-for="(n, index) in total"
            :key="index + 1"
            class="material-icons"
            :class="{disabled: !editable}"
            :style="getStyle"
            @mouseenter="hover(true, index + 1)"
            @mouseout="hover(false)"
            @click="selectRating(index + 1)"
        >
            {{ getIcon(index + 1) }}
        </i>
    </div>
</template>

<script>
export default {
    name: 'Ratings',
    props: {
        total: {
            type: Number,
            default: 5
        },
        value: {
            type: Number,
            default: 0
        },
        editable: {
            type: Boolean,
            default: true
        },
        color: {
            type: String
        },
        size: {
            type: String,
            validator: (val) => {
                return ['large', 'medium', 'small'].indexOf(val) > -1;
            }
        }
    },
    data() {
        return {
            tempColor: this.color || this.$store.state.constantModule.colors.brandPrimary,
            tempValue: this.value,
            isHover: false,
            hoveredIndex: 0
        };
    },
    computed: {
        getStyle() {
            return {
                color: this.tempColor,
                'font-size': this.size === 'large' ? '48px' : this.size === 'medium' ? '32px' : '24px'
            };
        }
    },
    methods: {
        hover(isHover, index) {
            this.isHover = isHover;
            if (!isHover) {
                this.hoveredIndex = 0;
            } else {
                this.hoveredIndex = index;
            }
        },
        getIcon(index) {
            if (this.isHover && this.editable) {
                return index <= this.hoveredIndex ? 'star' : 'star_border';
            } else {
                return index <= this.value ? 'star' : 'star_border';
            }
        },
        selectRating(val) {
            if (!this.editable) {
                return;
            }
            this.tempValue = val;
            this.$emit('update:value', val);
        }
    }
};
</script>

<style lang="scss" scoped>
.ratings {
    display: flex;
    justify-content: flex-start;

    i {
        margin-right: 4px;
        cursor: pointer;

        &.unfilled {
        }

        &.disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }
    }
}
</style>
