<template>
    <div class="app">
        <TimepickerExample></TimepickerExample>
        <ButtonExample />
        <AvatarInfoExample></AvatarInfoExample>
    </div>
</template>

<script>
import TimepickerExample from '@/app/components/TimepickerExample';
import ButtonExample from './app/components/ButtonExample';
import AvatarInfoExample from './app/components/AvatarInfoExample';
export default {
    components: {
        TimepickerExample,
        ButtonExample,
        AvatarInfoExample
    }
};
</script>
<style lang="scss">
.app {
    padding: 1rem;
}
</style>
