import React, { useEffect } from "react";
import { createContext, useState } from "react";

import { StepLabel, Stack } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepConnector, {stepConnectorClasses} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";

import MenuHolder from "../../atoms/MenuHolder";
import BlinkSnackbar from "../../atoms/BlinkSnackbar";
import StepRegistration from "./StepRegistration";
import { useRouter } from "next/router";

export const FormContextRegister = createContext();

const steps = [
	"Votre adresse email",
	"Configuration du compte",
	"Logo & Image de l'établissement",
	"Personne qui engage la société"
];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 11,
		left: "calc(-50% + 12px)",
		right: "calc(50% + 12px)",
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundColor: theme.palette.primary.main,
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundColor: theme.palette.primary.main,
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 4,
		border: 0,
		backgroundColor:
			theme.palette.mode === "dark" ? theme.palette.grey[800] : "#f0f4fd",
		borderRadius: 1,
	},
}));

const RegisterForm = () => {
    const query = useRouter().query;

	const [activeStep, setActiveStep] = useState(0);
	const [completed, setCompleted] = useState({});
    const [formData, setFormData] = useState({});
	const [file, setFile] = useState(null);

	useEffect(() => {
		if(query["email-verification"]) {
			setCompleted({"0": true})
			setActiveStep(1)
		}
	}, [query["email-verification"]]);

	const totalSteps = () => {
		return steps.length;
	};

	const completedSteps = () => {
		return Object.keys(completed).length;
	};

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps();
	};

	const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? // It's the last step, but not all steps have been completed,
				// find the first step that has been completed
				steps.findIndex((step, i) => !(i in completed))
				: activeStep + 1;
		setActiveStep(newActiveStep);
	};

	const handleComplete = (values) => {
		const newCompleted = completed;
		newCompleted[activeStep] = true;
		setCompleted(newCompleted);

		handleNext();
	};

	return (
		<>
			<div className="form-holder">
				<MenuHolder href="/login" label="SIGN IN" />
				<div className="signin-signup-form">
					<Stack
						sx={{ mb: 2, mt: 2, width: "100%" }}
						justifyContent="center"
						alignItems="center"
					>
						<Stepper

							alternativeLabel
							className="w-full md:max-w-[600px]"
							activeStep={activeStep}
							connector={<ColorlibConnector />}
						>
							{steps.map((label, index) => (
								<Step key={label} completed={completed[index]}>
									<StepLabel color="inherit">
										{label}
									</StepLabel>
								</Step>
							))}
						</Stepper>
					</Stack>

					<div className="form-items">

						<FormContextRegister.Provider value={{ activeStep, setActiveStep, handleComplete, formData, setFormData, file, setFile }}>
							<StepRegistration />
						</FormContextRegister.Provider>

					</div>
				</div>
			</div>
			{/* <BlinkSnackbar /> */}
		</>
	);
}

export default RegisterForm;
