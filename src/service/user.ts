import httpAxios from "../http/HttpAxios.ts";
import type {IUser} from "../typings/user/IUser.ts";

export function getUserService<T>(): Promise<T> {
    return httpAxios.get<T, T>("/role/get/all/user").then((response: T) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    });
}

export function updateUserService<T>(user: IUser): Promise<T> {
    return httpAxios.post<T, T>("/role/update/user", user).then((response: T) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    });
}

export function deleteUserService<T>(userId: string): Promise<T> {
    return httpAxios.delete<T, T>("/role/delete/user/" + userId).then((response: T) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    });
}