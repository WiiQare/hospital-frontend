import React, { useContext } from "react";
import Email from "./Forms/email";
import Information from "./Forms/informations";
import PersonnalInformation from "./Forms/personalInformations";
import Otp from "./Forms/otp";
import { FormContextRegister } from "./RegisterForm";
import Images from "./Forms/images";

function StepRegistration() {

  const { activeStep } = useContext(FormContextRegister);
  let stepContent;
  console.log(activeStep);

  switch (activeStep) {
    case 0:
      stepContent = <Email />;
      break;

    case 1:
      stepContent = <Information />;
      break;

    case 2:
      stepContent = <Images />;
      break;

    case 3:
      stepContent = <PersonnalInformation />;
      break;

    default:
      break;
  }

  return stepContent;
}

export default StepRegistration;
