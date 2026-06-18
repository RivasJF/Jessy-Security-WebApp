export type ApiResponse<T> = {
    success: boolean;
    data: T;
    message?: string;
    error: Object | null;
};