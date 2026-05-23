import { ListNotices } from "../Components/ListNotices";
import "../styles/PanelNotices.css";


export default function DeskNotice() {
  return (
    <div className="panel-notices">
      <div className="panel-header">
        <button className="add-button">Add</button>
        <h1 className="panel-title">Desk Notice</h1>
      </div>
      <div className="notice-list">
        <ListNotices />
      </div>
      <div className="panel-footer">Tash</div>
    </div>
  );
}
