<template>
    <div class="breadcrumbs">
        <slot name="pre" />
        <ul>
            <li v-for="(route, key) in $route.matched.slice(0, $route.matched.length - 1)" :key="key">
                <router-link :to="{name: route.name}" tag="a">
                    {{ route.name }}
                </router-link>
                <span v-show="!$slots.default" class="delimeter">
                    /
                </span>
                <slot />
            </li>
            <li>
                {{ $route.name }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Breadcrumbs'
};
</script>
