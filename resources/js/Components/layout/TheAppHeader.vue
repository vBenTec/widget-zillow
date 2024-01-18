<script setup lang="ts">
// import BaseSwitch from "@/Components/library/forms/BaseSwitch.vue";
import {ref, watchEffect} from "vue";
// import {useDark, useToggle} from '@vueuse/core'

const isDarkMode = ref(false);
// const isDark = useDark()
// const toggleDark = useToggle(isDark)
// watchEffect(() => {
//     if (isDarkMode.value) {
//         document.documentElement.classList.add('dark');
//     } else {
//         document.documentElement.classList.remove('dark');
//     }
// })
</script>

<template>
    <header class="app-header ">
        <img class="w-12 h-12 rounded-full border border-gray-500" src="https://images.pexels.com/photos/2152/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=600">
        <h3 class="dark:text-white">Widget Zillows, time to contribute 🥷</h3>
        <!--        <base-switch v-model="isDarkMode" @click="toggleDark"/>-->
    </header>
</template>

<style lang="scss" scoped>
.app-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 4rem;
    box-shadow: 0 0 0.1rem 0 lightgrey;

}
</style>
