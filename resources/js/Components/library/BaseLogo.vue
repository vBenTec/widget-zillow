<script setup lang="ts">
// ************* PROPS ************* //
// ************* TYPES ************* //
interface Props {
    src: string
    size: 'sm' | 'md' | 'lg'
}

// ************* PROPS ************* //
withDefaults(defineProps<Props>(), {
    size: 'sm',
})

</script>

<template>
    <figure class="logo size" :class="{'sm': 'size--small', 'md': 'size--medium', 'lg': 'size--large'}[size]">
        <!--     :TODO translation   -->
        <img :src="src" alt="company logo">
    </figure>
</template>

<style lang="scss" scoped>
.logo {
    border-radius: 100%;
    overflow: hidden;
    box-shadow: 0 0 1rem 0 red;

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
