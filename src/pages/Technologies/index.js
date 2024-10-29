import { Box, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/system";

const technologies = [
  {
    title: "MongoDB",
    description: "Classified as a NoSQL database product, MongoDB utilizes JSON-like documents with optional schemas.",
    image: "mongoDB.png",
    alt: "MongoDB",
  },
  {
    title: "Express JS",
    description: "Back end web application framework for building RESTful APIs with Node.js.",
    image: "expressjs.jpg",
    alt: "Express JS",
  },
  {
    title: "React JS",
    description: "Front-end JavaScript library for building user interfaces based on components.",
    image: "react.png",
    alt: "React JS",
  },
  {
    title: "Node JS",
    description: "JavaScript runtime environment and library for running web applications outside the client's browser.",
    image: "nodejs.jpg",
    alt: "Node JS",
  },
  {
    title: "Next JS",
    description: "A React framework that enables server-side rendering and static site generation, allowing for fast, SEO-friendly applications and websites.",
    image: "nextjs.jpeg",
    alt: "Next JS",
  },
  {
    title: "TailwindCss",
    description: "A utility-first CSS framework that provides low-level utility classes to build custom designs quickly without writing custom CSS.",
    image: "tailwind.png",
    alt: "TailwindCss",
  },
  {
    title: "Material UI",
    description: "Is a React library for building user interfaces with customizable components based on Material Design.",
    image: "material-ui.png",
    alt: "Material UI",
  },
  {
    title: "GitHub",
    description: "Is a platform for version control and collaboration, enabling developers to host, manage, and share code.",
    image: "github.jpg",
    alt: "GitHub",
  },
];

const TechBox = styled(Box)(({ theme }) => ({
  backgroundColor: grey[100],
  borderRadius: '8px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%', // Make sure the box takes full height
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const TechImage = styled('img')({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
});

const Technologies = () => {
  return (
    <Box p={4} bgcolor={grey[200]}>
      <Typography variant="h5" sx={{ pb: "16px", fontWeight: 'bold', textAlign: 'center' }}>
        {/* Technologies I Used */}
        Skills
      </Typography>
      <Grid container spacing={3}>
        {technologies.map((tech, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index} sx={{ display: 'flex' }}>
            <TechBox p={2}>
              <TechImage src={tech.image} alt={tech.alt} />
              <Box p={2} flexGrow={1}>
                <Typography gutterBottom variant="h6" component="div">
                  {tech.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {tech.description}
                </Typography>
              </Box>
            </TechBox>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Technologies;
