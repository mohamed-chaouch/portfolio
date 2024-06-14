import { Box, Card, CardContent, CardMedia, Grid, Typography, Button } from "@mui/material";
import  styled  from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import { ArrowForward } from "@mui/icons-material";

const GradientCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    maxWidth: 345,
    margin: 'auto',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    },
    '&:hover .card-overlay': {
        opacity: 1,
    }
}));

const CardOverlay = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9))',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
}));

const OverlayButton = styled(Button)(({ theme }) => ({
    marginTop: '15px',
    color: 'white',
    borderColor: 'white',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    }
}));

const StyledCardMedia = styled(CardMedia)({
    height: 250,
});

function Projects() {
    const [projects, setProjects] = useState([]);

    const handleProjects = () => {
        axios.get("get-projects")
            .then((res) => {
                setProjects(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        handleProjects();
    }, []);

    return (
        <Box bgcolor="#f7f7f7" p="32px">
            <Typography variant="h5" sx={{ pb: "16px", fontWeight: 'bold', textAlign: 'center' }}>Projects</Typography>
            <Grid container spacing={4}>
                {projects.map((project) => (
                    <Grid item xs={12} md={6} lg={4} key={project._id}>
                        <GradientCard>
                            <StyledCardMedia
                                component="img"
                                image={`${process.env.REACT_APP_BASE_URL}${project.image}`}
                                alt={project.title}
                            />
                            <CardOverlay className="card-overlay">
                                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                    {project.title}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 2 }}>
                                    {project.description}
                                </Typography>
                                <OverlayButton
                                    variant="outlined"
                                    component={Link}
                                    to={`/project/${project._id}`}
                                    size="small"
                                    endIcon={<ArrowForward />}
                                >
                                    View Details
                                </OverlayButton>
                            </CardOverlay>
                            <CardContent sx={{ display: 'none' }}>
                                <Typography variant="body2" color="text.secondary">
                                    {project.description}
                                </Typography>
                            </CardContent>
                        </GradientCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Projects;
