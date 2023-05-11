import React, { useContext, useState } from "react";
import { FormContextRegister } from "../RegisterForm";
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material";
import MuiPhoneNumber from "material-ui-phone-number";
import { useSelector, useDispatch } from 'react-redux';
import { useQueryClient, useMutation } from 'react-query';
import { ErrorMessage, useFormik } from 'formik';
import { register } from "../../../../lib/helper";
import Toast from "../../../atoms/Toast";
import { useRouter } from 'next/router'
import { setRegister } from "../../../../redux/reducer";
import * as yup from "yup";


function PersonnalInformation() {
    const { activeStep, setActiveStep, formData, setFormData, handleComplete } = useContext(FormContextRegister);
    const [state, setState] = useState({ type: 0, message: '' });
    const [term, setTerm] = useState(false);
    const client = useSelector((state) => state.app.client);
    const router = useRouter();
    const dispatch = useDispatch();

    console.log(client);


    const newAccountMutation = useMutation(register, {
        onSuccess: (res) => {

            if (res.code) {
                setState({ type: 2, message: res.message ?? res.description })
                setTimeout(() => {
                    setState({ type: 0, message: "" })
                }, 3000);

            } else {
                setState({ type: 1, message: "Votre compte a été enregistré !" })
                dispatch(setRegister({}))

                setTimeout(() => {
                    router.push('/login')
                }, 2500);

            };
        }
    });

    const onSubmit = async (values) => {
        if (Object.keys(values).length == 0) return console.log("Pas de données");

        console.log(values);
        newAccountMutation.mutate({ ...client.register, contactPerson: values})
    };

    const closeToast = () => {
        setState({ type: 0, message: "" })
    }

    const ValidationSchema = yup.object().shape({
        firstName: yup.string().required("Prenom est requis"),
        lastName: yup.string().required("Nom est requis"),
        phone: yup.string().required("Phone est requis"),
		email: yup.string().email().required("Adresse email obligatoire"),
        country: yup.string().required(),
        occupation: yup.string().required("Quel poste occupez-vous ?"),
        homeAddress: yup.string().required("Adresse est requis"),
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            occupation: '',
            country: '',
            homeAddress: '',
        },
        validationSchema: ValidationSchema,
        onSubmit
    })

    const renderError = (message) => (
        <p className="text-xs text-red-600 font-light flex items-center gap-1 px-1">{message}</p>
    );

    return (
        <>

            {state.type > 0 ? state.type == 2 ? <Toast type={"danger"} message={state.message} close={closeToast} /> : (state.type == 1 ? <Toast type={"success"} message={state.message} close={closeToast} /> : <></>) : <></>}

            <Box sx={{ mb: 2, mt: 2, textAlign: "left" }}>
                <Typography color="primary" variant="body1">
                    Information sur la personne qui engage l'entreprise
                </Typography>
            </Box>
            <form id="signupform" onSubmit={formik.handleSubmit}>
                <Stack spacing={1.5}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                        <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="Prenom"
                                variant="outlined"
                                name="firstName"
                                {...formik.getFieldProps('firstName')}
                            />

                            {formik.errors.firstName && formik.touched.firstName ? renderError(formik.errors.firstName) : <></>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="Nom"
                                variant="outlined"
                                name="lastName"
                                {...formik.getFieldProps('lastName')}
                            />

                            {formik.errors.lastName && formik.touched.lastName  ? renderError(formik.errors.lastName) : <></>}
                        </div>

                    </Stack>

                    <div className="flex flex-col gap-1">
                        <MuiPhoneNumber
                            fullWidth
                            label="N° Téléphone personnel"
                            variant="outlined"
                            onChange={(value, country) => { formik.setFieldValue("phone", value); formik.setFieldValue("country", country.countryCode) }}

                            defaultCountry={"cd"}
                            name="phone"
                        />
                        {formik.errors.phone && formik.touched.phone ? renderError(formik.errors.phone) : <></>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <TextField
                            id="outlined-basic"
                            fullWidth
                            label="Adresse email"
                            variant="outlined"
                            name="email"
                            {...formik.getFieldProps('email')}
                        />

                        {formik.errors.email && formik.touched.email ? renderError(formik.errors.email) : <></>}
                    </div>

                    <div className="flex gap-4">

                        <FormControl className="w-1/2 flex flex-col gap-1">
                            <InputLabel id="demo-simple-select-label">Occupation</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Occupation"
                                name="occupation"
                                onChange={(e) => formik.setFieldValue("occupation", e.target.value)}
                            >
                                <MenuItem value={"Gérant"}>Gérant</MenuItem>
                                <MenuItem value={"Propriétaire"}>Propriétaire</MenuItem>
                                <MenuItem value={"Autres"}>Autres</MenuItem>
                            </Select>
                            {formik.errors.occupation && formik.touched.occupation ? renderError(formik.errors.occupation) : <></>}
                        </FormControl>

                        <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="Home Address"
                                variant="outlined"
                                name="homeAddress"
                                {...formik.getFieldProps('homeAddress')}
                            />

                            {formik.errors.homeAddress && formik.touched.homeAddress ? renderError(formik.errors.homeAddress) : <></>}
                        </div>

                    </div>

                    <div className="flex items-center !mt-10 mb-2">
                        <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-orange bg-gray-100 border-gray-300 rounded focus:ring-orange focus:ring-1" onChange={(e) => setTerm(e.target.checked)} />
                        <label for="link-checkbox" className="h-4 ml-2 text-sm font-normal text-gray-600 dark:text-gray-300">I agree with the <a href="#" className="text-primary hover:underline">terms and conditions</a>.</label>
                    </div>

                    <Box>
                        <Button size="large" variant="contained" type="submit" className="disabled:bg-gray-200" disabled={!term}>
                            CREATE NEW ACCOUNT
                        </Button>
                    </Box>
                </Stack>
            </form>
        </>
    );
}

export default PersonnalInformation;
