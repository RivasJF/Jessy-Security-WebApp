import FormNotice from "../Components/FormNotice";
import DeskNotice from "./PanelNotices.page";

export default function Window() {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <header className="w-full">
        <nav className="flex w-full">
          <a href="/window" className="text-gray-600 hover:text-gray-800 text-lg font-medium">
            X
          </a>
        </nav>
      </header>

      <div className="flex-1 w-full">
        {/* <DeskNotice /> */}
        <FormNotice />
      </div>
    </div>
  );
}
