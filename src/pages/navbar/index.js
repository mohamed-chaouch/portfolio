import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div className="py-4 px-7 flex items-center bg-gray-400 mb-8">
            <div className="flex items-center flex-grow">
                <img src="Med.png" alt="My Picture" className="rounded w-12 h-12" />
                <h1>Mohamed Chaouech</h1>
            </div>
            <Link to="/" className="pr-4">Work</Link>
            <Link to="about" className="pr-4">About</Link>
            <Link to="contact" className="px-4 py-2 bg-gray-700 text-white">Contact</Link>
        </div>
    )
}

export default Navbar;