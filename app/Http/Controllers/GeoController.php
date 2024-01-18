<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class GeoController extends Controller
{
        /**
       * Interact with the GeoCode API to get location data
       */
      public function getGeoData(Request $request)
          {
              $lat = $request->query('lat');
              $lon = $request->query('lon');
              $url = "https://geocode.xyz/{$lat},{$lon}";

              $params = [
                  'json' => '1',
                  'auth' => env('API_KEY_GEOCODE'),
              ];

              try {
                  $response = Http::get($url, $params);

                  if ($response->successful()) {
                      return response()->json($response->json());
                  } else {
                      return response()->json(['error' => 'An error occurred while fetching geo data'], 500);
                  }
              } catch (\Exception $e) {
                  return response()->json(['error' => 'An error occurred while fetching geo data'], 500);
              }
          }
}
