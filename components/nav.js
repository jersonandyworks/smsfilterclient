import Link from "next/link";
export default function NavAdmin() {
  return (
    <nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
      <div className="container-fluid">
        <Link href="/" >
          <a className="navbar-brand"><span className="brand-text font-weight-light">SMS Filtering</span></a>
        </Link>

        <button
          className="navbar-toggler order-1"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse order-3" id="navbarCollapse">
          <ul className="navbar-nav">
          <li className="nav-item">
              <Link href="/uploads/file-upload" >
                <a className="nav-link">Upload Record</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/logout" >
                <a className="nav-link">Logout</a>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link href="#">
                <a className="nav-link">Contact</a>
              </Link>
            </li> */}
          </ul>

          {/* <form className="form-inline ml-0 ml-md-3">
            <div className="input-group input-group-sm">
              <input
                className="form-control form-control-navbar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-navbar" type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </form> */}
        </div>

        
      </div>
    </nav>
  );
}
