import { Link, useLocation } from "react-router-dom";

function Navbar(){
    const location = useLocation();

    const handleNavigate = (hash) => {
        const element = document.getElementById(hash.substring(1)); // Remove the '#' from the hash
    
        if (element) {
            if (location.pathname !== '/') {
                window.location.href = '/' + hash; // Navigate to hash on the main page
            } else {
                element.scrollIntoView({ behavior: 'smooth' }); // Scroll to element
            }
        } else {
            console.warn(`Element with ID '${hash}' not found.`);
        }
    };
    return(
        <div className="py-4 px-7 flex items-center bg-gray-400">
            <div className="flex items-center flex-grow">
                <h1>Mohamed Chaouech</h1>
            </div>
            {/* <Link to="/" className="pr-4">Home</Link>
            <Link to="/" className="pr-4">About</Link>
            <Link to="/" className="pr-4">Technologies</Link>
            <Link to="/" className="pr-4">Projects</Link>
            <Link to="/" className="pr-4">Technologies</Link>
            <Link to="/create-project" className="pr-4">Create Project</Link>
            <Link to="/" className="px-4 py-2 bg-gray-700 text-white">Contact</Link> */}
            <a onClick={() => handleNavigate('#home')} className="pr-4 cursor-pointer">Home</a>
            <a onClick={() => handleNavigate('#about')} className="pr-4 cursor-pointer">About</a>
            <a onClick={() => handleNavigate('#technologies')} className="pr-4 cursor-pointer">Technologies</a>
            <a onClick={() => handleNavigate('#projects')} className="pr-4 cursor-pointer">Projects</a>
            {/* <Link to="/create-project" className="pr-4">Create Project</Link> */}
            <a onClick={() => handleNavigate('#contact')} className="px-4 py-2 bg-gray-700 text-white cursor-pointer">Contact</a>
        </div>
    )
}

export default Navbar;