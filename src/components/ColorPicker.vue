<template>
    <div ref="colorpicker">
        <div class="input-group color-picker">
            <input type="text" v-model="colorValue" @focus="showPicker" @input="updateFromInput" />
            <span class="color-container"><span class="current-color" :style="'background-color: ' + colorValue" @click="togglePicker"></span> </span>
        </div>
        <div class="color-picker-container" v-if="displayPicker">
            <chrome-picker :value="colors" @input="updateFromPicker" />
        </div>
    </div>
</template>

<script>
import Chrome from 'vue-color/src/components/Chrome.vue';
export default {
    name: 'ColorPicker',
    props: {
        color: {
            type: String,
            validator: (value) => {
                if (!value) {
                    return true;
                } else if (value[0] === '#') {
                    return true;
                }
                return false;
            }
        }
    },
    components: {
        'chrome-picker': Chrome
    },
    data() {
        return {
            colors: {
                hex: '#000000'
            },
            colorValue: '',
            displayPicker: false
        };
    },
    methods: {
        setColor(color) {
            this.updateColors(color);
            this.colorValue = color;
        },
        updateColors(color) {
            if (color.slice(0, 1) === '#') {
                this.colors = {
                    hex: color
                };
            } else if (color.slice(0, 4) === 'rgba') {
                let rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(','),
                    hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
                this.colors = {
                    hex: hex,
                    a: rgba[3]
                };
            }
        },
        showPicker() {
            document.addEventListener('click', this.documentClick);
            this.displayPicker = true;
        },
        hidePicker() {
            document.removeEventListener('click', this.documentClick);
            this.displayPicker = false;
        },
        togglePicker() {
            this.displayPicker ? this.hidePicker() : this.showPicker();
        },
        updateFromInput() {
            this.updateColors(this.colorValue);
        },
        updateFromPicker(color) {
            this.colors = color;
            if (color.rgba.a === 1) {
                this.colorValue = color.hex;
            } else {
                this.colorValue = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')';
            }
        },
        documentClick(e) {
            let el = this.$refs.colorpicker,
                target = e.target;
            if (el !== target && !el.contains(target)) {
                this.hidePicker();
            }
        }
    },
    watch: {
        colorValue(val) {
            if (val) {
                this.updateColors(val);
                this.$emit('updated', val);
                this.$emit('update:color', val);
            }
        }
    },
    mounted() {
        this.setColor(this.color || '#000000');
    }
};
</script>
