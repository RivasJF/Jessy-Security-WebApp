import { useQuery } from "@tanstack/react-query";
import { fetchNotices, type Notice } from "../../../Api/Notices/notices.v1";

export const useGetAllNotice = () => {
    return useQuery<Notice[]>({
        queryKey: ["notices"],
        queryFn: fetchNotices,
        retry: false,
    });
}; 

export default useGetAllNotice;