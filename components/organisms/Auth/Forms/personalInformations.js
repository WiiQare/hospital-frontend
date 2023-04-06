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
                                label="Occupation"
                                variant="outlined"
                                name="occupation"
                                {...formik.getFieldProps('occupation')}
                            />

                            {formik.errors.occupation ? renderError(formik.errors.occupation) : <></>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <TextField
                                id="outlined-basic"
                                fullWidth
                                label="Home Address"
                                variant="outlined"
                                name="homeAddress"
                                {...formik.getFieldProps('homeAddress')}
                            />

                            {formik.errors.homeAddress ? renderError(formik.errors.homeAddress) : <></>}
                        </div>

                    </Stack>

                    <div className="flex flex-col gap-1">
                        <MuiPhoneNumber
                            fullWidth
                            label="Personal Contact"
                            variant="outlined"
                            onChange={(value, country) => { formik.setFieldValue("personnalContact", value); formik.setFieldValue("country", country.countryCode) }}

                            defaultCountry={"fr"}
                            name="personnalContact"
                        />
                        {formik.errors.personnalContact ? renderError(formik.errors.personnalContact) : <></>}
                    </div>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Province</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Province"
                        >
                            <MenuItem value={"Kinshasa"}>Kinshasa</MenuItem>
                            <MenuItem value={"Lubumbashi"}>Lubumbashi</MenuItem>
                            <MenuItem value={"Goma"}>Goma</MenuItem>
                            <MenuItem value={"Bukavu"}>Bukavu</MenuItem>
                            <MenuItem value={"Kindu"}>Kindu</MenuItem>
                        </Select>
                    </FormControl>

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

                    <div className="flex items-center !mt-10 mb-2">
                        <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-orange bg-gray-100 border-gray-300 rounded focus:ring-orange focus:ring-1" onChange={(e) => setTerm(e.target.checked)}/>
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
