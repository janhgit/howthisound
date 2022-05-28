import Router from "next/router";

const Navbar = ({ url }) => {

    const home = () => {
        Router.push("/")
    }
    const padding = 0.4;
    const widhtInt = 65;
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <i className="fab fa-github fa-2x mx-3 ps-1"></i>
            </a>
            <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
              data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <form className="me-3">
                <div className="form-white input-group" style={{width: 250 + "px"}}>
                  <input type="search" className="form-control rounded" placeholder="Search or jump to... ( / )"
                    aria-label="Search" aria-describedby="search-addon" />
                </div>
              </form>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/currentalbum">Current Album</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Friends</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    )
}

export default Navbar;

// <div classNameNameName="main">
//             <nav classNameNameName="navbar navbar-expand-lg navbar-dark bg-dark">
//                 <a classNameName="navbar-brand" href="#">
//                     <img src={url} width="30" height="30" alt="" />
//                     ThisSoundGood?
//                 </a>
//                 <button classNameNameName="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span classNameNameName="navbar-toggler-icon"></span>
//                 </button>

//                 <div classNameNameName="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul classNameNameName="navbar-nav mr-auto">
//                         <li classNameNameName="nav-item active">
//                             <a classNameNameName="nav-link" onClick={() => home()}>Home</a>
//                         </li>
//                         <li classNameNameName="nav-item">
//                             <a classNameNameName="nav-link" href="#">Link</a>
//                         </li>
//                         <li classNameNameName="nav-item dropdown">
//                             <a classNameNameName="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                 Dropdown
//                             </a>

//                         </li>
//                     </ul>

//                 </div>
//                 <form classNameName="form-inline">
//                     <input classNameName="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
//                     <button classNameName="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
//                 </form>
//             </nav>
//         </div>



// <nav classNameName="navbar navbar-expand-lg navbar-light bg-light">

// <div classNameName="container-fluid">

//     <button
//         classNameName="navbar-toggler"
//         type="button"
//         data-mdb-toggle="collapse"
//         data-mdb-target="#navbarSupportedContent"
//         aria-controls="navbarSupportedContent"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//     >
//         <i classNameName="fas fa-bars"></i>
//     </button>


//     <div classNameName="collapse navbar-collapse" id="navbarSupportedContent">

//         <a classNameName="navbar-brand mt-2 mt-lg-0" href="#">
//             <img
//                 src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
//                 height="15"
//                 alt="MDB Logo"
//                 loading="lazy"
//             />
//         </a>

//         <ul classNameName="navbar-nav me-auto mb-2 mb-lg-0">
//             <li classNameName="nav-item">
//                 <a classNameName="nav-link" href="#">Dashboard</a>
//             </li>
//             <li classNameName="nav-item">
//                 <a classNameName="nav-link" href="#">Team</a>
//             </li>
//             <li classNameName="nav-item">
//                 <a classNameName="nav-link" href="#">Projects</a>
//             </li>
//         </ul>

//     </div>



//     <div classNameName="d-flex align-items-center">

//         <a classNameName="text-reset me-3" href="#">
//             <i classNameName="fas fa-shopping-cart"></i>
//         </a>


//         <div classNameName="dropdown">
//             <a
//                 classNameName="text-reset me-3 dropdown-toggle hidden-arrow"
//                 href="#"
//                 id="navbarDropdownMenuLink"
//                 role="button"
//                 data-mdb-toggle="dropdown"
//                 aria-expanded="false"
//             >
//                 <i classNameName="fas fa-bell"></i>
//                 <span classNameName="badge rounded-pill badge-notification bg-danger">1</span>
//             </a>
//             <ul
//                 classNameName="dropdown-menu dropdown-menu-end"
//                 aria-labelledby="navbarDropdownMenuLink"
//             >
//                 <li>
//                     <a classNameName="dropdown-item" href="#">Some news</a>
//                 </li>
//                 <li>
//                     <a classNameName="dropdown-item" href="#">Another news</a>
//                 </li>
//                 <li>
//                     <a classNameName="dropdown-item" href="#">Something else here</a>
//                 </li>
//             </ul>
//         </div>

//         <div classNameName="dropdown">
//             <a
//                 classNameName="dropdown-toggle d-flex align-items-center hidden-arrow"
//                 href="#"
//                 id="navbarDropdownMenuAvatar"
//                 role="button"
//                 data-mdb-toggle="dropdown"
//                 aria-expanded="false"
//             >
//                 <img
//                     src={url}
//                     classNameName="rounded-circle"
//                     height="25"
//                     alt="Black and White Portrait of a Man"
//                     loading="lazy"
//                 />
//             </a>
//             <ul
//                 classNameName="dropdown-menu dropdown-menu-end"
//                 aria-labelledby="navbarDropdownMenuAvatar"
//             >
//                 <li>
//                     <a classNameName="dropdown-item" href="#">My profile</a>
//                 </li>
//                 <li>
//                     <a classNameName="dropdown-item" href="#">Settings</a>
//                 </li>
//                 <li>
//                     <a classNameName="dropdown-item" href="#">Logout</a>
//                 </li>
//             </ul>
//         </div>
//     </div>

// </div>

// </nav>