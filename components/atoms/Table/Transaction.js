import React, { useContext, useEffect, useState } from "react";
import Fetcher from "../../../lib/Fetcher";
import { TableContext } from "../../organisms/Transaction";
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'IDENTITÉ PATIENT',
        selector: row => (
			<>
				<div className="flex items-center space-x-3 cursor-pointer">
					<div className="avatar w-12 h-12">
						<div className="mask mask-squircle w-full h-full">
							<img
								src={`https://ui-avatars.com/api/?uppercase=true&background=CCC&name=${row.voucher.patientId}&bold=true&color=FFF`}
								className="w-40 h-40"
								alt="Avatar Tailwind CSS Component"
							/>
						</div>
					</div>
					<div>
						<div className="font-bold">{row.voucher.patientId}</div>
						<div className="text-sm opacity-50">United States</div>
					</div>
				</div>
			</>
		),
    },
    {
        name: 'MONTANT',
        selector: row => (
			<>
				{new Intl.NumberFormat("en-US", { style: 'currency', currency: row.voucher.currency }).format(row.amount)}
				<br />
				<span className="badge badge-ghost badge-sm">
					{new Intl.DateTimeFormat('fr-FR', { timeStyle: "short", dateStyle: "long" }).format(new Date(row.createdAt))}
				</span>
			</>
		)
    },
	{
        name: 'STATUS',
        selector: row => (
			<>
				{
					row.status == "UNCLAIMED" ? (
						<>
							<span class="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
								<span class="w-1.5 h-1.5 inline-block bg-indigo-400 rounded-full"></span>
								Non-reclamé
							</span>
						</>
					) : row.status == "PENDING" ? (
						<>
							<span class="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
								<span class="w-1.5 h-1.5 inline-block bg-amber-400 rounded-full"></span>
								Traitement en cours
							</span>
						</>
					): (
						<>
							<span class="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-100 text-green-800">
								<span class="w-1.5 h-1.5 inline-block bg-green-400 rounded-full"></span>
								Transmis avec succès
							</span>
						</>
					) 
				}
			</>
		),
    },
	{
        name: 'HASH',
        selector: row => (<button className="btn btn-xs !lowercase">{row.shortenHash}</button>),
    },
];

export default function TransactionTable() {
	const { selected, setSelected, isChecked, setIsChecked, session } = useContext(TableContext);

	const { data, isLoading, isError } = Fetcher(`/provider/transactions?providerId=${session.user.data.providerId}`, session.accessToken);

	const handleChange = async ({ selectedRows }) => {
		setSelected([])
		selectedRows.map(item => setSelected([...selected, item.transactionHash]))
	};

	return (
		<div className="border rounded-lg overflow-x-auto w-full">
			{
				isLoading ? (<>Loading</>) : (
					<>
						<DataTable
							columns={columns}
							data={data}
							pagination
							title="Historique des transactions"
							selectableRows
							onSelectedRowsChange={handleChange}
							persistTableHead
							selectableRowDisabled={row => row.status !== "UNCLAIMED"}
						/>
					</>
				)
			}
		</div>
	);
}