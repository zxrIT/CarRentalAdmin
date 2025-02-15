import httpAxios from "../http/HttpAxios.ts";

export function loginAdminService<T>(data): Promise<T> {
    return httpAxios.post<T, T>("/role/login/admin", data).then((response: T) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    });
}