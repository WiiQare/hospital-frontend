import React, { useContext, useState, useReducer } from "react";
import { FormContextRegister } from "../RegisterForm";
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from 'formik';
import { emailValidate } from "../../../../lib/validate";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { sendEmail } from "../../../../lib/helper";
import { useQueryClient, useMutation } from 'react-query';
import {useSelector, useDispatch} from 'react-redux';
import { setRegister } from "../../../../redux/reducer";
import Toast from "../../../atoms/Toast";

import LoadingButton from "../../../atoms/Loader/LoadingButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Email() {
    const { activeStep, setActiveStep, handleComplete } = useContext(FormContextRegister);
    const [showPassword, setShowPassword] = useState(false);
    const [showcPassword, setShowcPassword] = useState(false);
    const [state, setState] = useState({type: 0, message: ''});
    const client = useSelector((state) => state.app.client);
	const dispatch = useDispatch();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowcPassword = () => setShowcPassword((show) => !show);


    const sendEmailMutation = useMutation(sendEmail,  {
        onSuccess: (res) => {

            if(!res.code) {
                setState({type: 1, message: "Email sent successfully"})
                handleComplete()
            } else {
                setState({type: 2, message:res.message ?? res.description})
                setTimeout(() => {
                    setState({ type: 0, message: "" })
                }, 3000);
            };
        }
    });

    const onSubmit = async (values) => {
        if (Object.keys(values).length == 0) return console.log("Pas de données");
        dispatch(setRegister({...values}))
        handleComplete()
        //sendEmailMutation.mutate(values)
    };

    const closeToast = () => {
		setState({ type: 0, message: "" })
	}

    // Formik hook
    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirm_password: '',
        },
        validate: emailValidate,
        onSubmit
    })

    return (
        <>
            
            {state.type > 0 ? state.type == 2 ? <Toast type={"danger"} message={state.message} close={closeToast}/> : (state.type == 1 ? <Toast type={"success"} message={state.message} close={closeToast}/> : <></>) : <></>}


            <Box sx={{ mb: 2, mt: 2, textAlign: "left" }}>
                <Typography color="primary" variant="body1">
                    Entrez votre email
                </Typography>
            </Box>
            <form id="signupform" onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                        <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="FirstName"
                                variant="outlined"
                                name="firstName"
                                {...formik.getFieldProps('firstName')}
                            />
					        
                            {formik.errors.firstName ?  renderError(formik.errors.firstName): <></>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="LastName"
                                variant="outlined"
                                name="lastName"
                                {...formik.getFieldProps('lastName')}
                            />
					        
                            {formik.errors.lastName ?  renderError(formik.errors.lastName): <></>}
                        </div>

                    </Stack>

                    <div className="space-y-1">
                        <TextField
                            id="outlined-basic"
                            fullWidth
                            label="E-mail Address"
                            variant="outlined"
                            name="email"
                            {...formik.getFieldProps('email')} 
                        />
                        {formik.errors.email && formik.touched.email ? <span className="flex items-center gap-1 text-rose-500 text-left text-xs px-1"><HiOutlineInformationCircle /><span>{formik.errors.email}</span></span> : <></>}
                    </div>

                    <div className="flex flex-col gap-1">

                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-basic1">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-basic1"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                {...formik.getFieldProps('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />

                        </FormControl>
                        {formik.errors.password ?  renderError(formik.errors.password): <></>}
                        
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-basic2">
                                Confirm password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-basic2"
                                label="Confirm password"
                                name="confirm_password"
                                type={showcPassword ? "text" : "password"}
                                {...formik.getFieldProps('confirm_password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowcPassword}
                                            edge="end"
                                        >
                                            {showcPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />

                        </FormControl>
                        {formik.errors.confirm_password ?  renderError(formik.errors.confirm_password): <></>}
                    </div>

                    <div className="form-button">
                        <Button size="large" variant="contained" type="submit">

                            {sendEmailMutation.isLoading ? <LoadingButton /> : 'NEXT STEP'}
                        </Button>
                    </div>
                </Stack>
            </form>
        </>
    );
}

export default Email;
