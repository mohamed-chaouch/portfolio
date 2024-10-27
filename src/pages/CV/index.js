import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

function Cv(){
    return(
        <Box sx={{ bgcolor:grey[100], mt:"70px"}}>
            <Typography sx={{ width: "100%", textAlign: "center", fontSize : "48px", fontWeight:"600", pt:"16px" }}>CV</Typography>
            <Box sx={{ display: "flex", justifyContent: "center", m: 'auto', py:"30px" }}>
                <img src="med cv.jpg" alt="CV professionnel" width="50%" />
            </Box>
        </Box>
    )
}

export default Cv;