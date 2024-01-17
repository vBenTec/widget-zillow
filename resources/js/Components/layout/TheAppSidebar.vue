<script setup lang="ts">
import BaseLogo from "@/Components/library/BaseLogo.vue";
import {useTime} from "@/composables/useTime";

const {displayTime} = useTime()

// should be a util function in a real app

</script>

<template>
    <aside class="sidebar bg-gray-200 dark:bg-gray-800">
        <base-logo
            class="mb-8"
            src="https://images.pexels.com/photos/4994765/pexels-photo-4994765.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
        <div>
            <h3 class="dark:text-white mb-2 text-2xl">Hello, <strong>beautiful</strong> people</h3>
        </div>

        <div>
            <time class="dark:text-gray-200 text-black">
                {{ displayTime }}
            </time>
        </div>
    </aside>
</template>

<style lang="scss" scoped>
.sidebar {
    padding: 2rem;
}
</style>
