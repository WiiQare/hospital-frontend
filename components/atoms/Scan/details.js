import React, { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Fetcher from '../../../lib/Fetcher';
import { BiTransferAlt } from 'react-icons/bi';
import CopyToClipboard from 'react-copy-to-clipboard';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { MdPayments } from 'react-icons/md';
import { StepContext } from ".";
import { useRouter } from "next/router";
import { convertCurrency } from "../../../lib/helper";


const ScanDetails = ({ shorten }) => {

	const { step, setStep, total } = useContext(StepContext);
	const router = useRouter();

	const { data: session } = useSession();
	const [copy, setCopy] = useState(false);
	const [data, setData] = useState(null);
	const [dataAmount, setDataAmount] = useState(null);
	const [dataAmountHospital, setDataAmountHospital] = useState({ amount: total, currency: "CDF" });
	const [currencyProvider, setCurrencyProvider] = useState('CDF');
	const [convertRequest, setConvertRequest] = useState(false);

	const Options = {
		method: "GET",
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${session.user.data.access_token}`
		}
	}

	useEffect(() => {
		fetch(`https://api.wiiqare-app.com/api/v1/provider/provider-voucher-details?shortenHash=${shorten}`, Options).then(async res => {
			let json = await res.json();

			if (/AUTH_TOKEN_EXPIRED/i.test(json.code)) router.push('/login')

			setData(json)
			setDataAmount({ amount: json.amount, currency: json.currency })

			setConvertRequest(true);

			const response = await convertCurrency(
				json.currency,
				json.amount,
				'CDF'
			);

			setConvertRequest(false);
			setDataAmount({ amount: response.result, currency: response.query.to })
		});
	}, []);

	const handleCurrency = async (e) => {
		setCurrencyProvider(e.target.checked == true ? 'USD' : 'CDF');

		setConvertRequest(true);
		const res = await convertCurrency(
			dataAmount.currency,
			dataAmount.amount,
			e.target.checked == true ? 'USD' : 'CDF',
		);

		const resHospital = await convertCurrency(
			"CDF",
			total,
			e.target.checked == true ? 'USD' : 'CDF',
		);

		setConvertRequest(false);

		setDataAmount({ amount: res.result, currency: res.query.to })
		setDataAmountHospital({ amount: resHospital.result, currency: resHospital.query.to })
		console.log(resHospital);
	}


	const SliceText = ({ text }) => {
		return <>{text.slice(0, 9)}...{text.slice(-8)}</>
	}

	if (!data) return (
		<div className="flex flex-col gap-3 items-center mt-14 h-full">
			<div className="animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-gray-700 rounded-full" role="status" ariaLabel="loading">
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	)

	if (data.code) return (
		<div className='mx-auto flex justify-center items-center flex-col h-full gap-3'>
			<img src="/images/qr-code-error.png" alt="QR Code erroné" className='w-40 opacity-70' />
			<span className='text-gray-500 text-sm font-light'>{data.description}</span>
			<button onClick={() => location.reload()} className='bg-orange text-white text-sm px-3 py-2 rounded-lg effect-up shadow-sm font-light'>Scannez à nouveau</button>
		</div>
	)

	return (
		<div className='flex justify-center flex-col gap-6 h-full items-center mx-auto py-4 md:py-10 mb-20'>
			<div className='md:w-1/3 sm:w-2/3 w-full bg-white rounded-xl py-8 min-h-fit flex '>
				<div className="flex flex-col gap-6 justify-center w-full">
					<div className="flex flex-col items-center text-center space-y-2">
						<div className="flex flex-col items-center select-none">
							<h1 className="font-extrabold text-gray-700 text-lg hidden md:flex">Détails Pass santé</h1>
						</div>
					</div>

					<div className="flex gap-4 items-center px-5 justify-center">
						<img className="inline-block h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white dark:ring-gray-800" src="/images/homme.png" alt="Image Description" />
						<BiTransferAlt size={30} className='text-gray-400' />
						<img className="inline-block h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white dark:ring-gray-800" src="https://i.goopics.net/9w9mvb.png" alt="Image Description" />
					</div>


					<span className="text-xs flex justify-center items-center gap-1">Pass Sante ID:
						<CopyToClipboard text={data.hash} onCopy={() => {
							setCopy(true); setTimeout(() => {
								setCopy(false)
							}, 2000);
						}}>
							<div className="flex items-center gap-1">
								[
								<div className="tooltip" data-tip={!copy ? "Copy to clipboard" : "✓ Copy"}>
									<span className="text-orange cursor-pointer"><SliceText text={data.hash} /></span>
								</div>
								]
							</div>
						</CopyToClipboard>
					</span>


					<div className="flex justify-between px-6 items-center">
						<h1 className='font-normal text-md text-gray-400'>Choisir la devise : </h1>

						{convertRequest ? (
							<div className="pr-8">
								<div
									className="animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-gray-400 rounded-full"
									role="status"
									ariaLabel="loading"
								>
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						) : (
							<label for="Toggle4" className="inline-flex items-center rounded-full overflow-hidden cursor-pointer bg-white border-2 border-primary text-primary">
								<input id="Toggle4" type="checkbox" className="hidden peer" onChange={(e) => handleCurrency(e)} />
								<span className="px-4 py-2 bg-transparent peer-checked:bg-primary text-primary peer-checked:text-white font-semibold select-none text-sm">CDF</span>
								<span className="px-4 py-2 bg-primary text-white font-semibold peer-checked:bg-white peer-checked:text-primary select-none text-sm">USD</span>
							</label>
						)}


					</div>

					<ItemsDetails title={"Nom du Patient"} value={data.patientNames} exclamation={true} />
					<ItemsDetails title={"Hôpital"} value={session?.user?.data.names ?? session?.user?.data.name} exclamation={false} />
					<ItemsDetails title={"Montant Pass Santé"} value={new Intl.NumberFormat("en-US", { style: 'currency', currency: dataAmount.currency }).format(dataAmount.amount)} otherValue={`${(dataAmount.amount - dataAmountHospital.amount) > 0 ? 'Reste: ' : 'Manquant: '}` + new Intl.NumberFormat("en-US", { style: 'currency', currency: currencyProvider }).format(dataAmount.amount - dataAmountHospital.amount)} />
					<ItemsDetails title={"Montant Hopital"} value={new Intl.NumberFormat("en-US", { style: 'currency', currency: dataAmountHospital.currency }).format(dataAmountHospital.amount)} otherValue={new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(new Date())} />

					{
						total > data.amount ? (
							<span className="text-xs text-red-400 font-normal px-4">* Ce traitement coûte plus cher que le montant dans ce Pass Santé</span>
						) : <></>
					}

					<div className='flex justify-center'>
						<button className='capitalize bg-orange w-fit  px-6 py-4 rounded-xl text-white flex gap-2 items-center effect-up shadow-md' onClick={() => setStep(step + 1)}><MdPayments size={20} /> {total > data.amount ? 'Payer une partie avec ce Pass' : 'Procéder au paiement'}</button>
					</div>

				</div>
			</div>
		</div>
	);
}

export default ScanDetails;

function ItemsDetails({ title, value, otherValue, exclamation = false, last = true }) {
	return (
		<div className="flex flex-col hover:shadow-sm w-full">
			<div className='flex justify-between px-6 py-2 items-center'>
				<div className='flex flex-col  mb-2 gap-1'>
					<h1 className='font-normal text-gray-400 text-sm'>{title}</h1>
					<div className='flex gap-2 items-center'>
						<h3 className='font-bold text-md text-gray-700'>{value}</h3>
						{otherValue && <span className='text-sm text-gray-400'> - {otherValue}</span>}
					</div>
				</div>

				{exclamation && <AiOutlineExclamationCircle size={24} className='text-gray-300 cursor-pointer hover:text-orange transition-all duration-200' />}
			</div>

			{last && <hr />}
		</div>
	)
}