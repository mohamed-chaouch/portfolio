import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";


const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required").min(2, "First Name should be at least 2 characters"),
    lastName: yup.string().required("Last Name is required").min(2, "Last Name should be at least 2 characters"),
    email: yup.string().required("Email is required").matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Choose valid email"
      ),
    description: yup.string().required("Description is required").min(10, "Description should be at least 10 characters"),
});

function Contact(){
    const { control, handleSubmit, formState: { errors, isValid }, reset, watch } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',  // To enable real-time validation
    });

    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const onSubmit = (data) => {
        console.log("Form submitted successfully:", data);
      };

      const createContact = () =>{
        if(firstName?.length >= 2 && lastName?.length >= 2 && email !== "" && description?.length >=10){
            axios.post('create-contact', {
                firstName,
                lastName,
                email,
                description,
            }).then((response)=>{
                Swal.fire({
                    title: "Success",
                    text: "Email Sent It Successfully to Mohamed Chaoueech",
                    icon: "success",
                    confirmButtonColor: "green",
                  })
                navigate('/');
            })
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
        <Box sx={{height:"90.5vh", bgcolor:grey[200]}}>
            <Box sx={{pt:"32px"}}>
                <Typography variant="h5" sx={{ pb: "16px", fontWeight: 'bold', textAlign: 'center' }}>Send Me a Message</Typography>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt:"32px"}} display={"flex"} alignItems="center" justifyContent="center">
                        <Typography sx={{textAlign:"left", whiteSpace:"nowrap", width:{xs : "30%", md:"10%"}}}>First Name : </Typography>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        type="text"
                                        placeholder="First Name"
                                        sx={{
                                            width: { xs: "65%", md: "40%" },
                                            borderColor: firstName?.length >= 2 ? green[500] : undefined,
                                        }}
                                        error={!!errors.firstName && submitted === true}
                                        value={firstName}
                                        helperText={!!errors.firstName && submitted === true ? errors.firstName.message : ""}
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                            field.onChange(e)
                                        } } 
                                    />
                                );
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt:"16px"}} display={"flex"} alignItems="center" justifyContent="center">
                        <Typography sx={{textAlign:"left", whiteSpace:"nowrap", width:{xs : "30%", md:"10%"}}}>Last Name : </Typography>
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    type="text"
                                    placeholder="Last Name"
                                    sx={{ width: { xs: "65%", md: "40%" } }}
                                    error={!!errors.lastName && submitted === true}
                                    value={lastName}
                                    helperText={errors.lastName && submitted === true ? errors.lastName.message : ""}
                                    onChange={(e)=>{
                                        setLastName(e.target.value);
                                        field.onChange(e)
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt:"16px"}} display={"flex"} alignItems="center" justifyContent="center">
                        <Typography sx={{textAlign:"left", whiteSpace:"nowrap", width:{xs : "30%", md:"10%"}}}>Email : </Typography>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    sx={{ width: { xs: "65%", md: "40%" } }}
                                    error={!!errors.email && submitted === true}
                                    helperText={errors.email && submitted === true ? errors.email.message : ""}
                                    onChange={(e)=>{
                                        setEmail(e.target.value);
                                        field.onChange(e)
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt:"16px"}} display={"flex"} justifyContent="center">
                        <Typography sx={{textAlign:"left", whiteSpace:"nowrap", width:{xs : "30%", md:"10%"}}}>Description : </Typography>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    type="text"
                                    multiline
                                    rows={5}
                                    value={description}
                                    placeholder="Description"
                                    sx={{ width: { xs: "65%", md: "40%" } }}
                                    error={!!errors.description && submitted === true}
                                    helperText={errors.description && submitted === true ? errors.description.message : ""}
                                    onChange={(e)=>{
                                        setDescription(e.target.value);
                                        field.onChange(e)
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt:"16px"}} display={"flex"} alignItems="center" justifyContent="center">
                        <Button type="submit" variant="contained" sx={{ bgcolor:grey[800], "&:hover":{bgcolor:grey[900]}, mr:"24px" , px:"32px" }} onClick={()=>{
                            createContact();
                            setSubmitted(true);
                            setFirstName(""); setLastName(""); setEmail(""); setDescription("");
                        }}>Send</Button>
                        <Button type="reset" variant="outlined" sx={{ border:`2px solid ${grey[800]}`, color:grey[800], "&:hover":{border:`2px solid ${grey[900]}`, color:grey[900]}, px:"32px" }} onClick={()=>{
                            setFirstName(""); setLastName(""); setEmail(""); setDescription("");
                        }}>Reset</Button>
                    </Grid>
                </Grid>
            </form>
            
        </Box>
    )
}

export default Contact;