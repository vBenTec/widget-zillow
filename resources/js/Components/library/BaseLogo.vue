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
        <figure class="logo size" :class="{'sm': 'size--small', 'md': 'size--medium', 'lg': 'size--large'}[size]">
            <!--     :TODO translation   -->
            <base-icon class="text-black dark:text-white" :icon="{name: 'fa-squarespace', scale: 2}"/>
            <!--        <img :src="src" alt="company logo">-->
        </figure>
    </Link>
</template>

<style lang="scss" scoped>
.logo {
    border-radius: 100%;
    overflow: hidden;
    box-shadow: 0 0 1rem 0 red;
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
