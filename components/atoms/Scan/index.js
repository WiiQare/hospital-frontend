import React, { createContext, createRef, useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Transition } from '@headlessui/react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ScanDetails from './details';
import SecurityCode from './security';
import { BiTrashAlt } from 'react-icons/bi';
import { useSession } from 'next-auth/react';
import Fetcher from '../../../lib/Fetcher';
export const StepContext = createContext();

const Scan = () => {
  const [data, setData] = useState(null);
  const [step, setStep] = useState(-1);
  const [value, setValue] = useState(0);
  const [services, setServices] = useState([]);
  const [total, setTotal] = useState(0);
  const { data: session } = useSession();
  const {
    data: result,
    isLoading,
    isError,
  } = Fetcher(
    `/provider/${session.user.data.providerId}/service`,
    session.accessToken,
  );

  const country = () => {
    var numeroTelephone = session.user.data.phoneNumber;

    // Expression régulière pour récupérer le code de pays
    var regexCodePays = /^\+(\d{3})/;

    // Recherche du code de pays dans le numéro de téléphone
    var match = numeroTelephone.match(regexCodePays);

    // Vérification si le code de pays a été trouvé
    if (match && match[1]) {
      return match[1] == '243' ? 'cd' : match[1] == '237' ? 'cm' : null;
    } else {
      return null
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleStep = (result = null) => {
    console.log('QR HANDLE STEP '+step );
    setStep(step + 1);

    if ( data === null && result) {
      console.log('THIS SHOULD ONLY BE ONCE');
      setData(result && result.slice(0, 8));
    }
  };

  const onSubmit = async (values) => {
    if (Object.keys(values).length == 0) return console.log('Pas de données');

    formik.errors = {};

    let exist = services.indexOf(values.service);

    if (exist == -1) {
      setServices([...services, values.service]);

      setTotal(total + parseFloat(values.service.price));
    } else {
      formik.errors.service = 'Déjà ajouté !';
    }
  };

  const ValidationSchema = new yup.object().shape({
    service: new yup.ObjectSchema().required('Sélectionnez un service...'),
  });

  const removeFromList = (delValue, amount) => {
    let newList = services.filter((arr) => arr.name !== delValue);

    setServices(newList);
    setTotal(total - amount);
  };

  const formik = useFormik({
    initialValues: {
      service: '',
    },
    validationSchema: ValidationSchema,
    onSubmit,
  });

  const renderError = (message) => (
    <p className="text-xs text-red-600 font-light flex items-center gap-1 px-1">
      {message}
    </p>
  );

  useEffect( () => {
    console.log( 'STEP', step );
  }, [step ]);

  if (step === -1)
    return (
      <>
        {isLoading ? (
          <>Loading...</>
        ) : (
          <div className="flex justify-center flex-col gap-6 h-full items-center mx-auto py-4 md:py-10 mb-20">
            <div className="md:w-1/3 sm:w-2/3 w-full bg-white rounded-xl p-8 min-h-fit shadow-sm">
              <form
                className="flex flex-col gap-4"
                id="form-service"
                onSubmit={formik.handleSubmit}
              >
                <div className="w-full flex flex-col gap-2">
                  <p>Ajoutez un nouveau soin</p>
                  <FormControl fullWidth>
                    <Autocomplete
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Service"
                      options={result}
                      getOptionLabel={(result) => result.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choisissez un service"
                          name="service"
                        />
                      )}
                      onChange={(e, value) =>
                        formik.setFieldValue('service', value)
                      }
                    />
                  </FormControl>
                  {formik.errors.service && formik.touched.service ? (
                    renderError(formik.errors.service)
                  ) : (
                    <></>
                  )}
                </div>

                <div className="flex flex-row-reverse gap-4">
                  <button
                    className="border text-orange border-orange text-sm py-2 px-4 rounded-lg"
                    type="submit"
                    form="form-service"
                  >
                    + Ajouter
                  </button>
                </div>
              </form>

              <div className={`mt-3 border-t py-2 space-y-4`}>
                {services.length > 0 ? (
                  <>
                    <div
                      className={`${
                        services.length > 0 ? 'border-b py-2 space-y-6' : ''
                      }`}
                    >
                      {services.map((service) => (
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {service.name}
                          </p>
                          <p className="font-normal text-sm text-gray-600 flex gap-2 items-center">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: country == 'cd' ? "CDF" : "XOF",
                            }).format(service.price)}
                            <BiTrashAlt
                              size={17}
                              className="text-red-500 cursor-pointer"
                              title={`Supprimer ${service.name}`}
                              onClick={() =>
                                removeFromList(service.name, service.price)
                              }
                            />
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-10 flex-row-reverse">
                      <p className="text-xl font-semibold text-gray-900">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: country == 'cd' ? "CDF" : "XOF",
                        }).format(total)}
                      </p>
                      <p className="text-lg font-medium text-gray-600">Total</p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-4 my-4 items-center justify-center">
                    <img
                      src="https://i.goopics.net/vwmjvq.png"
                      alt="empty list"
                      className="opacity-60 w-16"
                    />
                    <span className="text-sm text-gray-500">
                      Pas de service choisi...
                    </span>
                  </div>
                )}

                <div className="flex w-full gap-4">
                  <button
                    className="bg-orange shadow-md text-md py-3 w-full px-4 rounded-lg effect-up text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                    form="form-all-service"
                    onClick={() => setStep(0)}
                    disabled={services.length > 0 ? false : true}
                  >
                    Définir comme traitement
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );

  if (step === 0)
    return (
      <Transition
        appear
        show={true}
        as={'div'}
        className="flex justify-center flex-col gap-6 h-full items-center mx-auto py-4 md:py-10"
      >
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className={'md:w-1/2 w-3/4 bg-white rounded-xl px-10 py-8 min-h-fit'}
        >
          <TabsModal value={value} handleChange={handleChange} />

          <TabItems value={value} handleStep={handleStep} />
        </Transition.Child>
      </Transition>
    );

  if (step === 1)
    return (
      <StepContext.Provider value={{ step, setStep, total, services }}>
        <ScanDetails shorten={data} country={country == 'cd' ? "CDF" : "XOF"} />
      </StepContext.Provider>
    );

  if (step === 2)
    return (
      <StepContext.Provider value={{ step, setStep, total, services }}>
        <SecurityCode shorten={data} />
      </StepContext.Provider>
    );

  return <>Complete</>;
};

