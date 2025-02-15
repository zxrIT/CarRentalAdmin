import httpAxios from "../http/HttpAxios.ts";

export function getCarProductService<T>(): Promise<T> {
    return httpAxios.get<T, T>("/business/car").then((response: T) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    });
}

export function getDetailsService<T>(): Promise<T> {
    return httpAxios.get<T, T>("/business/find/all/details").then((response: T) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    });
}

export function incrementCarProductService<T, R>(updateData: R): Promise<T> {
    return httpAxios.post<T, T, R>("/business/increment/car/detail", updateData).then((response: T) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    });
}

export function updateCarProductService<T, R>(updateData: R): Promise<T> {
    return httpAxios.post<T, T, R>("/business/update/car", updateData).then((response: T) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    });
}

export function updateCarDetailService<T, R>(updateData: R): Promise<T> {
    return httpAxios.post<T, T, R>("/business/update/car/detail", updateData).then((response: T) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    });
}

export function deleteCarProductService<T>(id: string): Promise<T> {
    return httpAxios.delete<T, T>("/business/delete/car/" + id).then((response: T) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    });
}