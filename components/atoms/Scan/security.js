import { TextField } from '@mui/material';
import React from 'react';

const SecurityCode = () => {
    return (
        <div className='h-full flex justify-center items-center pb-40'>
				<div className="w-full  mx-auto max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-sm rounded-xl space-y-8 mt-2">

					<h1 className='text-center font-semibold text-xl text-gray-700'>Entrez le code de sécurité</h1>

					<div className='space-y-3'>
						<div className="flex flex-col gap-2 w-full">

							<form className="flex w-full justify-between items-center gap-3">

								<TextField
									fullWidth
									name="securityCode"
									label="Entrez le code de sécurité"
									onChange={(event) => null}
									variant="outlined"
									placeholder={"Entrez le code de sécurité"}
									className="w-full placeholder:text-gray-400 hover:outline-none focus:ring-0 border border-gray-300 rounded-lg focus:ring-sky"
								/>

							</form>
						</div>

						<div className="flex flex-row-reverse gap-4">
							<button className="bg-orange text-md py-2 px-4 rounded-lg effect-up text-white" onClick={() => null}>
								Envoyer
							</button>
						</div>
					</div>
				</div>
			</div>
    );
}

export default SecurityCode;
