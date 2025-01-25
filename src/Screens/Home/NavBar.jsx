function NavBar({ }) {
    return (<nav className="navbar flex items-center justify-between p-6 text-white">
        <div className="flex items-center space-x-3">
            <GiMagicLamp className="text-yellow-400 text-4xl" />  {
                /* Lamp Icon with proper size */
            }
            <h1 className="navbar-title text-4xl font-semibold">OCRGenie</h1>  {
                /* Title with larger font size */
            }
        </div>
        <div className="flex space-x-6">
            <a href="#home" className="nav-link text-lg font-medium hover:text-violet-500 px-4 py-2">Home</a>
            <a href="#tutorials" className="nav-link text-lg font-medium hover:text-violet-500 px-4 py-2">Tutorials</a>
            <a href="#contact" className="nav-link text-lg font-medium hover:text-violet-500 px-4 py-2">Contact</a>
        </div>
    </nav>);
}

export default NavBar;