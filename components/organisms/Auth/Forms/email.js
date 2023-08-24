import React, { useContext, useState, useReducer } from 'react';
import { FormContextRegister } from '../RegisterForm';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { emailValidate } from '../../../../lib/validate';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { sendEmail } from '../../../../lib/helper';
import { useQueryClient, useMutation } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { setRegister } from '../../../../redux/reducer';
import Toast from '../../../atoms/Toast';
import * as yup from 'yup';

import LoadingButton from '../../../atoms/Loader/LoadingButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Image from 'next/image';

function Email() {
  const { activeStep, setActiveStep, handleComplete } =
    useContext(FormContextRegister);
  const [showPassword, setShowPassword] = useState(false);
  const [showcPassword, setShowcPassword] = useState(false);
  const [complete, setComplete] = useState(false);
  const [state, setState] = useState({ type: 0, message: '' });
  const client = useSelector((state) => state.app.client);
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowcPassword = () => setShowcPassword((show) => !show);

  const sendEmailMutation = useMutation(sendEmail, {
    onSuccess: (res) => {
      if (!res.code) {
        setState({ type: 1, message: 'Un mail vous a été envoyé' });
        setComplete(true);
      } else {
        setState({ type: 2, message: res.message ?? res.description });
        setTimeout(() => {
          setState({ type: 0, message: '' });
        }, 3000);
      }
    },
  });

  const onSubmit = async (values) => {
    if (Object.keys(values).length == 0) return console.log('Pas de données');
    //dispatch(setRegister({...values}))
    sendEmailMutation.mutate(values);
  };

  const closeToast = () => {
    setState({ type: 0, message: '' });
  };

  const ValidationSchema = yup.object().shape({
    email: yup.string().email().required('Le nom est un champ obligatoire'),
    password: yup.string().required('Mot de passe est un champ obligatoire'),
    confirm_password: yup
      .string()
      .required('Veuillez confirmer votre mot de passe')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: ValidationSchema,
    onSubmit,
  });

  const renderError = (message) => (
    <span className="flex items-center gap-1 text-rose-500 text-left text-xs px-1">
      <HiOutlineInformationCircle />
      <span>{message}</span>
    </span>
  );

  return (
    <>
      {state.type > 0 ? (
        state.type == 2 ? (
          <Toast type={'danger'} message={state.message} close={closeToast} />
        ) : state.type == 1 ? (
          <Toast type={'success'} message={state.message} close={closeToast} />
        ) : (
          <></>
        )
      ) : (
        <></>
      )}

      {!complete ? (
        <>
          <Box sx={{ mb: 2, mt: 2, textAlign: 'left' }}>
            <Typography color="primary" variant="body1">
              Entrez votre email
            </Typography>
          </Box>
          <form id="signupform" onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <div className="space-y-1">
                <TextField
                  id="outlined-basic"
                  fullWidth
                  label="Adresse email"
                  variant="outlined"
                  name="email"
                  {...formik.getFieldProps('email')}
                />
                {formik.errors.email && formik.touched.email ? (
                  renderError(formik.errors.email)
                ) : (
                  <></>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-basic1">
                    Mot de passe
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-basic1"
                    label="Mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    {...formik.getFieldProps('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {formik.errors.password && formik.touched.password ? (
                  renderError(formik.errors.password)
                ) : (
                  <></>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-basic2">
                    Confirmer le mot de passe
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-basic2"
                    label="Confirmer le mot de passe"
                    name="confirm_password"
                    type={showcPassword ? 'text' : 'password'}
                    {...formik.getFieldProps('confirm_password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowcPassword}
                          edge="end"
                        >
                          {showcPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {formik.errors.confirm_password &&
                formik.touched.confirm_password ? (
                  renderError(formik.errors.confirm_password)
                ) : (
                  <></>
                )}
              </div>

              <div className="form-button">
                <Button size="large" variant="contained" type="submit">
                  {sendEmailMutation.isLoading ? <LoadingButton /> : 'SUIVANT'}
                </Button>
              </div>
            </Stack>
          </form>
        </>
      ) : (
        <div className="flex flex-col gap-3 items-center mt-14">
          <Image
            src={'https://i.goopics.net/fuiyr8.png'}
            width={80}
            height={80}
            className="w-28 opacity-90"
          />
          <span className="text-xs text-gray-400 ">
            Un mail vous a été envoyé à votre adresse email, pour continuer
            l'inscription
          </span>
        </div>
      )}
    </>
  );
}

export default Email;
