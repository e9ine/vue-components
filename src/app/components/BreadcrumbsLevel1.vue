<template>
    <div>
        <router-link to="/breadcrumbs/level-1/level-2">
            Click Me Now!
        </router-link>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'BreadcrumbsLevel1'
};
</script>
