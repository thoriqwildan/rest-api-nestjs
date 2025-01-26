export class WebResponse<T> {
    data?: T
    errors?: T
    paging?: Paging
}

export class Paging {
    size: number
    total_page: number
    current_page: number
}