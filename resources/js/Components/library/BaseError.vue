<script setup lang="ts">
// ************* TYPES ************* //
interface Props {
    msg?: string
}

// ************* PROPS ************* //
defineProps<Props>()
</script>

<template>
    <p class="p-1 rounded-lg font-bold text-center text-red-950 bg-red-50">
        {{ msg ? msg : '💥500 An error occurred! Try to reload, or contact admin.' }}
    </p>
</template>

<style scoped lang="scss">

</style>
