<script lang="ts">
import {OhVueIcon, addIcons} from 'oh-vue-icons'
// Weather Icons
import {WiSprinkle} from 'oh-vue-icons/icons'
// Fontawesome Icons
import {FaSquarespace, FaChevronLeft, FaChevronRight, FaSearchLocation, FaMountain, FaPeopleCarry, FaLocationArrow} from 'oh-vue-icons/icons'

/**
 * @info
 * Weather Icons
 * Fontawesome Icons
 **/

// Weather Icons
addIcons(WiSprinkle, FaSquarespace)
// Fontawesome Icons
addIcons(FaSquarespace, FaChevronLeft, FaChevronRight, FaSearchLocation, FaMountain, FaPeopleCarry, FaLocationArrow)
export default {
    components: {
        'LibIcon': OhVueIcon,
    },
}
</script>

<script setup lang="ts">
interface Props {
    icon: {
        name: string
        scale?: number
    }
    tag?: 'div' | 'button'
    styling?: 'light-gray'
}

withDefaults(defineProps<Props>(), {
    styling: 'light-gray',
    tag: 'div',
})
</script>

<template>
    <component :is="tag" v-bind:class="['icon-wrapper', `icon-wrapper--${styling}`]">
        <lib-icon
            v-bind:class="[`icon-wrapper__icon--${styling}`]"
            v-bind:name="icon.name"
            v-bind:scale="icon.scale || 1"
        />
        <slot/>
    </component>
</template>

<style lang="scss" scoped>
.icon-wrapper {
    z-index: 0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    /* Styling */
    /* LIGHT GREY */
    &--light-gray {
        color: rgba(160, 174, 192, 0.56);
    }
}
</style>
