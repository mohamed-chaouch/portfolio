import React, { useState } from "react";
import {
  useMediaQuery,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const xs = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavigate = (hash) => {
    const element = document.getElementById(hash.substring(1)); // Remove the '#' from the hash

    if (element && location.pathname === "/") {
        // Navigate to the target section directly
        navigate(`/${hash}`);
        const yOffset = -80; // Adjust this value to match the height of your navbar
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
    }else if(!element){
        navigate(`/${hash}`);
    } else {
      console.warn(`Element with ID '${hash}' not found.`);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "about", hash: "#about" },
    { text: "technologies", hash: "#technologies" },
    { text: "projects", hash: "#projects" },
    { text: "contact", hash: "#contact" },
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
          <ListItem
            button
            key={index}
            onClick={() => handleNavigate(item.hash)}
          >
            <ListItemText primary={item.text} id={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        // padding: '10px 20px',
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      className="bg-gray-400"
    >
      <div className="py-6 px-7 flex items-center">
        <div className="flex items-center flex-grow">
          {xs && (
            <img
              src="Med.png"
              alt="Profile of Mohamed Chaouech"
              style={{ width: "24px", height: "24px", borderRadius: "50%" }}
            />
          )}
          <h1>Mohamed Chaouech</h1>
        </div>
        {xs ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawerList()}
            </Drawer>
          </>
        ) : (
          <>
            <a
              href="#about"
              onClick={() => handleNavigate("#about")}
              className="pr-4 cursor-pointer"
            >
              About
            </a>
            <a
              href="#technologies"
              onClick={() => handleNavigate("#technologies")}
              className="pr-4 cursor-pointer"
            >
              Skills
            </a>
            <a
              href="#projects"
              onClick={() => handleNavigate("#projects")}
              className="pr-4 cursor-pointer"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={() => handleNavigate("#contact")}
              className="px-4 py-2 bg-gray-700 text-white cursor-pointer"
            >
              Contact
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
