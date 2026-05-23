import  useGetAllNotice from "../hooks/UseAllNotice.hook";
import Note from "./Note";
import "../styles/ListNotices.css";

export function ListNotices() {

  const { data: notices, isLoading, error, isSuccess } = useGetAllNotice();

  if (isLoading) {
    return (
      <div className="notices-page">
        <div className="notices-state notices-loading">Loading…</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="notices-page">
        <div className="notices-state notices-error">Error loading notices</div>
      </div>
    );
  }

  if (notices?.length === 0) {
    return (
      <div className="notices-page">
        <div className="notices-state notices-empty">No notices available</div>
      </div>
    );
  }

  return (
    <>
      {isSuccess && (
        <div className="notices-page">
          <div className="notices-list">
            {notices?.map((notice) => (
              <Note key={notice.id} {...notice} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
