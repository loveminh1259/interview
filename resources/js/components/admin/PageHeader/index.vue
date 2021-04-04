<template>
    <div class="page-header">
        <h1>{{pageHeader}}</h1>
    </div>
</template>
<script>
export default {
    props: {
        pageHeader: {
            type: String,
            default: ''
        }
    }
}
</script>
<style scoped>
@import url('./assets/style.css');
</style>