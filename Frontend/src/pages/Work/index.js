import { Box, Typography, useMediaQuery } from "@mui/material";
import { grey } from "@mui/material/colors";
import Technologies from "../Technologies";
import Projects from "../Projects";
import Contact from "../Contact";
import { Link } from "react-router-dom";

function Work(){
    const md = useMediaQuery('(min-width:600px)');
    return(
        <Box>
            <Box sx={{height:{xs :"80vh", md: "90vh"}, mt: "73px", bgcolor:grey[300], display:"flex", alignItems:"center", justifyContent:"center"}}>
                <Box>
                    <Typography variant="h1" sx={{ fontSize:"54px", fontWeight:"500", width : "100%", textAlign: "center", mr: { md: "100px" } }}>I'm Mohamed Chaouech,<br />A Full Stack JS Web Developer</Typography>
                    <Box sx={{ width: "100%", textAlign: "center" }}>
                        <Link to="cv" className="link-style">My CV</Link>
                    </Box>
                </Box>                
                {
                    md &&
                    <img src="mohamed.jpg" alt="Mohamed Chaouech" style={{ width: "450px", height:"400px" }}/>
                }
            </Box>
            <Box id="technologies">
                <Technologies />
            </Box>
            <Box id="projects">
                <Projects />
            </Box>
            <Box id="contact">
                <Contact />
            </Box>
        </Box>

    )
}

export default Work;