import React, { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Fetcher from '../../../lib/Fetcher';
import { BiTransferAlt } from 'react-icons/bi';
import CopyToClipboard from 'react-copy-to-clipboard';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { MdPayments } from 'react-icons/md';
import { StepContext } from ".";
import { useRouter } from "next/router";


const ScanDetails = ({shorten}) => {

	const { step, setStep } = useContext(StepContext);
	const router = useRouter();

    console.log(shorten);

	const { data:session } = useSession();
	const [copy, setCopy] = useState(false);
	const [data, setData] = useState(null);

	const Options = {
		method: "GET",
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${session.user.data.access_token}`
		}
	}

	useEffect(() => {
		fetch(`https://api.wiiqare-app.com/api/v1/provider/provider-voucher-details?shortenHash=${shorten}`, Options).then(async res =>{
			let json = await res.json();	 
		
			if (/AUTH_TOKEN_EXPIRED/i.test(json.code)) router.push('/login')

			setData(json)
		});
	}, []);



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

    if(data.code) return (
        <div className='mx-auto flex justify-center items-center flex-col h-full gap-3'>
            <img src="/images/qr-code-error.png" alt="QR Code erroné" className='w-40 opacity-70'/>
            <span className='text-gray-500 text-sm font-light'>{data.description}</span>
            <button onClick={() => location.reload()} className='bg-orange text-white text-sm px-3 py-2 rounded-lg effect-up shadow-sm font-light'>Scannez à nouveau</button>
        </div>
    )

    return (
        <div className='flex justify-center flex-col gap-6 h-full items-center mx-auto py-4 md:py-10 mb-20'>
			<div className='md:w-1/3 w-full bg-white rounded-xl py-8 min-h-fit flex '>
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

					<ItemsDetails title={"Nom du Patient"} value={data.patientNames} exclamation={true} />
					<ItemsDetails title={"Hôpital"} value={session?.user?.data.names ?? session?.user?.data.name} exclamation={false} />
					<ItemsDetails title={"Montant envoyé"} value={new Intl.NumberFormat("en-US", {style: 'currency', currency: data.currency}).format(data.amount)} otherValue={new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(new Date())} />

					<div className='flex justify-center'>
						<button className='capitalize bg-orange w-fit  px-6 py-4 rounded-xl text-white flex gap-2 items-center effect-up shadow-md' onClick={() => setStep(step+1)}><MdPayments size={20}/> Procéder au paiment</button>
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