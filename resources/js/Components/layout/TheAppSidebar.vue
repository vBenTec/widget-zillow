<script setup lang="ts">
// ************* import COMPONENTS ************* //
import BaseLogo from "@/Components/library/BaseLogo.vue";
import BaseIcon from "@/Components/library/BaseIcon.vue";
import LocationWidget from "@/Components/widgets/LocationWidget.vue";
import WeatherWidget from "@/Components/widgets/WeatherWidget.vue";
import BaseInput from "@/Components/library/forms/BaseInput.vue";
// ************* import COMPOSABLES ************* //
import {useFetch} from "@/composables/useFetch";
// ************* import UTILS & HELPERS ************* //
import {ref, watch, onBeforeMount} from "vue";
import {useBreakpoints} from "@vueuse/core";
// ************* import UTILS & HELPERS ************* //
import weatherApi from "@/services/weatherApi";
import geoApi from "@/services/geoApi";
// ************* import TYPES ************* //
import type {WeatherData} from "@/types/weatherApiTypes";
import type {GeoData} from "@/types/geocodeApiTypes";

// ************* COMPOSABLES ************* //
const {callApi, isFetching, data, error} = useFetch()

const breakpoints = useBreakpoints({desktop: 1100, tablet: 600, phone: 0})

// ************* local STATE ************* //
const isOpen = ref(true)
const searchValue = ref('')
const isSpaceSquadLocation = ref(false)
const weatherData = ref<WeatherData>()
const geoData = ref<GeoData>()
// ************* WATCH ************* //
watch(() => breakpoints.desktop.value, (isDesktop) => {
    // If user changes manually the size of the window
    isOpen.value = !!isDesktop;
}, {immediate: true})

// should be a util function in a real app
const onToggleMenu = () => {
    isOpen.value = !isOpen.value
}

const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const coords = {
            lat: position.coords.latitude.toString(),
            lon: position.coords.longitude.toString()
        }
        await fetchAndLoadLocationData(coords)
    })
}


const getSpaceSquadLocation = async () => {
    isSpaceSquadLocation.value = true
    const coords = {lat: '52.4683456', lon: '13.3872712'}
    await fetchAndLoadLocationData(coords)
}

const fetchAndLoadLocationData = async (coords: { lat: string, lon: string }) => {
    const [resWeather, resGeo] = await Promise.allSettled([callApi(() => weatherApi.getWeather(coords)), callApi(() => geoApi.getGeoData(coords))])
    if (resWeather?.value?.data) {
        weatherData.value = resWeather.value.data
    }
    if (resGeo?.value?.data) {
        geoData.value = resGeo.value.data
    }
}
onBeforeMount(() => {
    getCurrentLocation()
})

</script>

<template>
    <aside class="sidebar bg-gray-200 dark:bg-gray-800" :class="{'sidebar--hidden': !isOpen}">
        <div class="top-container mb-8">
            <base-logo class=""/>
            <base-input v-model="searchValue" placeholder="Search a town" type="search" class=" top-container__input"/>
            <base-icon @click="getSpaceSquadLocation" tag="button" :icon="{name:'fa-search-location', scale:1.2}"/>
        </div>
        <div>
            <h3 class="dark:text-white mb-2 text-2xl">Hello,
                <strong>{{ isSpaceSquadLocation ? 'SPACE_SQUAD' : 'beautiful' }}</strong>
                {{ isSpaceSquadLocation ? '' : 'people' }} </h3>
        </div>
        <transition name="fade" appear>
            <weather-widget class="grow flex flex-col" v-if="weatherData && geoData" :weather-data="weatherData"
                            :geo-data="geoData">
                <location-widget class="mt-auto" v-if="geoData" :geo-data="geoData"/>
            </weather-widget>
        </transition>
        <!--  Should be a component IMPORTANT ALWAYS last item-->
        <button @click="onToggleMenu" aria-roledescription="Opens and close nav bar"
                class="flex justify-center items-center bg-gray-400">
            <base-icon class="chevron dark:text-white text-black bg-gray-900" :icon="{name:'fa-chevron-left', scale: 1.2}"/>
        </button>
    </aside>
</template>

<style lang="scss" scoped>
@mixin break($breakpoint) {
    @if $breakpoint == phone {
        @media only screen and (min-width: 43.75em) {
            // 600px = 37.5 em
            @content;
        }
    }

    @if $breakpoint == tablet {
        @media only screen and (min-width: 43.75em) {
            // 600px = 37.5 em
            @content;
        }
    }

    @if $breakpoint == desktop {
        @media only screen and (min-width: 68.75em) {
            // 1100px = 68.75em
            @content;
        }
    }
}

.sidebar {
    padding: 2rem;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    transition: all 200ms ease-in-out;
    box-shadow: 0 0 0.2rem 0 lightgrey;
    display: flex;
    flex-direction: column;

    @include break(desktop) {
        position: static;
    }

    // Class controls visibility of sidebar
    &--hidden {
        transform: translateX(-70%);
        background: transparent;
        box-shadow: 0 0 0 0 transparent;

        *:not(:last-child) {
            opacity: 0;
            transition: all 200ms ease-in-out;
        }

        .chevron {
            transform: rotate(180deg);
        }
    }

    // Childern
    .top-container {
        display: flex;
        align-items: center;
        gap: 1rem;

        &__input {
            max-width: 10rem;
        }
    }
}

.chevron {
    border: 2px solid gray;
    width: fit-content;
    height: fit-content;
    border-radius: 100%;
    padding: 0.4rem;
    flex-shrink: 0;
    transition: all 200ms ease-in-out;
    transform-origin: center;

    position: absolute;
    bottom: 2rem;
    right: 2rem;

    &:hover {
        box-shadow: 0 0 0;
    }

    @include break(desktop) {
        display: none;
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
