import React, { useContext, useState } from "react";
import { FormContextRegister } from "../RegisterForm";
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MuiPhoneNumber from "material-ui-phone-number";
import { useSelector, useDispatch } from 'react-redux';
import { useQueryClient, useMutation } from 'react-query';
import { ErrorMessage, useFormik } from 'formik';
import { register } from "../../../../lib/helper";
import Toast from "../../../atoms/Toast";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from 'next/router'
import { setRegister } from "../../../../redux/reducer";
import LoadingButton from "../../../atoms/Loader/LoadingButton";
import * as yup from "yup";
import { HiOutlineInformationCircle } from "react-icons/hi";


function Information() {
    const { activeStep, setActiveStep, formData, setFormData, handleComplete } = useContext(FormContextRegister);
    const [state, setState] = useState({ type: 0, message: '' });
    const query = useRouter().query;
    const client = useSelector((state) => state.app.client);
    const dispatch = useDispatch();


    const onSubmit = async (values) => {
        if (Object.keys(values).length == 0) return console.log("Pas de données");

        console.log(values);
        let { confirm_password, rccm, ...info } = values;
        dispatch(setRegister({...info, emailVerificationToken: query["email-verification"]}))
        handleComplete()
    };

    const closeToast = () => {
        setState({ type: 0, message: "" })
    }

    const ValidationSchema = yup.object().shape({
        businessType: yup.string().required("Sélectionnez un type d'établissement"),
        businessName: yup.string().required("Nom est requis"),
        businessPhone: yup.string().required("Téléphoe est requis"),
        businessAddress: yup.string().required("L'adresse est requise"),
        country: yup.string().required(),
        city: yup.string().required(),
        postalCode: yup.string().required(),
        nationalId: yup.string().required("ID. Nat. requis")
    });

    const formik = useFormik({
        initialValues: {
            businessType: '',
            businessName: '',
            businessPhone: '',
            businessAddress: '',
            country: '',
            postalCode: '',
            city: '',
            nationalId: '',
            rccm: '',
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
                    Configuration du compte
                </Typography>
            </Box>
            <form id="signupform" onSubmit={formik.handleSubmit}>
                <Stack spacing={1.5}>
                <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type Business</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Type Business"
                            onChange={(e) => formik.setFieldValue("businessType", e.target.value)}
                        >
                            <MenuItem value={"Clinique"}>Clinique</MenuItem>
                            <MenuItem value={"Pharmacie"}>Pharmacie</MenuItem>
                            <MenuItem value={"Hôpital"}>Hôpital</MenuItem>
                            <MenuItem value={"Dentiste"}>Dentiste</MenuItem>
                            <MenuItem value={"Cabinet Medical"}>Cabinet Medical</MenuItem>
                        </Select>
                        {formik.errors.businessType && formik.touched.businessType ? renderError(formik.errors.businessType) : <></>}

                    </FormControl>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                        <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="Nom Etablissement"
                                variant="outlined"
                                name="businessName"
                                {...formik.getFieldProps('businessName')}
                            />

                            {formik.errors.businessName  && formik.touched.businessName ? renderError(formik.errors.businessName) : <></>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="Adresse Etablissement"
                                variant="outlined"
                                name="businessAddress"
                                {...formik.getFieldProps('businessAddress')}
                            />

                            {formik.errors.businessAddress  && formik.touched.businessAddress ? renderError(formik.errors.businessAddress) : <></>}
                        </div>

                    </Stack>

                    <div className="flex flex-col gap-1">
                        <MuiPhoneNumber
                            fullWidth
                            label="N° Téléphone Etablissement"
                            variant="outlined"
                            onChange={(value, country) => { formik.setFieldValue("businessPhone", value); formik.setFieldValue("country", country.countryCode) }}

                            defaultCountry={"fr"}
                            name="businessPhone"
                        />
                        {formik.errors.businessPhone && formik.touched.businessPhone ? renderError(formik.errors.businessPhone) : <></>}
                    </div>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                        <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="Ville"
                                variant="outlined"
                                name="city"
                                {...formik.getFieldProps('city')}
                            />

                            {formik.errors.city && formik.touched.city ? renderError(formik.errors.city) : <></>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="Code Postal"
                                variant="outlined"
                                name="postalCode"
                                {...formik.getFieldProps('postalCode')}
                            />

                            {formik.errors.postalCode && formik.touched.postalCode ? renderError(formik.errors.postalCode) : <></>}
                        </div>

                    </Stack>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>

                    <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="Id. Nat."
                                variant="outlined"
                                name="nationalId"
                                {...formik.getFieldProps('nationalId')}
                            />

                            {formik.errors.nationalId && formik.touched.nationalId ? renderError(formik.errors.nationalId) : <></>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="RCCM"
                                variant="outlined"
                                name="rccm"
                                {...formik.getFieldProps('rccm')}
                            />

                            {formik.errors.rccm && formik.touched.rccm ? renderError(formik.errors.rccm) : <></>}
                        </div>
                    </Stack>

                    <Box>
                        <Button size="large" variant="contained" type="submit" className="mt-3">
                            {/* {newAccountMutation.isLoading ? <LoadingButton /> : 'NEXT'} */}
                            SUIVANT
                        </Button>
                    </Box>
                </Stack>
            </form>
        </>
    );
}

export default Information;
