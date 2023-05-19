import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import * as yup from "yup";
import { sendSecurityCode } from '../../../lib/helper';
import LoadingButton from '../Loader/LoadingButton';

const SecurityCode = ({shorten}) => {
	const { data:session } = useSession();
	const [state, setState] = useState({type: 0, message: ""});

	console.log(session.user.data.access_token);

	const sendEmailMutation = useMutation(sendSecurityCode,  {
        onSuccess: (res) => {

            if(!res.code) {
                setState({type: 1, message: "Un mail vous a été envoyé"})
                setComplete(true)
            } else {
                setState({type: 2, message:res.message ?? res.description})
                setTimeout(() => {
                    setState({ type: 0, message: "" })
                }, 3000);
            };
        }
    });

	const ValidationSchema = yup.object().shape({
		securityCode: yup.string().required("Code de sécurité est requis").max(6, "6 caractère pour le code de sécurité"),
	});

	const onSubmit = async (values) => {
        if (Object.keys(values).length == 0) return console.log("Pas de données");
        //dispatch(setRegister({...values}))
        sendEmailMutation.mutate({...values, shortenHash: shorten, providerId: session.user.data.userId, accessToken: session.user.data.access_token})
    };

	const formik = useFormik({
        initialValues: {
            securityCode: ''
        },
        validationSchema: ValidationSchema,
        onSubmit
    })

	const renderError = (message) => (
		<p className="text-xs text-red-600 font-light flex items-center gap-1 px-1">{message}</p>
	);

    return (
        <div className='h-full flex justify-center items-center pb-40'>
				<div className="w-full  mx-auto max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-sm rounded-xl space-y-8 mt-2">

					<h1 className='text-center font-semibold text-xl text-gray-700'>Entrez le code de sécurité</h1>

					<div className='space-y-3'>
						<div className="flex flex-col gap-2 w-full">

							<form className="flex flex-col w-full justify-between items-center gap-3" onSubmit={formik.handleSubmit} id='form-security'>

								<TextField
									fullWidth
									name="securityCode"
									label="Entrez le code de sécurité"
									variant="outlined"
									placeholder={"Entrez le code de sécurité"}
									className="w-full placeholder:text-gray-400 hover:outline-none focus:ring-0 border border-gray-300 rounded-lg focus:ring-sky"
									{...formik.getFieldProps('securityCode')}
								/>
                            	
								{formik.errors.securityCode ?  renderError(formik.errors.securityCode): <></>}

							</form>
						</div>

						<div className="flex flex-row-reverse gap-4">
							<button className="bg-orange text-md py-2 px-4 rounded-lg effect-up text-white" type='submit' form='form-security'>
								{sendEmailMutation.isLoading ? <LoadingButton /> : 'Envoyer'}
							</button>
						</div>
					</div>
				</div>
			</div>
    );
}

export default SecurityCode;
