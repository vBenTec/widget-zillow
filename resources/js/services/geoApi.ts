import axios from 'axios'
import {GEO_API_URL} from '@/services/endpoints'
import type {WeatherApiResponse} from '@/types/weatherApiTypes'

type ExcludeOptions = 'current' | 'minutely' | 'hourly' | 'daily' | 'alerts';
type Unit = 'standard' | 'metric' | 'imperial'
type Lang = 'de' | 'en'

interface WeatherParams {
    lat: string
    lon: string
}

export default {
    getGeoData(params: WeatherParams): Promise<WeatherApiResponse> {
        return axios.get(GEO_API_URL, {
            headers: {
                'accept': 'application/json',
            },
            params
        })
    }
}
