<script setup lang="ts">
// ************* TYPES ************* //
interface Props {
    tag?: 'div' | 'li'
}

// ************* PROPS ************* //
const props = withDefaults(defineProps<Props>(), {
    tag: 'div'
})
</script>

<template>
    <component class="card" :is="tag">
        <slot/>
    </component>
</template>

<style scoped lang="scss">
.card {
    border-radius: .5rem;
    box-shadow: 0 1px 0.2rem 0 rgba(0, 0, 0, 0.1);
    padding: 1rem;
}
</style>
