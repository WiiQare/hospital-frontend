import MuiPhoneNumber from 'material-ui-phone-number';
import React, { Fragment, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Dialog, Transition } from '@headlessui/react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

const Scan = () => {
	const [data, setData] = useState(null);
	const [step, setStep] = useState(0);
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	if (step === 0)
		return (
			<div className='h-full flex justify-center items-center pb-40'>
				<div className="w-full  mx-auto max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-sm rounded-xl space-y-8 mt-2">

					<h1 className='text-center font-semibold text-xl text-gray-700'>Enter Patient Phone Number</h1>

					<div className='space-y-3'>
						<div className="flex flex-col gap-2 w-full">

							<form className="flex w-full justify-between items-center gap-3">

								<MuiPhoneNumber
									fullWidth
									name="phone"
									label="Phone number"
									onChange={(event) => null}
									variant="outlined"
									defaultCountry={"cd"}
									placeholder={"Enter your phone number"}
									className="w-full py-3 placeholder:text-gray-400 hover:outline-none focus:ring-0 border border-gray-300 rounded-lg focus:ring-sky"
								/>

							</form>
						</div>

						<div className="flex flex-row-reverse gap-4">
							<button className="bg-orange text-md py-2 px-4 rounded-lg effect-up text-white" onClick={() => setStep(1)}>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		)


	return (
		<Transition appear show={true} as={"div"} className="flex justify-center flex-col gap-6 h-full items-center mx-auto py-4 md:py-10">
			<Transition.Child
				enter="ease-out duration-300"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
				className={"md:w-1/2 bg-white rounded-xl px-10 py-8 min-h-full"}
			>

				<TabsModal value={value} handleChange={handleChange} />


				<TabItems value={value} />


			</Transition.Child>
		</Transition>

	)

	return (

		<div className='flex flex-col gap-6 py-20'>
			<div className='text-center'>
				<h3 className='text-xl font-semibold text-gray-700'>Scan QR Code</h3>
				<p className='text-sm font-light text-gray-500'>Accorder la demande d'allumer la caméra</p>
			</div>
			<div className="">
				<QrReader
					onResult={(result, error) => {
						if (!!result) {
							setData(result?.text);
						}

						if (!!error) {
							console.info(error);
						}
					}}
					constraints={{ facingMode: "environment" }}
					style={{ width: '100%' }}
				/>
			</div>
		</div>
	);
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

function TabItems({ value }) {


	return (
		<div className="mt-2">
			{/* For Email */}
			<div className="text-sm text-gray-500">
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
										setData(result?.text);
									}

									if (!!error) {
										console.info(error);
									}
								}}
								constraints={{ facingMode: "environment" }}
								style={{ width: '100%' }}
							/>
						</div>
					</div>

				</TabPanel>

				<TabPanel value={value} index={1} >

					<div className="space-y-8">

						Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sed alias velit quos possimus in error! Aliquid pariatur distinctio praesentium! Voluptatem error distinctio, nam explicabo repellat reprehenderit officiis vel doloribus.
						Provident iste nesciunt autem ipsum cumque officiis nulla saepe repudiandae quasi inventore. Quos sit debitis rerum nostrum animi. Molestiae doloribus cum cumque corrupti in nisi voluptate ducimus nemo dolores iure.
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