import { Box, Card, CardContent, CardMedia, Grid, Typography, Container, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "../../../utils/axios";

const ProjectDetailContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f0f2f5',
  minHeight: '100vh',
  padding: "1px",
}));

const ProjectCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '15px',
  boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
  marginBottom: "1px",
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

const CardImage = styled(CardMedia)({
  objectFit: 'cover',
  width: '100%',
  height: '100%', // Ensure image takes full height of its container
  borderRadius: '15px 15px 0 0',
});

const DetailImage = styled(CardMedia)({
  objectFit: 'cover',
  width: '100%',
  height: '100%', // Ensure image takes full height of its container
  borderTopLeftRadius: '15px',
  borderTopRightRadius: '15px',
});

const ProjectTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: "1px",
}));

const ProjectDescription = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: "1px",
  color: "grey",
}));

const DetailTitle = styled(Typography)({
  fontWeight: 'bold',
});

const DetailDescription = styled(Typography)(({ theme }) => ({
  color: "grey",
}));

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/get-project/${id}`)
      .then((res) => {
        setProject(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  if (error) return <Typography align="center" color="error">Error: {error}</Typography>;
  if (!project) return <Typography align="center">No project data available</Typography>;

  return (
    <ProjectDetailContainer sx={{ mt:"73px" }}>
      <Container maxWidth="lg" sx={{ my: "32px" }}>
        <Box sx={{ width: { xs: '100%', md: '60%' }, margin: '0 auto', mb: "16px" }}>
          <ProjectCard>
            <Box sx={{ position: 'relative', height: 0, paddingBottom: '56.25%' }}>
              <CardImage
                component="img"
                image={`${process.env.REACT_APP_BASE_URL}${project.image}`}
                alt={project.title}
                sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </Box>
            <CardContent>
              <ProjectTitle variant="h4">{project.title}</ProjectTitle>
              <ProjectDescription variant="body1">{project.description}</ProjectDescription>
            </CardContent>
          </ProjectCard>
        </Box>
        <hr style={{ border: "1px solid grey" }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', my: 4 }}>
          Project Details
        </Typography>
        <Grid container spacing={3}>
          {project.details.map((detail, index) => (
            <Grid item xs={12} md={6} key={detail._id}>
              <ProjectCard>
                <Box sx={{ position: 'relative', height: 0, paddingBottom: '56.25%' }}>
                  <DetailImage
                    component="img"
                    image={`${process.env.REACT_APP_BASE_URL}${detail.image}`}
                    alt={`Detail ${index + 1}`}
                    sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  />
                </Box>
                <CardContent>
                  <DetailTitle gutterBottom variant="h6">Detail {index + 1}</DetailTitle>
                  <DetailDescription variant="body2">{detail.description}</DetailDescription>
                </CardContent>
              </ProjectCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ProjectDetailContainer>
  );
};

export default ProjectDetail;
