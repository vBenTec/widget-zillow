<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class CryptocurrencyController extends Controller
{
       /**
       * Interact with the Cryptocurrency API to get cryptocurrency data
       */
       public function getCryptocurrencies(Request $request)
       {
              $url = "https://api.coinlore.net/api/tickers/";

              $params = [
                  'start' => '0',
                  'limit' => '100',
              ];

              try {
                  $response = Http::get($url, $params);

                  if ($response->successful()) {
                      return response()->json($response->json());
                  } else {
                      return response()->json(['error' => 'An error occurred while fetching cryptocurrencies data'], 500);
                  }
              } catch (\Exception $e) {
                  return response()->json(['error' => 'An error occurred while fetching cryptocurrencies data'], 500);
              }
       }
}
