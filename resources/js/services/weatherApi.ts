import axios from 'axios'
import {WEATHER_URL_BASE} from '@/services/endpoints'
import type {WeatherApiResponse} from '@/types/weatherApiTypes'

type ExcludeOptions = 'current' | 'minutely' | 'hourly' | 'daily' | 'alerts';
type Unit = 'standard' | 'metric' | 'imperial'
type Lang = 'de' | 'en'

interface WeatherParams {
    lat: string
    lon: string
    exclude?: ExcludeOptions[];
    units?: Unit;
    lang?: Lang
}

export default {
    getWeather(params: WeatherParams): Promise<WeatherApiResponse> {
        return axios.get(WEATHER_URL_BASE, {
            headers: {
                'accept': 'application/json',
            },
            params
        })
    }
}
