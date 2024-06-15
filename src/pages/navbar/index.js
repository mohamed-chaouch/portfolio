import React, { useState } from "react";
import { useMediaQuery, Drawer, IconButton, List, ListItem, ListItemText, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { grey } from "@mui/material/colors";
import AddProject from "../Projects/addProject";

function Navbar() {
    const xs = useMediaQuery('(max-width:600px)');
    const location = useLocation();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleNavigate = (hash) => {
        const element = document.getElementById(hash.substring(1)); // Remove the '#' from the hash

        if (element) {
            if (location.pathname !== '/') {
                window.location.href = '/' + hash; // Navigate to hash on the main page
            } else {
                const yOffset = -80; // Adjust this value to match the height of your navbar
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        } else {
            console.warn(`Element with ID '${hash}' not found.`);
        }
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const menuItems = [
        { text: 'Home', hash: '#home' },
        { text: 'About', hash: '#about' },
        { text: 'Technologies', hash: '#technologies' },
        { text: 'Projects', hash: '#projects' },
        { text: 'Contact', hash: '#contact' }
    ];

    const drawerList = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {menuItems.map((item, index) => (
                    <ListItem button key={index} onClick={() => handleNavigate(item.hash)}>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 1000,
                // padding: '10px 20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            className="bg-gray-400"
        >
            <div className="py-6 px-7 flex items-center">
                <div className="flex items-center flex-grow">
                    {xs && <img src="Med.png" alt="My Picture" style={{ width:"24px", height:"24px", borderRadius:"50%" }} />}
                    <h1>Mohamed Chaouech</h1>
                </div>
                {xs ? (
                    <>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                            {drawerList()}
                        </Drawer>
                    </>
                ) : (
                    <div sx={{ display:"flex", alignItems:"center" }}>
                        <a onClick={() => handleNavigate('#home')} className="pr-4 cursor-pointer">Home</a>
                        <a onClick={() => handleNavigate('#about')} className="pr-4 cursor-pointer">About</a>
                        <a onClick={() => handleNavigate('#technologies')} className="pr-4 cursor-pointer">Technologies</a>
                        <a onClick={() => handleNavigate('#projects')} className="pr-4 cursor-pointer">Projects</a>
                        <a onClick={() => handleNavigate('#contact')} className="px-4 py-2 bg-gray-700 text-white cursor-pointer">Contact</a>
                        {/* <Link to="create-project" path={<AddProject />}>Create-Project</Link> */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
