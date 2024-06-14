import { Box, Typography, useMediaQuery } from "@mui/material";
import { grey } from "@mui/material/colors";
import Technologies from "../Technologies";
import Projects from "../Projects";
import Contact from "../Contact";

function Work(){
    const md = useMediaQuery('(min-width:600px)');
    return(
        <Box id="home">
            <Box id="about" sx={{height:{xs :"80vh", md: "90vh"}, bgcolor:grey[300], display:"flex", alignItems:"center", justifyContent:"center"}}>
                <Typography variant="h1" sx={{ fontSize:"54px", fontWeight:"500", mx:{xs: "16px"}, mr: {lg :"50px"} }}>I'm Mohamed Chaouech,<br /> Full Stack JS Developper</Typography>
                {
                    md &&
                    <img src="mohamed.jpg" alt="My Picture" style={{ width: "350px", height:"400px" }}/>
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