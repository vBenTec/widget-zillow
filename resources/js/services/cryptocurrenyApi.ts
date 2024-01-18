import {CRYPTOCURRENCY_API_URL} from "@/services/endpoints"
import axios from "axios"

export default {
    getCurrencies() {
        return axios.get(CRYPTOCURRENCY_API_URL, {
            headers: {
                'accept': 'application/json',
            },
        })
    }
}
