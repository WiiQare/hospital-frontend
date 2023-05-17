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

        let { confirm_password, ...info } = values;
        info.businessRegistrationNo = parseInt(info.businessRegistrationNo);
        console.log(info);
        dispatch(setRegister({...info, emailVerificationToken: query["email-verification"]}))
        handleComplete()
    };

    const closeToast = () => {
        setState({ type: 0, message: "" })
    }

    const ValidationSchema = yup.object().shape({
        businessType: yup.string().required("Sélectionnez un type d'établissement"),
        name: yup.string().required("Nom de l'établissement est requis"),
        phone: yup.string().required("Téléphoe est requis"),
        address: yup.string().required("L'adresse est requise"),
        city: yup.string().required(),
        postalCode: yup.string().required(),
        nationalId: yup.string().required("ID. Nat. requis"),
        businessRegistrationNo: yup.number().required("RCCM est requis")
    });

    const formik = useFormik({
        initialValues: {
            businessType: '',
            name: '',
            phone: '',
            address: '',
            postalCode: '',
            city: '',
            nationalId: '',
            businessRegistrationNo: '',
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
                            <MenuItem value={"CLINIC"}>Clinique</MenuItem>
                            <MenuItem value={"PHARMACY"}>Pharmacie</MenuItem>
                            <MenuItem value={"HOSPITAL"}>Hôpital</MenuItem>
                            <MenuItem value={"DENTIST"}>Dentiste</MenuItem>
                            <MenuItem value={"MEDICAL_CABINET"}>Cabinet Medical</MenuItem>
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
                                name="name"
                                {...formik.getFieldProps('name')}
                            />

                            {formik.errors.name  && formik.touched.name ? renderError(formik.errors.name) : <></>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="Adresse Etablissement"
                                variant="outlined"
                                name="address"
                                {...formik.getFieldProps('address')}
                            />

                            {formik.errors.address  && formik.touched.address ? renderError(formik.errors.address) : <></>}
                        </div>

                    </Stack>

                    <div className="flex flex-col gap-1">
                        <MuiPhoneNumber
                            fullWidth
                            label="N° Téléphone Etablissement"
                            variant="outlined"
                            onChange={(value, country) => { formik.setFieldValue("phone", value) }}

                            defaultCountry={"fr"}
                            name="phone"
                        />
                        {formik.errors.phone && formik.touched.phone ? renderError(formik.errors.phone) : <></>}
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
                                name="businessRegistrationNo"
                                {...formik.getFieldProps('businessRegistrationNo')}
                            />

                            {formik.errors.businessRegistrationNo && formik.touched.businessRegistrationNo ? renderError(formik.errors.businessRegistrationNo) : <></>}
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
