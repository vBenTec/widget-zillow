import {ref} from 'vue'

export const useFetch = <D>() => {
    const isFetching = ref(false)
    const error = ref<Error>()
    const data = ref<D>()

    const callApi = (async (cb: () => Promise<D>) => {
        try {
            const res = await cb()
            console.log(res)
        } catch (e) {
            error.value = e
            console.error(e)
        }
    })

    return {
        callApi, isFetching, error, data
    }
}
