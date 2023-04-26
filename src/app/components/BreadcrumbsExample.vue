<template>
    <div>
        <router-link to="/breadcrumbs/level-1">
            Click Me!
        </router-link>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'BreadcrumbsExample'
};
</script>
