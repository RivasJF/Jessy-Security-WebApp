import { ListNotices } from "../Components/ListNotices";


export default function DeskNotice() {
  return (
    <div className="h-full w-full rounded-none shadow-none bg-gray-100">
      <div className="flex items-center justify-between p-2">
        <h1 className="text-lg shadow-2xl text-gray-800">Desk Notice</h1>
        <button className="bg-blue-500 text-white p-1.5 rounded-md hover:bg-blue-600 cursor-pointer">Add</button>
      </div>
      <div className="h-full w-full">
        <ListNotices />
      </div>
      <div className="text-xs text-gray-500 justify-end">
        <p>Tash</p>
      </div>
    </div>
  );
}
