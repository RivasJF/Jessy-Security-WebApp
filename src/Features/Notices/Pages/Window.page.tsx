import "../styles/Windows.css";
import DeskNotice from "./PanelNotices.page";

export default function Window() {
  return (
    <div className="window-page">
      <header className="window-header">
        <nav className="window-nav">
          <div className="window-article">
            <a href="/window" className="window-link">X</a>
          </div>
        </nav>
      </header>
      <DeskNotice />
    </div>
  );
}
