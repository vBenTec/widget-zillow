import {ref} from 'vue'
import {BaseApiResponse} from "@/types/baseApiTypes";

export const useFetch = () => {
    const isFetching = ref(false)
    const error = ref<Error>()
    const data = ref<unknown>()

    const callApi = async <D>(cb: () => Promise<D>) => {
        try {
            isFetching.value = true
            const res: BaseApiResponse<D> = await cb()

            if (res?.status.toString().includes('20')) {
                data.value = res.data
            }
            return res as D
        } catch (e) {
            error.value = e
            console.error(e)
        } finally {
            isFetching.value = false
        }
    }

    return {
        callApi, isFetching, error, data
    }
}
