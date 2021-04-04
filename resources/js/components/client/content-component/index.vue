<template>
    <div>
        <nav-bar></nav-bar>
        <slot/>
    </div>
</template>
<script>
import navbar from '../navbar'
export default {
    components: {
        'nav-bar': navbar
    }
}
</script>