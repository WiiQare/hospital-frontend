import { createContext, useState } from "react";
import { CiCircleList } from "react-icons/ci";
import CardHeader from "../../atoms/Card/Header";
import TransactionTable from "../../atoms/Table/Transaction";
import Swal from 'sweetalert2';
export const TableContext = createContext();

const Transaction = () => {

	const [selected, setSelected] = useState([]);
	const [isChecked, setIsChecked] = useState(false);

	const handleClick = () => {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
			  confirmButton: 'bg-orange ml-6 py-3 px-4 rounded-lg uppercase font-semibold text-white',
			  cancelButton: 'btn btn-danger',
			  text: 'text-xs'
			},
			buttonsStyling: false
		  })
		  
		  swalWithBootstrapButtons.fire({
			title: 'Etes-vous sûr ?',
			text: "Votre demande de retrait de fond sera envoyé et traité sous peu par l'équipe WiiQare",
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Oui, je suis sûr',
			cancelButtonText: 'Non, annuler',
			reverseButtons: true
		  }).then((result) => {
			if (result.isConfirmed) {
			  console.log("Okay");
			} else if (
			  /* Read more about handling dismissals below */
			  result.dismiss === Swal.DismissReason.cancel
			) {
			  swalWithBootstrapButtons.fire(
				'Annuler',
				'Une prochaine fois peut-être',
				'warning'
			  )
			}
		  })	
	  };

	return (
		<div className="p-2 space-y-6 md:py-8 md:px-6 mb-20">
			<CardHeader
				title={"Historique de Transactions"}
				
				filter={{
					label: {
						title: "Trier par",
						className: "py-1 w-[auto]"
					},
					className: "w-[auto]",
					icon: () => <CiCircleList />,
					items: ["Tous", "Pass non-réclamé", "Montant remboursé"]
				}}
				added={selected.length > 0 ? true : false}
				titleAdd={"Reclamer remboursement"}
				addClick={() => handleClick()}
				download={false}
			/>
			<TableContext.Provider value={{selected, setSelected, isChecked, setIsChecked}}>
				<TransactionTable />
			</TableContext.Provider>
		</div>
	);
};

export default Transaction;
