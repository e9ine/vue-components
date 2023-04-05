<template>
    <div>
        <div class="item-wrapper">
            <h5>Check Box</h5>
            <div class="form-element">
                <input id="check-1" v-model="checkValue" class="check" type="checkbox" />
                <label class="check-label box" for="check-1">
                    <span />
                </label>
            </div>
        </div>
        <div class="item-wrapper">
            <h5>Toggle Button</h5>
            <div class="form-element">
                <input id="switch-1" v-model="toggleValue" class="check" type="checkbox" />
                <label class="check-label switch" for="switch-1" />
            </div>
        </div>
        <div class="item-wrapper">
            <h5>Radio Buttons</h5>
            <div class="form-element">
                <input id="option-1" v-model="radioValue" class="check" type="radio" value="male" />
                <label class="check-label radio" for="option-1" /> Male
            </div>

            <div class="form-element">
                <input id="option-2" v-model="radioValue" class="check" type="radio" value="female" />
                <label class="check-label radio" for="option-2" /> Female
            </div>
            <div class="form-element">
                <input id="option-3" v-model="radioValue" class="check" type="radio" value="other" />
                <label class="check-label radio" for="option-3" /> Other
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SelectionIndicators',
    data() {
        return {
            checkValue: false,
            toggleValue: false,
            radioValue: ''
        };
    }
};
</script>
