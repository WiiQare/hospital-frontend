import Image from 'next/image';
import CardHeader from '../../atoms/Card/Header';
import { BiCamera } from 'react-icons/bi';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { SWRConfig } from 'swr';
import Fetcher from '../../../lib/Fetcher';
import { useSession } from 'next-auth/react';

import MuiPhoneNumber from 'material-ui-phone-number';

const TabHistories = [
  {
    name: 'À propos',
  },

  {
    name: 'Établissement',
  },
  {
    name: 'Personne à contacter',
  },
];

const Profile = () => {
  const { data } = useSession();
  const [value, setValue] = useState(0);

  console.log(data);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="p-2 space-y-6 md:py-8 md:px-6 mb-20">
      <CardHeader
        title={'My Profile'}
        breadcrumbs={[
          {
            item: 'Home',
            link: '/',
          },
          {
            item: data.user.data.names,
            link: '/profile',
          },
        ]}
        download={false}
        print={false}
      />

      <section className="w-full flex flex-col gap-8 items-start pb-20 md:pb-0">
        <div className="w-full overflow-hidden md:col-span-2 rounded-lg p-4 flex flex-col gap-6 bg-white drop-shadow-sm">
          <div
            before={'+ Cliquez pour changer de couverture'}
            className="bg-[url(https://i.goopics.net/46v87b.jpg)] bg-no-repeat relative bg-cover h-56 rounded-lg hover:before:bg-[rgba(0,0,0,.5)] hover:before:cursor-pointer before:transition-all before:duration-200 content before:w-full before:h-full overflow-hidden before:absolute hover:before:content-[attr(before)] before:flex before:justify-center before:items-center before:text-gray-200"
          ></div>

          <div className="flex justify-between items-center md:px-6">
            <div className="flex gap-5 items-center relative">
              <div className="w-20 h-20">
                <img
                  src={`https://ui-avatars.com/api/?uppercase=true&background=FE8023&name=${data.user.data.names}&bold=true&color=FFF`}
                  width={80}
                  height={80}
                  className="object-cover rounded-full h-full w-full"
                />
              </div>

              <div className="">
                <h1 className="text-sky font-bold text-xl">
                  {data.user.data.names}
                </h1>
                <span className="text-xs">{data.user.data.email}</span>
              </div>
            </div>

            <div>
              <button
                htmlFor="avatar"
                className="bg-[rgb(29,170,230,.6)] p-2 border-2 border-sky rounded-md text-white hover:bg-[rgb(29,170,230,.8)] w-fit"
              >
                <BiCamera size={22} />
              </button>

              <input type="file" name="" id="avatar" className="hidden" />
            </div>
          </div>
        </div>

        <div className="md:w-3/4 w-full">
          <div className="min-full md:col-span-3 rounded-lg p-4 flex flex-col gap-4 bg-white drop-shadow-sm">
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  {TabHistories.map((item, index) => (
                    <Tab label={item.name} {...a11yProps(index)} key={index} />
                  ))}
                </Tabs>
              </Box>

              <div className="min-w-full">
                <SWRConfig>
                  {TabHistories.map((item, index) => (
                    <TabPanelContent
                      value={value}
                      index={index}
                      data={data.user.data}
                    />
                  ))}
                </SWRConfig>
              </div>
            </Box>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;

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
        <Box sx={{ p: 3 }}>
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

function TabPanelContent({ value, index, data }) {
  return (
    <TabPanel value={value} index={index}>
      {index == 0 ? (
        <About data={data} />
      ) : index == 1 ? (
        <Settings data={data} />
      ) : (
        <PersonContact />
      )}
    </TabPanel>
  );
}

function About({ data }) {
  return (
    <section className="space-y-8">
      <h2 className="text-sky font-semibold">Informations de l'entreprise</h2>

      <div className="md:w-3/6 space-y-4">
        <div className="grid grid-cols-2">
          <h5 className="font-semibold">Name :</h5>
          <span className="text-gray-500">{data.names}</span>
        </div>

        <div className="grid grid-cols-2">
          <h5 className="font-semibold">Email :</h5>
          <span className="text-gray-500">{data.email}</span>
        </div>

        <div className="grid grid-cols-2">
          <h5 className="font-semibold">Phone Number :</h5>
          <span className="text-gray-500">{data.phoneNumber}</span>
        </div>

        <div className="grid grid-cols-2">
          <h5 className="font-semibold">Address :</h5>
          <span className="text-gray-500">---</span>
        </div>
      </div>
    </section>
  );
}

function Settings({ data }) {
  const [state, setState] = useState('');

  const handleState = (event) => {
    setState(event.target.value);
  };
  return (
    <section className="space-y-8">
      <h2 className="text-sky font-semibold">Identité de l'établissement</h2>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type Business</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Type Business"
        >
          <MenuItem value={'CLINIC'}>Clinique</MenuItem>
          <MenuItem value={'PHARMACY'}>Pharmacie</MenuItem>
          <MenuItem value={'HOSPITAL'}>Hôpital</MenuItem>
          <MenuItem value={'DENTIST'}>Dentiste</MenuItem>
          <MenuItem value={'MEDICAL_CABINET'}>Cabinet Medical</MenuItem>
        </Select>
      </FormControl>
      <div className="flex md:grid md:grid-cols-2 gap-8">
        <TextField
          fullWidth
          type={'email'}
          className="placeholder:text-gray-400 hover:outline-none focus:ring-0 border border-gray-300 rounded-lg focus:ring-sky"
          label="Email Address"
          placeholder="Email Address"
          name="email"
          variant="outlined"
          defaultValue={data.email}
          value={data.email}
        />

        <TextField
          fullWidth
          type={'text'}
          className="placeholder:text-gray-400 hover:outline-none focus:ring-0 border border-gray-300 rounded-lg focus:ring-sky"
          label="Nom de l'établissement"
          name="password"
          placeholder="Nom de l'établissement"
          variant="outlined"
          defaultValue={data.names}
          value={data.names}
        />
      </div>

      <div className="">
        <TextField
          fullWidth
          type={'text'}
          className="placeholder:text-gray-400 hover:outline-none focus:ring-0 border border-gray-300 rounded-lg focus:ring-sky"
          label="Adress"
          placeholder="123 Main Street"
          name="email"
          variant="outlined"
        />
      </div>

      <div className="flex md:grid md:grid-cols-2 gap-8">
        <div className="">
          <TextField
            fullWidth
            type={'text'}
            className="placeholder:text-gray-400 hover:outline-none focus:ring-0 border border-gray-300 rounded-lg focus:ring-sky"
            label="Ville"
            placeholder="Ville"
            name="city"
            variant="outlined"
          />
        </div>

        <div className="">
          <TextField
            fullWidth
            type={'text'}
            className="placeholder:text-gray-400 hover:outline-none focus:ring-0 border border-gray-300 rounded-lg focus:ring-sky"
            label="Code Postal"
            placeholder="Code Postal"
            name="postalCode"
            variant="outlined"
          />
        </div>
      </div>

      <div className="flex md:grid md:grid-cols-2 gap-8">
        <div className="">
          <TextField
            fullWidth
            type={'text'}
            className="placeholder:text-gray-400 hover:outline-none focus:ring-0 border border-gray-300 rounded-lg focus:ring-sky"
            label="ID. Nat"
            placeholder="ID. Nat"
            name="idNat"
            variant="outlined"
          />
        </div>

        <div className="">
          <TextField
            fullWidth
            type={'text'}
            className="placeholder:text-gray-400 hover:outline-none focus:ring-0 border border-gray-300 rounded-lg focus:ring-sky"
            label="RCCM"
            placeholder="RCCM"
            name="rccm"
            variant="outlined"
          />
        </div>
      </div>

      <div className="flex flex-row-reverse">
        <button className="bg-sky effect-up py-3 px-6 font-semibold text-white rounded-lg">
          Mettre à jour
        </button>
      </div>
    </section>
  );
}

function PersonContact() {
  return (
    <section className="space-y-8">
      <h2 className="text-sky font-semibold">
        Identité de la personne qui engage la société
      </h2>

      <div className="flex md:grid md:grid-cols-2 gap-8">
        <TextField
          fullWidth
          type={'text'}
          className="placeholder:text-gray-400 hover:outline-none focus:ring-0 border border-gray-300 rounded-lg focus:ring-sky"
          label="Prénom"
          placeholder="Prénom"
          name="firstName"
          variant="outlined"
        />

        <TextField
          fullWidth
          type={'text'}
          className="placeholder:text-gray-400 hover:outline-none focus:ring-0 border border-gray-300 rounded-lg focus:ring-sky"
          label="Nom"
          name="lastName"
          placeholder="Nom"
          variant="outlined"
        />
      </div>

      <div className="">
        <TextField
          fullWidth
          type={'email'}
          className="placeholder:text-gray-400 hover:outline-none focus:ring-0 border border-gray-300 rounded-lg focus:ring-sky"
          label="Adresse email"
          placeholder="Adresse email"
          name="email"
          variant="outlined"
        />
      </div>

      <div className="">
        <TextField
          fullWidth
          type={'text'}
          className="placeholder:text-gray-400 hover:outline-none focus:ring-0 border border-gray-300 rounded-lg focus:ring-sky"
          label="Adresse physique"
          placeholder="Adresse physique"
          name="address"
          variant="outlined"
        />
      </div>

      <div className="flex flex-col gap-1">
        <MuiPhoneNumber
          fullWidth
          label="N° Téléphone personnel"
          variant="outlined"
          defaultCountry={'cd'}
          name="contactPersonPhone"
        />
      </div>

      <div className="flex flex-row-reverse">
        <button className="bg-sky effect-up py-3 px-6 font-semibold text-white rounded-lg">
          Mettre à jour
        </button>
      </div>
    </section>
  );
}
