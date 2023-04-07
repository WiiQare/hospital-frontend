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
import ButtonNoAction from '../Button/NoAction';
import { BiTransferAlt } from 'react-icons/bi';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { MdPayments } from 'react-icons/md';

const Scan = () => {
	const [data, setData] = useState(null);
	const [step, setStep] = useState(0);
	const [value, setValue] = useState(0);
	const [copy, setCopy] = useState(false);


	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleStep = (value, result) => {
		setStep(value)
		setData(result)

		console.log(step);
	};

	const SliceText = ({ text }) => {
		return <>{text.slice(0, 9)}...{text.slice(-8)}</>
	}

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
			<div className='md:w-1/3 bg-white rounded-xl py-8 min-h-fit flex '>
				<div className="flex flex-col gap-6 justify-center w-full">
					<div className="flex flex-col items-center text-center space-y-2">
						<div className="flex flex-col items-center select-none">
							<h1 className="font-extrabold text-gray-700 text-lg hidden md:flex">Voucher Details</h1>
						</div>
					</div>

					<div className="flex gap-4 items-center px-5 justify-center">
						<img className="inline-block h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white dark:ring-gray-800" src="/images/homme.png" alt="Image Description" />
						<BiTransferAlt size={30} className='text-gray-400' />
						<img className="inline-block h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white dark:ring-gray-800" src="/images/femme.png" alt="Image Description" />
					</div>


					<span className="text-xs flex justify-center items-center gap-1">Pass Sante ID:
						<CopyToClipboard text={data.transactionHash} onCopy={() => {
							setCopy(true); setTimeout(() => {
								setCopy(false)
							}, 2000);
						}}>
							<div className="flex items-center gap-1">
								[
								<div className="tooltip" data-tip={!copy ? "Copy to clipboard" : "✓ Copy"}>
									<span className="text-orange cursor-pointer"><SliceText text={"0xf59b12eccfc5faedbc4657bd593d6d6a0c679623"} /></span>
								</div>
								]
							</div>
						</CopyToClipboard>
					</span>

					<ItemsDetails title={"Name Sender"} value={"Peter NDENGO"} exclamation={true} />
					<ItemsDetails title={"Name Receiver"} value={"Bienvenu Zigabe"} exclamation={true} />
					<ItemsDetails title={"Amount Send"} value={"$85"} otherValue={"2023 April 10"} />

					<div className='flex justify-center'>
						<button className='capitalize bg-orange w-fit  px-6 py-4 rounded-xl text-white flex gap-2 items-center effect-up shadow-md'><MdPayments size={20}/> Proceed to payment</button>
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

function ItemsDetails({ title, value, otherValue, exclamation = false, last = true }) {
	return (
		<div className="flex flex-col hover:shadow-sm w-full">
			<div className='flex justify-between px-6 py-2 items-center'>
				<div className='flex flex-col  mb-2 gap-1'>
					<h1 className='font-normal text-md text-gray-400 text-sm'>{title}</h1>
					<div className='flex gap-2 items-center'>
						<h3 className='font-bold text-xl text-gray-700'>{value}</h3>
						{otherValue && <span className='text-sm text-gray-400'> - {otherValue}</span>}
					</div>
				</div>

				{exclamation && <AiOutlineExclamationCircle size={24} className='text-gray-300 cursor-pointer hover:text-orange transition-all duration-200' />}
			</div>

			{last && <hr /> }
		</div>
	)
}