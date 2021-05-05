import _ from "lodash";

export default function Dropdown(props) {
  console.log("field to remove: ", props.fieldToRemove)
  return (
    <div className="btn-group show">
      <button type="button" className="btn btn-default">
        {props.selectedRowValue !== ""
          ? props.selectedRowValue
          : "Row " + props.row}
      </button>
      <button
        onClick={() => props.setShowDropDownRow(!props.showDropDownRow)}
        type="button"
        className="btn btn-default dropdown-toggle dropdown-icon"
        data-toggle="dropdown"
        aria-expanded="false">
        <span className="sr-only">Toggle Dropdown</span>
      </button>
      <div
        className={props.showDropDownRow ? "dropdown-menu show" : "dropdown-menu"}
        role="menu"
        style={{
          position: "absolute",
          transform: "translate3d(0px, 38px, 0px)",
          top: "0px",
          left: "0px",
          willChange: "transform",
        }}>
        {!_.includes(props.fieldToRemove,"firstname") ? (
          <a
            className="dropdown-item"
            onClick={() => {
              props.setSelectRowValue("firstname");
              props.handlePushFieldToRemove("firstname");
              props.setShowDropDownRow(!props.showDropDownRow);
            }}>
            First Name
          </a>
        ) : null}
        {!_.includes(props.fieldToRemove,"initials") ? (
          <a
            className="dropdown-item"
            onClick={() => {
              props.setSelectRowValue("initials");
              props.handlePushFieldToRemove("initials");
              props.setShowDropDownRow(!props.showDropDownRow);
            }}>
            Initials
          </a>
        ) : null}

        <div className="dropdown-divider"></div>
        {!_.includes(props.fieldToRemove,"contact") ? (
          <a
            className="dropdown-item"
            onClick={() => {
              props.setSelectRowValue("contact");
              props.handlePushFieldToRemove("contact");
              props.setShowDropDownRow(!props.showDropDownRow);
            }}>
            Contact
          </a>
        ) : null}

        <div className="dropdown-divider"></div>
        {!_.includes(props.fieldToRemove,"link") ? (
          <a
            className="dropdown-item"
            onClick={() => {
              props.setSelectRowValue("link");
              props.handlePushFieldToRemove("link");
              props.setShowDropDownRow(!props.showDropDownRow);
            }}>
            Link
          </a>
        ) : null}
      </div>
    </div>
  );
}
