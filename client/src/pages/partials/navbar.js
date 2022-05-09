import navLogo from '../../lib/images/assassination_navbar.png';

export default function Navbar(){
    return(
        <div className="columns">
            <div className="column">
                <nav className="navbar background-black has-text-centered" id="navigation">
                    <a href="/">
                        <img src={navLogo}
                             alt="Assassination: Between Two Kingdoms"
                             id="navigation-img"
                        />
                    </a>
                    <br/>
                        <h5 className="text-white mt-6">Welcome</h5>
                </nav>
            </div>
        </div>
    )
}