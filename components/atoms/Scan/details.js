import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import Fetcher from '../../../lib/Fetcher';
import { BiTransferAlt } from 'react-icons/bi';
import CopyToClipboard from 'react-copy-to-clipboard';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { MdPayments } from 'react-icons/md';


const ScanDetails = ({shorten, handleStep}) => {

	const { data:session } = useSession();
	const [copy, setCopy] = useState(false);

    const {data, isLoading, isError} = Fetcher(`/provider/provider-voucher-details?shortenHash=${shorten}`, session.user.data.access_token);

    console.log(data);

    const SliceText = ({ text }) => {
		return <>{text.slice(0, 9)}...{text.slice(-8)}</>
	}

    if (isLoading) return <p>Loading...</p>

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
						<img className="inline-block h-[2.875rem] w-[2.875rem] rounded-full ring-2 ring-white dark:ring-gray-800" src="/images/femme.png" alt="Image Description" />
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

					<ItemsDetails title={"Hôpital"} value={session?.user?.data.names ?? session?.user?.data.name} otherValue={session?.user?.data.email} exclamation={false} />
					<ItemsDetails title={"Nom du Patient"} value={data.patientNames} exclamation={true} />
					<ItemsDetails title={"Montant envoyé"} value={new Intl.NumberFormat("en-US", {style: 'currency', currency: data.currency}).format(data.amount)} otherValue={new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full' }).format(new Date())} />

					<div className='flex justify-center'>
						<button className='capitalize bg-orange w-fit  px-6 py-4 rounded-xl text-white flex gap-2 items-center effect-up shadow-md' onClick={handleStep}><MdPayments size={20}/> Procéder au paiment</button>
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