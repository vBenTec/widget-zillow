import type {BaseApiResponse} from './baseApiTypes'

interface Location {
    staddress: string;
    stnumber: string;
    postal: string | string[];
    dist: string;
    latt: string;
    city: string;
    prov: string;
    longt: string;
    class: any[];
}

interface Alt {
    loc: Location[];
}

interface Admin8 {
    wikipedia: string;
    source: string;
    population: string;
    idee_name: string;
    ine_municipio: string;
    is_in_region: string;
    is_in_province: string;
    boundary: string;
    wikidata: string;
    is_in: string;
    name: string;
    is_in_country: string;
    admin_level: string;
    level: string;
    population_date: string;
    type: string;
}

interface Admin6 {
    wikipedia: string;
    source: string;
    is_in_region: string;
    is_in_country_code: string;
    name_ru: string;
    name_be: string;
    name_lt: string;
    boundary: string;
    name_el: string;
    wikidata: string;
    is_in_region_code: string;
    is_in: string;
    name: string;
    ISO3166_2: string;
    name_ca: string;
    is_in_country: string;
    admin_level: string;
    ine_provincia: string;
    level: string;
    name_ar: string;
    type: string;
    name_fr: string;
}

interface Adminareas {
    admin6: Admin6;
    admin8: Admin8;
}

interface Osmtags {
    wikipedia: string;
    wikidata: string;
    source: string;
    population: string;
    idee_name: string;
    ine_municipio: string;
    is_in: string;
    is_in_region: string;
    name: string;
    is_in_country: string;
    is_in_province: string;
    admin_level: string;
    population_date: string;
    boundary: string;
    type: string;
}

interface Altgeocode {
    CASTROJ: string;
    UKHZY: string;
}

interface Altgeocode {
    CASTROJ: string;
    UKHZY: string;
}

export interface GeoData {
    statename: any[];
    distance: string;
    elevation: string;
    osmtags: Osmtags;
    state: string;
    latt: string;
    city: string;
    prov: string;
    geocode: string;
    geonumber: string;
    country: string;
    stnumber: string;
    staddress: string;
    alt: Alt;
    timezone: string;
    region: string;
    postal: string;
    longt: string;
    remaining_credits: string;
    confidence: string;
    inlongt: string;
    class: any[];
    adminareas: Adminareas;
    altgeocode: Altgeocode;
}


export type GeoApiResponse = BaseApiResponse<GeoData>
