<script setup lang="ts">
import {computed} from 'vue';
import type {GeoData} from '@/types/geoData'
import BaseIcon from "@/Components/library/BaseIcon.vue";
import BaseButton from "@/Components/library/BaseButton.vue";

// ************* TYPES ************* //
interface Props {
    geoData: GeoData
    imgSrc?: string
}

// ************* PROPS ************* //
const props = withDefaults(defineProps<Props>(), {
    imgSrc: 'https://images.pexels.com/photos/32307/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600'
})

const wikiUrl = computed(() => {
    const wikiSlug = props.geoData.osmtags.wikipedia
    return `https://wikipedia.org/wiki/${wikiSlug}`
})

</script>

<template>
    <dl class="container" v-if="geoData">
        <dt class="text-white text-sm relative z-10 font-bold mb-4">
            {{ `${geoData.city}, ${geoData.prov}, ${geoData.country}` }}
        </dt>
        <dd class="relative z-10">
            <div class="flex gap-2 items-center">
                <base-icon class="text-gray-100" :icon="{name:'fa-people-carry'}"/>
                <span class="text-white">
                {{ geoData.osmtags.population }}
                </span>
            </div>

            <div class="flex gap-2 items-center">
                <base-icon class="text-gray-100" :icon="{name:'fa-location-arrow'}"/>
                <span class="text-white">
                    {{ geoData.osmtags.is_in_region }}
                </span>
            </div>

            <div class="flex gap-2 items-center mb-4">
                <base-icon class="text-gray-100" :icon="{name:'fa-mountain'}"/>
                <span class="text-white">
                    {{ geoData.elevation }}
                </span>
            </div>

            <a :href="wikiUrl" target="_blank">
                <base-button name="Wiki"/>
            </a>
        </dd>
    </dl>
</template>

<style scoped lang="scss">
.container {
    padding: 2rem;
    border-radius: 2rem;
    background-position: center;
    background-size: cover;
    background-image: url('https://images.pexels.com/photos/32307/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600');
    position: relative;
    overflow: clip;

    &:before {
        content: '';
        z-index: 5;
        position: absolute;
        width: 100%;
        height: 100%;
        bottom: 0;
        left: 0;
        background: linear-gradient(180deg, rgba(5, 3, 36, 0.6012780112044818) 100%, rgba(2, 0, 36, 0.3799894957983193) 0%);
    }
}
</style>
