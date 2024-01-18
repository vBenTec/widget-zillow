<script setup lang="ts">
import BaseLogo from "@/Components/library/BaseLogo.vue";
import {useTime} from "@/composables/useTime";
import BaseIcon from "@/Components/library/BaseIcon.vue";
import {ref, watch, computed} from "vue";
import {useBreakpoints} from "@vueuse/core";
import BaseInput from "@/Components/library/forms/BaseInput.vue";
import {useFetch} from "@/composables/useFetch";
import weatherApi from "@/services/weatherApi";
import type {WeatherData} from "@/types/weatherApiTypes";

// ************* COMPOSABLES ************* //
const {currentTimeAndDay} = useTime()
const {callApi, isFetching, data, error} = useFetch()

const breakpoints = useBreakpoints({desktop: 1100, tablet: 600, phone: 0})

// ************* local STATE ************* //
const isOpen = ref(true)
const searchValue = ref('')
const weatherData = ref<WeatherData>()
const weatherURL = import.meta.env.VITE_URL_OPEN_WEATHER
// ************* WATCH ************* //
watch(() => breakpoints.desktop.value, (isDesktop) => {
    // If user changes manually the size of the window
    isOpen.value = !!isDesktop;
}, {immediate: true})

// ************* GETTERS ************* //
const currentWeather = computed(() => ({
    icon: {
        big: `${weatherURL}/img/wn/${weatherData.value?.current.weather[0].icon}@2x.png`,
        small: `${weatherURL}/img/wn/${weatherData.value?.current.weather[0].icon}.png`,
    },
    description: weatherData.value?.current.weather[0].description[0].toUpperCase() + weatherData.value?.current.weather[0].description.slice(1),
}))
// should be a util function in a real app
const onToggleMenu = () => {
    isOpen.value = !isOpen.value
}

const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const res = await callApi(() => weatherApi.getWeather({
            lat: position.coords.latitude.toString(),
            lon: position.coords.longitude.toString()
        }))
        if (res?.data) {
            weatherData.value = res.data
        }

    })
}

function kelvinToFahrenheit(kelvin: number): number {
    return Math.ceil(kelvin - 273.15)
}
</script>

<template>
    <aside class="sidebar bg-gray-200 dark:bg-gray-800" :class="{'sidebar--hidden': !isOpen}">
        <div class="top-container mb-8">
            <base-logo class=""/>
            <base-input v-model="searchValue" placeholder="Search a town" type="search" class=" top-container__input"/>
            <base-icon @click="getCurrentLocation" tag="button" :icon="{name:'fa-search-location', scale:1.2}"/>
        </div>
        <div>
            <h3 class="dark:text-white mb-2 text-2xl">Hello, <strong>beautiful</strong> people</h3>
        </div>
        <div>
            <div class="flex justify-center" v-if="weatherData">
                <img class="block" :src="currentWeather.icon.big" alt="Weather icon">
            </div>
            <span class="block mb-4 text-5xl text-gray-800 dark:text-gray-300 pb-6 border-b border-gray-300"
                  v-if="weatherData">{{ kelvinToFahrenheit(weatherData.current.temp) }}°C</span>
            <time class="dark:text-gray-200 text-black">
                <span class="mr-2">{{ currentTimeAndDay.day }},</span>
                <span class="text-gray-400 text-bold">{{ currentTimeAndDay.time }}</span>
            </time>
            <div v-if="weatherData">
                <div class="flex gap-2 items-center">
                    <img :src="currentWeather.icon.small" class="icon" alt="Current Weather Icon"/>
                    <span class="text-gray-800 dark:text-white text-sm">{{ currentWeather.description }}</span>
                </div>

<!--                <div class="flex gap-2 items-center">-->
<!--                    <img :src="currentWeather.icon.small" class="icon" alt="Current Weather Icon"/>-->
<!--                    <span class="text-gray-800 dark:text-white text-sm">{{ currentWeather.description }}</span>-->
<!--                </div>-->

<!--                <dl>-->
                <!--                    <dt class="icon">Wind Status</dt>-->
                <!--                    <dd class="text">-->
                <!--                        <span>{{ weatherData.current.wind_speed }}</span>-->
                <!--                        <span class="text">{{ weatherData.current.wind_deg }}</span>-->
                <!--                        <span class="text">{{ weatherData.current.wind_gust }}</span>-->
                <!--                    </dd>-->
                <!--                </dl>-->
                <!--                <dl>-->
                <!--                    <dt class="icon">Sunrise Status</dt>-->
                <!--                    <dd class="text">-->
                <!--                        <span>{{ weatherData.current.wind_speed }}</span>-->
                <!--                        <span class="text">{{ weatherData.current.wind_deg }}</span>-->
                <!--                        <span class="text">{{ weatherData.current.wind_gust }}</span>-->
                <!--                    </dd>-->
                <!--                </dl>-->
            </div>
            <!--  Should be a component IMPORTANT ALWAYS last item-->
            <button @click="onToggleMenu" aria-roledescription="Opens and close nav bar"
                    class="flex justify-center items-center">
                <base-icon class="chevron dark:text-white text-black" :icon="{name:'fa-chevron-left', scale: 1.2}"/>
            </button>
        </div>
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
    box-shadow: 0 0 0.4rem 0 lightgrey;

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
</style>
