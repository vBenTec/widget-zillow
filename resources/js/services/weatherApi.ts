import axios from 'axios'
import {WEATHER_API_URL} from '@/services/endpoints'
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
        return axios.get(WEATHER_API_URL, {
            headers: {
                'accept': 'application/json',
            },
            params
        })
    }
}
