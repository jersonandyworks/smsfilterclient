export default function Dropdown(props) {
  return (
    <div class="btn-group show">
      <button type="button" class="btn btn-default">
        {props.selectedRowValue !== ""
          ? props.selectedRowValue
          : "Row " + props.row}
      </button>
      <button
        onClick={() => props.setShowDropDownRow(!props.showDropDownRow)}
        type="button"
        class="btn btn-default dropdown-toggle dropdown-icon"
        data-toggle="dropdown"
        aria-expanded="false">
        <span class="sr-only">Toggle Dropdown</span>
      </button>
      <div
        class={props.showDropDownRow ? "dropdown-menu show" : "dropdown-menu"}
        role="menu"
        style={{
          position: "absolute",
          transform: "translate3d(0px, 38px, 0px)",
          top: "0px",
          left: "0px",
          willChange: "transform",
        }}>
        {props.fieldToRemove !== "firstname" ? (
          <a
            class="dropdown-item"
            onClick={() => {
              props.setSelectRowValue("firstname");
              props.setShowDropDownRow(!props.showDropDownRow);
            }}>
            First Name
          </a>
        ) : null}
        {props.fieldToRemove !== "intials" ? (
          <a
            class="dropdown-item"
            onClick={() => {
              props.setSelectRowValue("initials");
              props.setShowDropDownRow(!props.showDropDownRow);
            }}>
            Initials
          </a>
        ) : null}

        <div class="dropdown-divider"></div>
        {props.fieldToRemove !== "contact" ? (
          <a
            class="dropdown-item"
            onClick={() => {
              props.setSelectRowValue("contact");
              props.setShowDropDownRow(!props.showDropDownRow);
            }}>
            Contact
          </a>
        ) : null}

        <div class="dropdown-divider"></div>
        {props.fieldToRemove !== "link" ? (
          <a
            class="dropdown-item"
            onClick={() => {
              props.setSelectRowValue("link");
              props.setShowDropDownRow(!props.showDropDownRow);
            }}>
            Link
          </a>
        ) : null}
      </div>
    </div>
  );
}
