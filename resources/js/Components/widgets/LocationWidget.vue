<script setup lang="ts">
// ************* import COMPONENTS ************* //
import BaseIcon from "@/Components/library/BaseIcon.vue";
import BaseButton from "@/Components/library/BaseButton.vue";
// ************* import UTILS & HELPERS ************* //
import {computed} from 'vue';
// ************* import TYPES ************* //
import type {GeoData} from '@/types/geocodeApiTypes'

// ************* TYPES ************* //
interface Props {
    geoData: GeoData
    imgSrc?: string
}

// ************* PROPS ************* //
const props = withDefaults(defineProps<Props>(), {
    imgSrc: 'https://images.pexels.com/photos/32307/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600'
})

// ************* GETTERS ************* //
const wikiUrl = computed(() => {
    const wikiSlug = props.geoData.osmtags.wikipedia
    return `https://wikipedia.org/wiki/${wikiSlug}`
})

const infos = computed(() =>
    [
        {
            count: props.geoData.osmtags.population,
            icon: 'fa-people-carry',
        },
        {
            count: props.geoData.osmtags.is_in_region,
            icon: 'fa-location-arrow',
        },
        {
            count: props.geoData.elevation,
            icon: 'fa-mountain',
        }
    ]
)


</script>

<template>
    <dl class="container dark:border dark:border-gray-100" v-if="geoData">
        <dt class="text-white text-sm relative z-10 font-bold mb-4">
            {{ `${geoData.city}, ${geoData.prov}, ${geoData.country}` }}
        </dt>
        <dd class="info-container">
            <div v-for="(info, index) in infos" :key="info.icon + index" class="flex gap-2 items-center">
                <base-icon class="text-gray-100" :icon="{name:info.icon}"/>
                <span class="text-white">
                {{ info.count }}
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
    box-shadow: none;

    &:before {
        content: '';
        z-index: 5;
        position: absolute;
        width: 100%;
        height: 100%;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
        display: block;

    }

    .info-container {
        position: relative;
        z-index: 10;

        > :nth-last-child(2) {
            margin-bottom: 1rem;
        }
    }
}
</style>
