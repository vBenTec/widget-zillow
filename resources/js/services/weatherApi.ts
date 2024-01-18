import axios from 'axios'
import {WEATHER_URL_BASE} from '@/services/endpoints'

const apiKeyWeather = import.meta.env.VITE_API_KEY_OPEN_WEATHER
type ExcludeOptions = 'current' | 'minutely' | 'hourly' | 'daily' | 'alerts';
type Unit = 'standard' | 'metric' | 'imperial'
type Lang = 'de' | 'en'

interface WeatherParams {
    lat: string
    long: string
    exclude?: ExcludeOptions[];
    units?: Unit;
    lang?: Lang
}

export default {
    getWeather(params: WeatherParams) {
        console.log(import.meta)
        return axios.get(WEATHER_URL_BASE, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            params: {...params, appid: apiKeyWeather}
        })
    }
}
