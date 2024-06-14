import { Box, Typography, useMediaQuery } from "@mui/material";
import { grey } from "@mui/material/colors";
import Technologies from "../Technologies";
import Projects from "../Projects";

function Work(){
    const md = useMediaQuery('(min-width:600px)');
    return(
        <Box>
            <Box sx={{height:{xs :"80vh", md: "90vh"}, bgcolor:grey[300], display:"flex", alignItems:"center", justifyContent:"center"}}>
                <Typography variant="h1" sx={{ fontSize:"54px", fontWeight:"500", mx:{xs: "16px"}, mr: {lg :"50px"} }}>I'm Mohamed Chaouech,<br /> Full Stack JS Developper</Typography>
                {
                    md &&
                    <img src="mohamed.jpg" alt="My Picture" style={{ width: "350px", height:"400px" }}/>
                }
            </Box>
            <Technologies />
            <Projects />
        </Box>

    )
}

export default Work;