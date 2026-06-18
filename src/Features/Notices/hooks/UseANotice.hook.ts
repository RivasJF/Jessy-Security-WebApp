import { useQuery } from "@tanstack/react-query";
import { fetchANotice, type Notice } from "../../../Api/Notices/notices.v1";
import type { ApiErrorResponse } from "../../../Shared/Types/Api/ApiErrorResponse.dto";
import type { AxiosError } from "axios";
import type { ApiResponse } from "../../../Shared/Types/Api/ApiResponse.dto";

export const useGetANotice = (idNotice: number) => {
    return useQuery<ApiResponse<Notice>, AxiosError<ApiErrorResponse>>({
        queryKey: ["notice", idNotice],
        queryFn: () => fetchANotice(idNotice),
        retry: false,
    });
};

export default useGetANotice;