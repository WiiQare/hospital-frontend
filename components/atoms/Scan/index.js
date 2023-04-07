import MuiPhoneNumber from 'material-ui-phone-number';
import React, { Fragment, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Dialog, Transition } from '@headlessui/react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useQRCode } from "next-qrcode";
import ButtonNoAction from '../Button/NoAction';

const Scan = () => {
	const [data, setData] = useState(null);
	const [step, setStep] = useState(0);
	const [value, setValue] = useState(0);
	const [copy, setCopy] = useState(false);
	const [copyLink, setCopyLink] = useState(false);
	const { Canvas } = useQRCode();


	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleStep = (value, result) => {
		setStep(value)
		setData(result)

		console.log(step);
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

	if (step === 1)
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


					<TabItems value={value} handleStep={handleStep} />


				</Transition.Child>
			</Transition>

		)

	return (
		<div className='flex justify-center flex-col gap-6 h-full items-center mx-auto py-4 md:py-10'>
			<div className='md:w-1/2 bg-white rounded-xl px-10 py-8 min-h-fit flex justify-center'>
				<div className="flex flex-col gap-6 justify-center items-center">
					<div className="flex flex-col items-center text-center space-y-2">
						<div className="flex flex-col items-center select-none">
							<h1 className="font-extrabold text-gray-700 text-lg hidden md:flex">Pass Sante</h1>
						</div>
						<span className="text-xs flex items-center gap-1">Pass Sante ID:
							<CopyToClipboard text={"0xhgfebkzkhgruiezgbuiveriuhbrviubir"} onCopy={() => {
								setCopy(true); setTimeout(() => {
									setCopy(false)
								}, 2000);
							}}>
								<div className="flex items-center gap-1">
									[
									<div className="tooltip" data-tip={!copy ? "Copy to clipboard" : "✓ Copy"}>
										<span className="text-orange cursor-pointer">Oxoofofofi...gjbzrjz</span>
									</div>
									]
								</div>
							</CopyToClipboard>
						</span>
					</div>

					<div className="flex flex-col items-center gap-4">

						<div className="border relative border-gray-300 rounded-lg overflow-hidden">
							<Canvas
								className="w-full"
								text={`Oxoofofofirgkrbezogbrzbgnriogbjkbzrgjbzrjz`}
								options={{
									level: "M",
									margin: 1,
									scale: 4,
									quality: 100,
									color: {
										dark: "#000",
										light: "#FFF",
									},
								}}
							/>
							{/* <div className="absolute w-full h-full z-20 top-1/3 left-1.5/3 mx-auto">
					<Image
						src={logo}
						className="h-6 md:h-9 object-left object-contain w-min"
					/>
				</div> */}
						</div>

						<div className="flex flex-col items-center gap-1">
							<div className="flex -space-x-2">
								<img className="inline-block h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white dark:ring-gray-800" src="/images/homme.png" alt="Image Description" />
								<img className="inline-block h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white dark:ring-gray-800" src="/images/femme.png" alt="Image Description" />
							</div>

							<h4 className="text-sm text-center"><span className="font-semibold">$50</span> Health Pass WiiQare <br /> From <span className="text-orange font-semibold">Bienvenu Z.</span> To <span className="text-orange font-semibold">Peter N.</span></h4>
						</div>
						<ButtonNoAction color={"orange"} text={"Proceed to payment"}/>
					</div>

				</div>
			</div>
		</div>
	)
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
										//setData(result?.text);
										handleStep(2, result.text)
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
						lorem ipsum dolor s
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