export default Scan;

function TabsModal({ value, handleChange }) {
  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={'Scan QR Code'} {...a11yProps(0)} key={0} />
          <Tab label={'Saisir Pass Santé'} {...a11yProps(1)} key={1} />
        </Tabs>
      </Box>
    </div>
  );
}

function TabItems({ value, handleStep }) {
  const scannedRef = createRef( null );
  const onSubmit = async (values) => {
    if (Object.keys(values).length == 0) return console.log('Pas de données');

    console.log('submit', values);
    handleStep(values.pass);
  };

  const ValidationSchema = yup.object().shape({
    pass: yup.string().required('Pass Santé est requis'),
  });

  const formik = useFormik({
    initialValues: {
      pass: '',
    },
    validationSchema: ValidationSchema,
    onSubmit,
  });

  const renderError = (message) => (
    <p className="text-xs text-red-600 font-light flex items-center gap-1 px-1">
      {message}
    </p>
  );

  return (
    <div className="mt-2">
      <div className="text-sm text-gray-500">
        {/* For Scan */}
        <TabPanel value={value} index={0}>
          <div className="mt-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold md:text-gray-700">
                Scan QR Code
              </h3>
              <p className="text-sm font-light text-gray-500">
                Accorder la demande d'allumer la caméra
              </p>
            </div>
            <div className="">
              { scannedRef.current == null && <QrReader
                tracker={false}
                scanDelay={500}
                onResult={(result, error) => {
                  if (!!result) {
                    if( scannedRef.current == null ){
                      scannedRef.current = result.text;
                      handleStep(result.text);
                    }
                    
                  }

                  if (!!error) {
                    console.log(error);
                  }
                }}
                constraints={{ facingMode: 'environment' }}
                style={{ width: '100%' }}
              />}
            </div>
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <div className="space-y-8 py-10 px-20">
            <form id="signupform" onSubmit={formik.handleSubmit}>
              <Stack spacing={2}>
                <div className="space-y-1">
                  <TextField
                    id="outlined-basic"
                    fullWidth
                    label="Entrez le code Pass Santé"
                    variant="outlined"
                    name="pass"
                    {...formik.getFieldProps('pass')}
                  />
                  {formik.errors.pass && formik.touched.pass ? (
                    renderError(formik.errors.pass)
                  ) : (
                    <></>
                  )}
                </div>

                <div className="form-button flex flex-row-reverse">
                  <Button size="medium" variant="contained" type="submit">
                    Soumettre
                  </Button>
                </div>
              </Stack>
            </form>
          </div>
        </TabPanel>
      </div>
    </div>
  );
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
