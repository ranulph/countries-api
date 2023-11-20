## Countries API

Country Information including name, 2 and 3 letter country codes, currencies, capital, region, languages, area, population, calling code, coordinates and neighbouring countries   
  
See https://api.countries.worlddata.run/ui for OpenAPI/Swagger documentation web interface.  

Uses Cloudflare Workers, Cloudflare KVStore, Hono, Hono OpenAPI plugin.  
   
Email ranulph@mailfence.com if you would like a Bearer Auth token.   
  
An example API response (3KB) to GET https://api.countries.worlddata.run/country/AUS  
  
{
  "name": {
    "common": "Australia",
    "official": "Commonwealth of Australia",
    "native": {
      "eng": {
        "official": "Commonwealth of Australia",
        "common": "Australia"
      }
    }
  },
  "tld": [
    ".au"
  ],
  "cca2": "AU",
  "ccn3": "036",
  "cca3": "AUS",
  "cioc": "AUS",
  "independent": true,
  "status": "officially-assigned",
  "unMember": true,
  "currencies": {
    "AUD": {
      "name": "Australian dollar",
      "symbol": "$"
    }
  },
  "idd": {
    "root": "+6",
    "suffixes": [
      "1"
    ]
  },
  "capital": [
    "Canberra"
  ],
  "altSpellings": [
    "AU"
  ],
  "region": "Oceania",
  "subregion": "Australia and New Zealand",
  "languages": {
    "eng": "English"
  },
  "translations": {...},
  "latlng": [
    -27,
    133
  ],
  "landlocked": false,
  "borders": [],
  "area": 7692024,
  "flag": "🇦🇺",
  "demonyms": {
    "eng": {
      "f": "Australian",
      "m": "Australian"
    },
    "fra": {
      "f": "Australienne",
      "m": "Australien"
    }
  },
  "callingCodes": [
    "+61"
  ],
  "population": 24982688
}
