import httpAxios from "../http/HttpAxios.ts";

export function getOrderService<T>(): Promise<T> {
    return httpAxios.get<T, T>("/business/find/all/order").then((response: T) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    });
}
