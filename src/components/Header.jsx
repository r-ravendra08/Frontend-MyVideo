
function Header() {
    return (

        <>
            <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark mb-3">
                <a className="navbar-brand mx-5" href="/Add">Add Video</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-autoS">
                        
                        <li className="nav-item active mx-5">
                            <a className="nav-link" href="">About Us</a>
                        </li>
                        <li className="nav-item active mx-5">
                            <a className="nav-link" href="">Contact Us</a>
                        </li>
                        <li className="nav-item active mx-5">
                            <a className="nav-link" href="">Login/Signup</a>
                        </li>
                    </ul>
                </div>
            </nav>

        </>
    )

}
export default Header;