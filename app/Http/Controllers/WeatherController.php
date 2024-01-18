<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class WeatherController extends Controller
{
     /**
     * Interact with the OpenWeatherMap API to get weather data
     */
    public function getWeatherData(Request $request)
        {
            $url = 'https://api.openweathermap.org/data/2.5/onecall'; // replace with your API URL
            $params = [
                'lat' => $request->query('lat'),
                'lon' => $request->query('lon'),
                'appid' => env('API_KEY_OPEN_WEATHER')
            ];

            try {
                $response = Http::get($url, $params);

                if ($response->successful()) {
                    return response()->json($response->json());
                } else {
                    return response()->json(['error' => 'An error occurred while fetching weather data'], 500);
                }
            } catch (\Exception $e) {
                return response()->json(['error' => 'An error occurred while fetching weather data'], 500);
            }
        }
}
