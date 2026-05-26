import  useGetAllNotice from "../hooks/UseAllNotice.hook";
import Note from "./Note";

export function ListNotices() {

  const { data: notices, isLoading, error, isSuccess } = useGetAllNotice();

  if (isLoading) {
    return (
      <div className="p-2">
        <div>Loading…</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-2">
        <div>Error loading notices</div>
      </div>
    );
  }

  if (notices?.length === 0) {
    return (
      <div className="p-2">
        <div>No notices available</div>
      </div>
    );
  }

  return (
    <>
      {isSuccess && (
        <div className="p-2">
          <div className="">
            {notices?.map((notice) => (
              <Note key={notice.id} {...notice} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
