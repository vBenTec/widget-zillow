<script setup lang="ts">
import BaseSwitch from "@/Components/library/forms/BaseSwitch.vue";
import {ref, watchEffect} from "vue";
import {useDark, useToggle} from '@vueuse/core'

const isDarkMode = ref(false);
const isDark = useDark()
const toggleDark = useToggle(isDark)
watchEffect(() => {
    if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
})
</script>

<template>
    <header class="app-header ">
        <h3 class="dark:text-white">Hello, visitor</h3>
        <!--        <base-switch v-model="isDarkMode" @click="toggleDark"/>-->
    </header>
</template>

<style lang="scss" scoped>
.app-header {
    display: flex;
    padding: 2rem 4rem;
    box-shadow: 0 0 0.1rem 0 lightgrey;

}
</style>
