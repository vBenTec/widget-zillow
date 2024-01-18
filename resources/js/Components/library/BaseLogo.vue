<script setup lang="ts">
import {Link} from '@inertiajs/vue3';

// ************* PROPS ************* //
// ************* TYPES ************* //
import BaseIcon from "@/Components/library/BaseIcon.vue";

interface Props {
    size?: 'sm' | 'md' | 'lg'
}

// ************* PROPS ************* //
withDefaults(defineProps<Props>(), {
    size: 'sm',
})

</script>

<template>
    <Link class="inline-block" href="/">
        <figure class="logo size shadow-[0_1px_0.2rem_0_rgba(0,0,0,0.1)] dark:shadow-[0_1px_0.2rem_0_rgba(255,255,255,.2)]" :class="{'sm': 'size--small', 'md': 'size--medium', 'lg': 'size--large'}[size]">
            <!--     :TODO translation   -->
            <base-icon styling="none" class="text-gray-400 dark:text-white" :icon="{name: 'fa-squarespace', scale: 2}"/>
            <!--        <img :src="src" alt="company logo">-->
        </figure>
    </Link>
</template>

<style lang="scss" scoped>
.logo {
    border-radius: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        display: inline-block;
        width: 100%;
        height: 100%;
    }

    // Define the size of the logo
    &.size {
        &--small {
            width: 4rem;
            height: 4rem;
        }

        &--medium {
        }

        &--large {
        }
    }
}
</style>
