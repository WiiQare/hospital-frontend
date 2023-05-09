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
    const client = useSelector((state) => state.app.client);
    const router = useRouter();
    const dispatch = useDispatch();


    const newAccountMutation = useMutation(register, {
        onSuccess: (res) => {

            if (res.code) {
                setState({ type: 2, message: res.message ?? res.description })
                setTimeout(() => {
                    setState({ type: 0, message: "" })
                }, 3000);

            } else {
                setState({ type: 1, message: "Successfully registered" })
                dispatch(setRegister({}))

                setTimeout(() => {
                    router.push('/login')
                }, 2500);

            };
        }
    });

    const onSubmit = async (values) => {
        if (Object.keys(values).length == 0) return console.log("Pas de données");
        //dispatch(setRegsiter({...values}))

        let { confirm_password, ...info } = values;
        //newAccountMutation.mutate({ ...info, ...client.register })
        handleComplete()
    };

    const closeToast = () => {
        setState({ type: 0, message: "" })
    }

    const ValidationSchema = yup.object().shape({
        businessName: yup.string().required("Business Name is a required field"),
        businessPhone: yup.string().required("Phone number is a required field"),
        businessAddress: yup.string().required(),
        country: yup.string().required(),
        city: yup.string().required(),
        postalCode: yup.string().required(),
    });

    const formik = useFormik({
        initialValues: {
            businessName: '',
            businessPhone: '',
            businessAddress: '',
            country: '',
            postalCode: '',
            city: '',
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
                        >
                            <MenuItem value={"Clinic"}>Clinic</MenuItem>
                            <MenuItem value={"Pharmacy"}>Pharmacy</MenuItem>
                            <MenuItem value={"Hospital"}>Hospital</MenuItem>
                            <MenuItem value={"Dentist"}>Dentist</MenuItem>
                            <MenuItem value={"Medical Cabinet"}>Medical Cabinet</MenuItem>
                        </Select>
                    </FormControl>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                        <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="Business Name"
                                variant="outlined"
                                name="businessName"
                                {...formik.getFieldProps('businessName')}
                            />

                            {formik.errors.businessName ? renderError(formik.errors.businessName) : <></>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="Business Street Address"
                                variant="outlined"
                                name="businessAddress"
                                {...formik.getFieldProps('businessAddress')}
                            />

                            {formik.errors.businessAddress ? renderError(formik.errors.businessAddress) : <></>}
                        </div>

                    </Stack>

                    <div className="flex flex-col gap-1">
                        <MuiPhoneNumber
                            fullWidth
                            label="Business Phone"
                            variant="outlined"
                            onChange={(value, country) => { formik.setFieldValue("businessPhone", value); formik.setFieldValue("country", country.countryCode) }}

                            defaultCountry={"fr"}
                            name="businessPhone"
                        />
                        {formik.errors.businessPhone ? renderError(formik.errors.businessPhone) : <></>}
                    </div>

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                        <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="City"
                                variant="outlined"
                                name="city"
                                {...formik.getFieldProps('city')}
                            />

                            {formik.errors.city ? renderError(formik.errors.city) : <></>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="Postal Code"
                                variant="outlined"
                                name="postalCode"
                                {...formik.getFieldProps('postalCode')}
                            />

                            {formik.errors.postalCode ? renderError(formik.errors.postalCode) : <></>}
                        </div>

                    </Stack>

                    <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="Id. Nat."
                                variant="outlined"
                                name="idnat"
                                {...formik.getFieldProps('idnat')}
                            />

                            {formik.errors.idnat ? renderError(formik.errors.idnat) : <></>}
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

                            {formik.errors.rccm ? renderError(formik.errors.rccm) : <></>}
                        </div>

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
