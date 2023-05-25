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
import LoadingButton from "../../../atoms/Loader/LoadingButton";


function PersonnalInformation() {
    const { activeStep, setActiveStep, formData, setFormData, handleComplete } = useContext(FormContextRegister);
    const [state, setState] = useState({ type: 0, message: '' });
    const [term, setTerm] = useState(false);
    const client = useSelector((state) => state.app.client);
    const router = useRouter();
    const dispatch = useDispatch();


    const newAccountMutation = useMutation(register, {
        onSuccess: (res) => {

            console.log(res);
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

        newAccountMutation.mutate({ ...client.register, ...values })
    };

    const closeToast = () => {
        setState({ type: 0, message: "" })
    }

    const ValidationSchema = yup.object().shape({
        contactPersonFirstName: yup.string().required("Prenom est requis"),
        contactPersonLastName: yup.string().required("Nom est requis"),
        contactPersonPhone: yup.string().required("Phone est requis"),
		contactPersonEmail: yup.string().email().required("Adresse email obligatoire"),
        contactPersonCountry: yup.string().required(),
        contactPersonOccupation: yup.string().required("Quel poste occupez-vous ?"),
        contactPersonHomeAddress: yup.string().required("Adresse est requis"),
    });

    const formik = useFormik({
        initialValues: {
            contactPersonFirstName: '',
            contactPersonLastName: '',
            contactPersonPhone: '',
            contactPersonEmail: '',
            contactPersonOccupation: '',
            contactPersonCountry: '',
            contactPersonHomeAddress: '',
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
                                name="contactPersonFirstName"
                                {...formik.getFieldProps('contactPersonFirstName')}
                            />

                            {formik.errors.contactPersonFirstName && formik.touched.contactPersonFirstName ? renderError(formik.errors.contactPersonFirstName) : <></>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="Nom"
                                variant="outlined"
                                name="contactPersonLastName"
                                {...formik.getFieldProps('contactPersonLastName')}
                            />

                            {formik.errors.contactPersonLastName && formik.touched.contactPersonLastName  ? renderError(formik.errors.contactPersonLastName) : <></>}
                        </div>

                    </Stack>

                    <div className="flex flex-col gap-1">
                        <MuiPhoneNumber
                            fullWidth
                            label="N° Téléphone personnel"
                            variant="outlined"
                            onChange={(value, country) => { formik.setFieldValue("contactPersonPhone", value); formik.setFieldValue("contactPersonCountry", country.countryCode) }}

                            defaultCountry={"cd"}
                            name="contactPersonPhone"
                        />
                        {formik.errors.contactPersonPhone && formik.touched.contactPersonPhone ? renderError(formik.errors.contactPersonPhone) : <></>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <TextField
                            id="outlined-basic"
                            fullWidth
                            label="Adresse email"
                            variant="outlined"
                            name="contactPersonEmail"
                            {...formik.getFieldProps('contactPersonEmail')}
                        />

                        {formik.errors.contactPersonEmail && formik.touched.contactPersonEmail ? renderError(formik.errors.contactPersonEmail) : <></>}
                    </div>

                    <div className="flex gap-4">

                        <FormControl className="w-1/2 flex flex-col gap-1">
                            <InputLabel id="demo-simple-select-label">Occupation</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Occupation"
                                name="contactPersonOccupation"
                                onChange={(e) => formik.setFieldValue("contactPersonOccupation", e.target.value)}
                            >
                                <MenuItem value={"Gérant"}>Gérant</MenuItem>
                                <MenuItem value={"Propriétaire"}>Propriétaire</MenuItem>
                                <MenuItem value={"Autres"}>Autres</MenuItem>
                            </Select>
                            {formik.errors.contactPersonOccupation && formik.touched.contactPersonOccupation ? renderError(formik.errors.contactPersonOccupation) : <></>}
                        </FormControl>

                        <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="Home Address"
                                variant="outlined"
                                name="contactPersonHomeAddress"
                                {...formik.getFieldProps('contactPersonHomeAddress')}
                            />

                            {formik.errors.contactPersonHomeAddress && formik.touched.contactPersonHomeAddress ? renderError(formik.errors.contactPersonHomeAddress) : <></>}
                        </div>

                    </div>

                    <div className="flex items-center !mt-10 mb-2">
                        <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-orange bg-gray-100 border-gray-300 rounded focus:ring-orange focus:ring-1" onChange={(e) => setTerm(e.target.checked)} />
                        <label for="link-checkbox" className="h-4 ml-2 text-sm font-normal text-gray-600 dark:text-gray-300">I agree with the <a href="#" className="text-primary hover:underline">terms and conditions</a>.</label>
                    </div>

                    <Box>
                        <Button size="large" variant="contained" type="submit" className="disabled:bg-gray-200" disabled={!term}>
                            {newAccountMutation.isLoading ? <LoadingButton /> : 'CREATE NEW ACCOUNT'}
                        </Button>
                    </Box>
                </Stack>
            </form>
        </>
    );
}

export default PersonnalInformation;
