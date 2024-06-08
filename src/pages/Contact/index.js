import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { useState } from "react";

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

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const onSubmit = (data) => {
        console.log("Form submitted successfully:", data);
      };
    return(
        <Box>
            <Typography variant="h4" className="text-md font-semibold flex justify-center">Contact Us</Typography>
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
                                        error={!!errors.firstName}
                                        value={firstName}
                                        helperText={!!errors.firstName ? errors.firstName.message : ""}
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
                                    error={!!errors.lastName}
                                    value={lastName}
                                    helperText={errors.lastName ? errors.lastName.message : ""}
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
                                    error={!!errors.email}
                                    helperText={errors.email ? errors.email.message : ""}
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
                                    error={!!errors.description}
                                    helperText={errors.description ? errors.description.message : ""}
                                    onChange={(e)=>{
                                        setDescription(e.target.value);
                                        field.onChange(e)
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt:"16px"}} display={"flex"} alignItems="center" justifyContent="center">
                        <Button type="submit" variant="contained" sx={{ bgcolor:grey[800], "&:hover":{bgcolor:grey[900]}, mr:"24px" , px:"32px" }}>Send</Button>
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