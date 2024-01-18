interface Config {
    adapter: []
    env: string
    headers: {}
}

export interface BaseApiResponse<D> {
    config: Config
    data: D
    headers: {}
    status: number
    statusText: string
}
