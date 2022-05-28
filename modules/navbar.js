import Router from "next/router";

const Navbar = ({ url }) => {

    const home = () => {
        Router.push("/")
    }
    const padding = 0.4;
    const widhtInt = 65;
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              <i class="fab fa-github fa-2x mx-3 ps-1"></i>
            </a>
            <button class="navbar-toggler" type="button" data-mdb-toggle="collapse"
              data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
              <i class="fas fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <form class="me-3">
                <div class="form-white input-group" style={{width: 250 + "px"}}>
                  <input type="search" class="form-control rounded" placeholder="Search or jump to... ( / )"
                    aria-label="Search" aria-describedby="search-addon" />
                </div>
              </form>
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/currentalbum">Current Album</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Friends</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    )
}

export default Navbar;

// <div classNameName="main">
//             <nav classNameName="navbar navbar-expand-lg navbar-dark bg-dark">
//                 <a className="navbar-brand" href="#">
//                     <img src={url} width="30" height="30" alt="" />
//                     ThisSoundGood?
//                 </a>
//                 <button classNameName="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                     <span classNameName="navbar-toggler-icon"></span>
//                 </button>

//                 <div classNameName="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul classNameName="navbar-nav mr-auto">
//                         <li classNameName="nav-item active">
//                             <a classNameName="nav-link" onClick={() => home()}>Home</a>
//                         </li>
//                         <li classNameName="nav-item">
//                             <a classNameName="nav-link" href="#">Link</a>
//                         </li>
//                         <li classNameName="nav-item dropdown">
//                             <a classNameName="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                 Dropdown
//                             </a>

//                         </li>
//                     </ul>

//                 </div>
//                 <form className="form-inline">
//                     <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
//                     <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
//                 </form>
//             </nav>
//         </div>



// <nav className="navbar navbar-expand-lg navbar-light bg-light">

// <div className="container-fluid">

//     <button
//         className="navbar-toggler"
//         type="button"
//         data-mdb-toggle="collapse"
//         data-mdb-target="#navbarSupportedContent"
//         aria-controls="navbarSupportedContent"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//     >
//         <i className="fas fa-bars"></i>
//     </button>


//     <div className="collapse navbar-collapse" id="navbarSupportedContent">

//         <a className="navbar-brand mt-2 mt-lg-0" href="#">
//             <img
//                 src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
//                 height="15"
//                 alt="MDB Logo"
//                 loading="lazy"
//             />
//         </a>

//         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//                 <a className="nav-link" href="#">Dashboard</a>
//             </li>
//             <li className="nav-item">
//                 <a className="nav-link" href="#">Team</a>
//             </li>
//             <li className="nav-item">
//                 <a className="nav-link" href="#">Projects</a>
//             </li>
//         </ul>

//     </div>



//     <div className="d-flex align-items-center">

//         <a className="text-reset me-3" href="#">
//             <i className="fas fa-shopping-cart"></i>
//         </a>


//         <div className="dropdown">
//             <a
//                 className="text-reset me-3 dropdown-toggle hidden-arrow"
//                 href="#"
//                 id="navbarDropdownMenuLink"
//                 role="button"
//                 data-mdb-toggle="dropdown"
//                 aria-expanded="false"
//             >
//                 <i className="fas fa-bell"></i>
//                 <span className="badge rounded-pill badge-notification bg-danger">1</span>
//             </a>
//             <ul
//                 className="dropdown-menu dropdown-menu-end"
//                 aria-labelledby="navbarDropdownMenuLink"
//             >
//                 <li>
//                     <a className="dropdown-item" href="#">Some news</a>
//                 </li>
//                 <li>
//                     <a className="dropdown-item" href="#">Another news</a>
//                 </li>
//                 <li>
//                     <a className="dropdown-item" href="#">Something else here</a>
//                 </li>
//             </ul>
//         </div>

//         <div className="dropdown">
//             <a
//                 className="dropdown-toggle d-flex align-items-center hidden-arrow"
//                 href="#"
//                 id="navbarDropdownMenuAvatar"
//                 role="button"
//                 data-mdb-toggle="dropdown"
//                 aria-expanded="false"
//             >
//                 <img
//                     src={url}
//                     className="rounded-circle"
//                     height="25"
//                     alt="Black and White Portrait of a Man"
//                     loading="lazy"
//                 />
//             </a>
//             <ul
//                 className="dropdown-menu dropdown-menu-end"
//                 aria-labelledby="navbarDropdownMenuAvatar"
//             >
//                 <li>
//                     <a className="dropdown-item" href="#">My profile</a>
//                 </li>
//                 <li>
//                     <a className="dropdown-item" href="#">Settings</a>
//                 </li>
//                 <li>
//                     <a className="dropdown-item" href="#">Logout</a>
//                 </li>
//             </ul>
//         </div>
//     </div>

// </div>

// </nav>