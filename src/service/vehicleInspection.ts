import httpAxios from "../http/HttpAxios.ts";

export function getVehicleInspectionService<T>(): Promise<T> {
    return httpAxios.get<T, T>("/business/find/vehicleInspection").then((response: T) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    });
}

export function throughVehicleInspectionService<T>(carId: string): Promise<T> {
    return httpAxios.post<T, T>(`/business/through/vehicleInspection/${carId}`).then((response: T) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    });
}

export function dismissVehicleInspectionService<T>(carId: string): Promise<T> {
    return httpAxios.delete<T, T>(`/business/dismiss/vehicleInspection/${carId}`).then((response: T) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    });
}