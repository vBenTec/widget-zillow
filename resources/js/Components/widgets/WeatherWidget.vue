<script setup lang="ts">
// ************* import COMPONENTS ************* //
import LocationWidget from "@/Components/widgets/LocationWidget.vue";

// ************* import UTILS & HELPERS ************* //
import {computed} from "vue";
import {useTime} from "@/composables/useTime";

// ************* import TYPES ************* //
import type {WeatherData} from "@/types/weatherApiTypes";
import type {GeoData} from "@/types/geocodeApiTypes";

// ************* TYPES ************* //
interface Props {
    weatherData: WeatherData
    geoData: GeoData
}

// ************* PROPS ************* //
const props = defineProps<Props>()

// ************* COMPOSABLES ************* //
const {currentTimeAndDay} = useTime()

// ************* local STATE ************* //
const weatherURL = import.meta.env.VITE_URL_OPEN_WEATHER


// ************* GETTERS ************* //

const currentWeather = computed(() => ({
    icon: {
        big: `${weatherURL}/img/wn/${props.weatherData.current.weather[0].icon}@2x.png`,
        small: `${weatherURL}/img/wn/${props.weatherData.current.weather[0].icon}.png`,
    },
    description: props.weatherData.current.weather[0].description[0].toUpperCase() + props.weatherData?.current.weather[0].description.slice(1),
}))

// ************* FUNCTIONS | METHODS ************* //
function kelvinToFahrenheit(kelvin: number): number {
    return Math.ceil(kelvin - 273.15)
}
</script>

<template>
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
        <div class="flex flex-col grow mb-14" v-if="weatherData">
            <div class="flex gap-2 items-center">
                <img :src="currentWeather.icon.small" class="icon" alt="Current Weather Icon"/>
                <span class="text-gray-800 dark:text-white text-sm">{{ currentWeather.description }}</span>
            </div>
            <slot/>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>
