import { CiSquarePlus } from "react-icons/ci";
import CardHeader from "../../atoms/Card/Header";
import { Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, TextareaAutosize } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "react-query";
import LoadingButton from "../../atoms/Loader/LoadingButton";
import { addService } from "../../../lib/helper";
import { useSession } from "next-auth/react";
import Toast from "../../atoms/Toast";
import DataTable from 'react-data-table-component';
import Fetcher from "../../../lib/Fetcher";

const columns = [
    {
        name: 'NOM DU SERVICE',
        selector: row => (
            <span className="font-semibold text-md">
                {row.name}
            </span>
        ),
        sortable: true,
    },
    {
        name: 'MONTANT',
        selector: row => (
            <div className="py-8 space-y-2">
                {new Intl.NumberFormat("en-US", { style: 'currency', currency: "CDF" }).format(row.price)}
                <br />
                <span className="badge badge-ghost badge-sm">
                    {new Intl.DateTimeFormat('fr-FR', { timeStyle: "short", dateStyle: "long" }).format(new Date(row.createdAt))}
                </span>
            </div>
        ),
        sortable: true,
    },
    {
        name: 'DESCRIPTION',
        selector: row => (
            <>
                {row.description}
            </>
        ),
        sortable: true,
    }
];

const Service = () => {

    const { data } = useSession();
    let [isOpen, setIsOpen] = useState(false)
    const [state, setState] = useState({ type: 0, message: '' });
    const [selected, setSelected] = useState([]);

    const { data: result, isLoading, isError } = Fetcher(`/provider/${data.user.data.providerId}/service`, data.accessToken);


    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const newServiceMutation = useMutation(addService, {
        onSuccess: (res) => {

            if (res.code) {
                setState({ type: 2, message: res.message ?? res.description })
                setTimeout(() => {
                    setState({ type: 0, message: "" })
                }, 3000);

            } else {
                setState({ type: 1, message: "Service ajouté avec succès..." });
                formik.handleReset()
                setTimeout(() => {
                    closeModal();
                    setState({ type: 0, message: "" })
                }, 3000);

            };
        }
    });

    const onSubmit = async (values) => {
        if (Object.keys(values).length == 0) return console.log("Pas de données");

        if (parseInt(values.price) == NaN) {
            setState({ type: 2, message: "Le prix doit être numérique" })
            setTimeout(() => {
                setState({ type: 0, message: "" })
            }, 3000);

            return null
        }

        values.price = parseInt(values.price)
        newServiceMutation.mutate({ ...values, providerId: data.user.data.providerId, accessToken: data.accessToken })

    };

    const ValidationSchema = yup.object().shape({
        name: yup.string().required("Nom du service est requis"),
        description: yup.string(),
        price: yup.number("Le prix doit être numérique").required("Le prix est requis"),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: ''
        },
        validationSchema: ValidationSchema,
        onSubmit
    })

    const closeToast = () => {
        setState({ type: 0, message: "" })
    }

    const renderError = (message) => (
        <p className="text-xs text-red-600 font-light flex items-center gap-1 px-1">{message}</p>
    );

    const handleChange = async ({ selectedRows }) => {
        setSelected([])
        selectedRows.map(item => setSelected([...selected, item.transactionHash]))
    };

    return (
        <div className="p-2 space-y-6 md:py-8 md:px-6 mb-20">
            <CardHeader
                title={"Nos services"}
                download={false}
                added={true}
                titleAdd={"Nouveau Service"}
                addClick={() => openModal()}
            />

            <div className="border rounded-lg overflow-x-auto w-full relative">
                {
                    isLoading ? (<>Loading...</>) : (
                        <>

                            {result.length > 0 ? (
                                <>
                                    <DataTable
                                        columns={columns}
                                        data={result}
                                        fixedHeader
                                        className="px-8 bg-white"
                                        paginationPerPage={20}
                                        paginationTotalRows={false}
                                        pagination
                                        title="Liste des services"
                                        selectableRows
                                        onSelectedRowsChange={handleChange}
                                        persistTableHead
                                        paginationComponentOptions={{
                                            rowsPerPageText: "Ligne par page",
                                            rangeSeparatorText: 'de',
                                            selectAllRowsItem: true,
                                            selectAllRowsItemText: 'Voir tous',
                                        }}
                                    />


                                    {selected.length > 0 ? (
                                        <div className="absolute bottom-2 px-10">
                                            <button className=" bg-orange text-xs md:text-sm py-2 px-4 rounded-lg effect-up text-white shadow" onClick={() => alert(`Création d'un package avec ${selected.length} services`)}>+ Créer un package</button>
                                        </div>
                                    ) : <></>}


                                </>
                            ) : (

                                <div className="py-10 mx-auto w-1/2 flex flex-col justify-center items-center gap-4">
                                    <div className="flex justify-center items-center">
                                        <img src="/images/service.png" alt="" className="w-40 opacity-80 object-cover" />
                                    </div>

                                    <p className="text-gray-500 text-sm">Aucun service actuellement ajouté...</p>
                                    <button onClick={() => openModal()} className='bg-orange text-white text-sm px-3 py-2.5 rounded-lg effect-up shadow-sm font-medium flex'>
                                        <CiSquarePlus className="mr-2 h-5 w-5" />
                                        Ajouter
                                    </button>
                                </div>
                            )}

                        </>
                    )
                }
            </div>




            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                        <div className="fixed inset-0 overflow-y-auto">
                            {state.type > 0 ? state.type == 2 ? <Toast type={"danger"} message={state.message} close={closeToast} /> : (state.type == 1 ? <Toast type={"success"} message={state.message} close={closeToast} /> : <></>) : <></>}

                            <div className="flex items-center justify-center min-h-full p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >

                                    <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl space-y-10">
                                        <Dialog.Title as="div" className="flex justify-between items-center mb-4">
                                            <h3 className="text-md font-semibold leading-6 text-gray-900">
                                                Ajouter un service
                                            </h3>

                                        </Dialog.Title>

                                        <form className="flex w-full  gap-4 flex-col" onSubmit={formik.handleSubmit}>
                                            <div className="flex flex-col gap-1">
                                                <TextField
                                                    fullWidth
                                                    type={"text"}
                                                    className=" placeholder:text-gray-400 hover:outline-none focus:ring-0 border border-gray-300 rounded-lg focus:ring-sky"
                                                    label="Nom du service"
                                                    placeholder="Entrez nom du service"
                                                    name="name"
                                                    variant="outlined"
                                                    {...formik.getFieldProps('name')}
                                                />

                                                {formik.errors.name && formik.touched.name ? renderError(formik.errors.name) : <></>}

                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <FormControl fullWidth>
                                                    <InputLabel htmlFor="outlined-adornment-amount">Prix (en $)</InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-amount"
                                                        type="number"
                                                        name="price"
                                                        onChange={(e) => formik.setFieldValue("price", e.target.value)}
                                                        startAdornment={<InputAdornment position="start">CDF</InputAdornment>}
                                                        label="Prix (en $)"
                                                    />
                                                </FormControl>

                                                {formik.errors.price && formik.touched.price ? renderError(formik.errors.price) : <></>}

                                            </div>

                                            <div className="flex flex-col gap-1">

                                                <TextField
                                                    fullWidth
                                                    type={"description"}
                                                    multiline
                                                    className=" placeholder:text-gray-400 hover:outline-none focus:ring-0 border border-gray-300 rounded-lg focus:ring-sky"
                                                    label="Description"
                                                    placeholder="Description"
                                                    name="description"
                                                    variant="outlined"
                                                    rows={4}
                                                    {...formik.getFieldProps('description')}
                                                />
                                                {formik.errors.description && formik.touched.description ? renderError(formik.errors.description) : <></>}
                                            </div>


                                            <div className="flex flex-row-reverse gap-4">
                                                <button className=" bg-orange text-sm py-2 px-4 rounded-lg effect-up text-white" type="submit">
                                                    {newServiceMutation.isLoading ? <LoadingButton /> : '+ Ajouter'}
                                                </button>

                                            </div>
                                        </form>

                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default Service;