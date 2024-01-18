import {ref} from 'vue'
import {BaseApiResponse} from "@/types/baseApiTypes";

export const useFetch =  () => {
    const isFetching = ref(false)
    const error = ref<Error>()
    const data = ref<unknown>()

    const callApi = async <D>(cb: () => Promise<D>) => {
        try {
            const res: BaseApiResponse<D> = await cb()

            if (res?.status.toString().includes('20')) {
                data.value = res.data
            }
            console.log(res)
            return res as D
        } catch (e) {
            error.value = e
            console.error(e)
        }
    }

    return {
        callApi, isFetching, error, data
    }
}
