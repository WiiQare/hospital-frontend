import MuiPhoneNumber from 'material-ui-phone-number';
import React, { Fragment, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Dialog, Transition } from '@headlessui/react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from "yup";
import ScanDetails from './details';
import SecurityCode from './security';

const Scan = () => {
	const [data, setData] = useState(null);
	const [step, setStep] = useState(0);
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleStep = (result = null) => {
		
		setStep(step+1)
		result && setData(result && result.slice(0, 8))

	};	

	if (step === 0)
		return (
			<Transition appear show={true} as={"div"} className="flex justify-center flex-col gap-6 h-full items-center mx-auto py-4 md:py-10">
				<Transition.Child
					enter="ease-out duration-300"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
					className={"md:w-1/2 bg-white rounded-xl px-10 py-8 min-h-fit"}
				>

					<TabsModal value={value} handleChange={handleChange} />


					<TabItems value={value} handleStep={handleStep} />


				</Transition.Child>
			</Transition>

		)

	if (step === 1) return <ScanDetails shorten={data} handleStep={handleStep} />

	return <SecurityCode />
};

export default Scan;

function TabsModal({ value, handleChange }) {

	return (
		<div>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					<Tab label={"Scan QR Code"} {...a11yProps(0)} key={0} />
					<Tab label={"Write Code Voucher"} {...a11yProps(1)} key={1} />
				</Tabs>
			</Box>
		</div>
	)
}

function TabItems({ value, handleStep }) {


	const onSubmit = async (values) => {
        if (Object.keys(values).length == 0) return console.log("Pas de données");

        handleStep(1, {transactionHash: "0xf59b12eccfc5faedbc4657bd593d6d6a0c679623"})
    };

	const ValidationSchema = yup.object().shape({
        pass: yup.string().required("Pass Santé est requis")
    });

	const formik = useFormik({
        initialValues: {
            pass: '',
        },
        validationSchema: ValidationSchema,
        onSubmit
    })

	const renderError = (message) => (
        <p className="text-xs text-red-600 font-light flex items-center gap-1 px-1">{message}</p>
    );

	return (
		<div className="mt-2">
			<div className="text-sm text-gray-500">
				{/* For Scan */}
				<TabPanel value={value} index={0} >
					<div className="mt-4">

						<div className='text-center'>
							<h3 className='text-xl font-semibold text-gray-700'>Scan QR Code</h3>
							<p className='text-sm font-light text-gray-500'>Accorder la demande d'allumer la caméra</p>
						</div>
						<div className="">
							<QrReader
								onResult={(result, error) => {
									if (!!result) {
										handleStep(result.text)
									}
								}}
								constraints={{ facingMode: "environment" }}
								style={{ width: '100%' }}
							/>
						</div>
					</div>

				</TabPanel>

				<TabPanel value={value} index={1} >

					<div className="space-y-8 py-10 px-20">
                       
                        <form id="signupform" onSubmit={formik.handleSubmit}>
                            <Stack spacing={2}>

                                <div className="space-y-1">
                                    <TextField
                                        id="outlined-basic"
                                        fullWidth
                                        label="Entrez le code Pass Santé"
                                        variant="outlined"
                                        name="pass"
										{...formik.getFieldProps('pass')}

                                    />
                            		{formik.errors.pass && formik.touched.pass ? renderError(formik.errors.pass) : <></>}
                                </div>

                                <div className="form-button flex flex-row-reverse">
                                    <Button size="medium" variant="contained" type="submit">
										Soumettre
                                    </Button>
                                </div>
                            </Stack>
                        </form>
					</div>

				</TabPanel>
			</div>
		</div>
	)
}

export function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}