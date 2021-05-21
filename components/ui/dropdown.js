import _ from "lodash";

export default function Dropdown(props) {
  return (
    <div className="btn-group show">
      <button type="button" className="btn btn-default">
        {props.selectedRowValue !== ""
          ? props.selectedRowValue
          : "Column " + props.row}
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
        className={
          props.showDropDownRow ? "dropdown-menu show" : "dropdown-menu"
        }
        role="menu"
        style={{
          position: "absolute",
          transform: "translate3d(0px, 38px, 0px)",
          top: "0px",
          left: "0px",
          willChange: "transform",
        }}>
        {!_.includes(props.fieldToRemove, "firstname") ? (
          <a
            className="dropdown-item"
            onClick={() => {
              props.setSelectRowValue("firstname");
              props.handlePushFieldToRemove("firstname");
              props.setShowDropDownRow(!props.showDropDownRow);
              props.setCustomFieldValue(props.index,"firstname");
            }}>
            First Name
          </a>
        ) : null}
        {!_.includes(props.fieldToRemove, "lastname") ? (
          <a
            className="dropdown-item"
            onClick={() => {
              props.setSelectRowValue("lastname");
              props.handlePushFieldToRemove("lastname");
              props.setShowDropDownRow(!props.showDropDownRow);
              props.setCustomFieldValue(props.index,"lastname");
            }}>
            Last Name
          </a>
        ) : null}
        {!_.includes(props.fieldToRemove, "initials") ? (
          <>
            <div className="dropdown-divider"></div>
            <a
              className="dropdown-item"
              onClick={() => {
                props.setSelectRowValue("initials");
                props.handlePushFieldToRemove("initials");
                props.setShowDropDownRow(!props.showDropDownRow);
                props.setCustomFieldValue(props.index,"initials");
              }}>
              Initials
            </a>
          </>
        ) : null}

        {!_.includes(props.fieldToRemove, "contact") ? (
          <>
            <div className="dropdown-divider"></div>
            <a
              className="dropdown-item"
              onClick={() => {
                props.setSelectRowValue("contact");
                props.handlePushFieldToRemove("contact");
                props.setShowDropDownRow(!props.showDropDownRow);
                props.setCustomFieldValue(props.index,"contact");

              }}>
              Contact
            </a>
          </>
        ) : null}

        {!_.includes(props.fieldToRemove, "link") ? (
          <>
            <div className="dropdown-divider"></div>
            <a
              className="dropdown-item"
              onClick={() => {
                props.setSelectRowValue("link");
                props.handlePushFieldToRemove("link");
                props.setShowDropDownRow(!props.showDropDownRow);
                props.setCustomFieldValue(props.index,"link");

              }}>
              Link
            </a>
          </>
        ) : null}

        {!_.includes(props.fieldToRemove, "custom") ? (
          <>
            <div className="dropdown-divider"></div>
            <a
              className="dropdown-item"
              onClick={() => {
                props.setSelectRowValue("custom");
                props.setShowDropDownRow(!props.showDropDownRow);
              }}>
              Custom
            </a>
          </>
        ) : null}
      </div>
    </div>
  );
}
