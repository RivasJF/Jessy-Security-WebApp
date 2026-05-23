import  useGetAllNotice from "../hooks/UseAllNotice.hook";
import Note from "./Note";
import "../styles/ListNotices.css";

export function ListNotices() {

  const { data: notices, isLoading, error, isSuccess } = useGetAllNotice();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error loading notices</div>;
  }

  if (isSuccess) {
    console.log("Notices:", notices);
  }

  return (
    <>
      {isSuccess && (
        <div className="notices-page">
          <h1>Notices</h1>
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
