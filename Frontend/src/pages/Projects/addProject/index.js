import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { useState } from "react";
import Swal from "sweetalert2";
import {  useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";


const schema = yup.object().shape({
    title: yup.string().required("Title is required").min(2, "Title should be at least 2 characters"),
    image: yup.string().required("Image is required"),
    description: yup.string().required("Description is required").min(10, "Description should be at least 10 characters"),
});

function AddProject(){
    const { control, handleSubmit, formState: { errors, isValid }, reset, watch } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',  // To enable real-time validation
    });

    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [details, setDetails] = useState([{ description: "", image: null}]); // Initial details array with an empty object


    const onSubmit = (data) => {
        console.log("Form submitted successfully:", data);
    };

    const addDetail = () => {
        setDetails([...details, { description: "", image: null}]);
    };

    // console.log(details, " : details")

    // const removeDetail = (index) => {
    //     const newDetails = [...details];
    //     newDetails.splice(index, 1);
    //     setDetails(newDetails);
    // };

    const removeDetail = (indexToRemove) => {
        setDetails(prevDetails => {
            return prevDetails.filter((_, index) => index !== indexToRemove);
        });
    };

    const createProject = () =>{
        if(title?.length >= 2 && image !== null && description?.length >=10){

            let fd = new FormData();
            fd.append('title', title);
            fd.append("description", description);
            if(image){
                fd.append("image", image);
            }
            // // Map details to an array of objects with filenames
            if(details && details.length > 1){
                const detailsWithFilenames = details.map((detail, index) => {
                    fd.append(`details[${index}].description`, detail.description);
                    if (detail.image) {
                        fd.append(`detailsImages`, detail.image); // Append the file directly
                    }
                    return {
                        description: detail.description,
                        image: detail.image,
                    };
                });
                // Stringify the modified details array and append it to FormData
                fd.append('details', JSON.stringify(detailsWithFilenames));
            }

            console.log(fd, " : fd");
            axios.post('create-project', fd).then((response)=>{
                Swal.fire({
                    title: "Success",
                    text: "Project added successfully",
                    icon: "success",
                    confirmButtonColor: "green",
                    })
                navigate('/');
            }).catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: error.response.data.message,
                    icon: "error",
                    confirmButtonColor: "red",
                });
            });
        }else{
            Swal.fire({
                title: "Warning",
                text: "Add correct informations",
                icon: "warning",
                confirmButtonColor: "#f04f04",
            })
        }
    }

    return(
        <Box sx={{minHeight:"90vh", bgcolor:grey[300]}}>
            <Box sx={{pt:"32px"}}>
                <Typography variant="h4" className="text-md font-semibold flex justify-center">Add Project</Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt:"32px"}} display={"flex"} alignItems="center" justifyContent="center">
                        <Typography sx={{textAlign:"left", whiteSpace:"nowrap", width:{xs : "30%", md:"10%"}}}>Title : </Typography>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        type="text"
                                        placeholder="Title"
                                        sx={{
                                            width: { xs: "65%", md: "40%" },
                                            borderColor: title?.length >= 2 ? green[500] : undefined,
                                        }}
                                        error={!!errors.title && submitted === true}
                                        value={title}
                                        helperText={!!errors.title && submitted === true ? errors.title.message : ""}
                                        onChange={(e) => {
                                            setTitle(e.target.value);
                                            field.onChange(e)
                                        } } 
                                    />
                                );
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt:"16px"}} display={"flex"} alignItems="center" justifyContent="center">
                        <Typography sx={{textAlign:"left", whiteSpace:"nowrap", width:{xs : "30%", md:"10%"}}}>Description : </Typography>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    multiline
                                    rows={5}
                                    variant="outlined"
                                    type="text"
                                    placeholder="Description"
                                    sx={{ width: { xs: "65%", md: "40%" } }}
                                    error={!!errors.description && submitted === true}
                                    value={description}
                                    helperText={!!errors.description  && submitted === true ? errors.description.message : ""}
                                    onChange={(e)=>{
                                        setDescription(e.target.value);
                                        field.onChange(e)
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt:"16px"}} display={"flex"} alignItems="center" justifyContent="center">
                        <Typography sx={{textAlign:"left", whiteSpace:"nowrap", width:{xs : "30%", md:"10%"}}}>Image : </Typography>
                        <Controller
                            name="image"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    type="file"
                                    placeholder="Image"
                                    sx={{ width: { xs: "65%", md: "40%" } }}
                                    error={!!errors.image && submitted === true}
                                    helperText={!!errors.image && submitted === true ? errors.image.message : ""}
                                    onChange={(e) => {
                                        setImage(e.target.files[0])
                                        field.onChange(e)
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Box sx={{ width:"55%", display:"flex", justifyContent:"center", mt:"16px" }}>
                        <Button variant="text" onClick={addDetail}>Add details</Button>
                    </Box>
                    {details.map((detail, index) => (
                        <Box key={index} width={"100%"}>
                            <Grid item xs={12} sx={{ mt:"16px"}} display={"flex"}  justifyContent="center">
                                <Typography sx={{textAlign:"left", whiteSpace:"nowrap", width:{xs : "30%", md:"10%"}}}>Description : </Typography>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    multiline
                                    rows={2}
                                    placeholder={`Description de détail ${index +1}`}
                                    sx={{ width: { xs: "65%", md: "40%" } }}
                                    onChange={(e)=>{
                                        const newDetails = [...details];
                                        newDetails[index].description = e.target.value;
                                        setDetails(newDetails);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ mt:"16px"}} display={"flex"} alignItems="center" justifyContent="center">
                                <Typography sx={{textAlign:"left", whiteSpace:"nowrap", width:{xs : "30%", md:"10%"}}}>Image : </Typography>
                                <TextField
                                    variant="outlined"
                                    type="file"
                                    placeholder="Image"
                                    sx={{ width: { xs: "65%", md: "40%" } }}
                                    onChange={(e)=>{
                                        const newDetails = [...details];
                                        newDetails[index].image = e.target.files[0];
                                        setDetails(newDetails);
                                    }}
                                />
                            </Grid>
                            <Box sx={{ width:"75%", display:"flex", justifyContent:"flex-end", mt:"16px" }}>
                                <Button variant="contained" color="error" onClick={() => removeDetail(index)} sx={{  }}>Remove</Button>
                            </Box>
                        </Box>
                    ))}
                    <Grid item xs={12} sx={{ mt:"16px"}} display={"flex"} alignItems="center" justifyContent="center">
                        <Button type="submit" variant="contained" sx={{ bgcolor:grey[800], "&:hover":{bgcolor:grey[900]}, mr:"24px" , px:"32px" }} onClick={()=>{
                            createProject();
                            setSubmitted(true);
                        }}>Send</Button>
                        <Button type="reset" variant="outlined" sx={{ border:`2px solid ${grey[800]}`, color:grey[800], "&:hover":{border:`2px solid ${grey[900]}`, color:grey[900]}, px:"32px" }} onClick={()=>{
                            setTitle(""); setImage(null); setDescription("");
                        }}>Reset</Button>
                    </Grid>
                </Grid>
            </form>
            
        </Box>
    )
}

export default AddProject;