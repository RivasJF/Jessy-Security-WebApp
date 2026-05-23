import useGetANotice from "../hooks/UseANotice.hook";
import Note from "./Note";

export function ANotices() {
  const idNotice = 3;
  const {
    data: response,
    isLoading,
    error,
    isSuccess,
  } = useGetANotice(idNotice);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error?.response) {
    let errorMessage: string = "An error occurred while fetching the notice.";
    const errorSuccess: number = error.response?.status;
    if (errorSuccess === 404) {
      errorMessage = "Notice not found." ;
    }
    return (
      <>
        <div>{errorMessage}</div>
      </>
    );
  }

  if (isSuccess) {
    console.log("Notices:", response);
    return (
      <>
        <p>Notice:</p>
        <Note key={response?.data.id} {...response?.data} />
      </>
    );
  }

  return <>
  </>;
}
