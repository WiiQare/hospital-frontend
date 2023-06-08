import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Fetcher from "../../../lib/Fetcher";
import { TableContext } from "../../organisms/Transaction";

export default function TransactionTable() {
	const { selected, setSelected, isChecked, setIsChecked, session } = useContext(TableContext);

	const { data, isLoading, isError } = Fetcher(`/provider/transactions?providerId=${session.user.data.providerId}`, session.accessToken);

	const selectItem = (id) => {
		setSelected([...selected, id])

	}

	const selectAllItem = () => {
		let temp = []
		setIsChecked(true)
		setSelected(temp)
		data.map(item => item.status !== "UNCLAIMED" && setSelected([...selected, item.transactionHash]))
	}

	const unselectAllItem = () => {
		let temp = [];
		setSelected(temp)
		setIsChecked(false)
	}

	const unselectItem = (id) => {

		let temp = selected;
		temp.splice(temp.indexOf(id), 1);

		setSelected(temp)
		setIsChecked(false)
	}

	useEffect(() => {
		if (selected.length === data?.length) {
			setIsChecked(true);
		} else {
			setIsChecked(false);
		}
	}, [selected.length, data]);

	return (
		<div className="border rounded-lg overflow-x-auto w-full">
			{
				isLoading ? (<>Loading</>) : (
					<>
						<table className=" table w-full">
							<thead>
								<tr>
									<th className="bg-white">
										<label>
											<input type="checkbox" className="checkbox" checked={isChecked} onChange={e => e.target.checked ? selectAllItem() : unselectAllItem()} />
										</label>
									</th>
									<th className="bg-white">Identité Patient</th>
									<th className="bg-white">Montant</th>
									<th className="bg-white">Status</th>
									<th className="bg-white">Hash</th>
								</tr>
							</thead>
							<tbody>
								{
									data.length > 0 ? (
										<>
											{
												data.map((transaction, index) => (
													<tr key={index}>
														<th>
															<label>
																<input type="checkbox" className="checkbox disabled:bg-gray-400" disabled={transaction.status !== "UNCLAIMED"} onChange={e => e.target.checked ? selectItem(transaction.transactionHash) : unselectItem(transaction.transactionHash)} />
															</label>
														</th>
														<td>
															<div className="flex items-center space-x-3 cursor-pointer">
																<div className="avatar">
																	<div className="mask mask-squircle w-12 h-12">
																		<img
																			src={`https://ui-avatars.com/api/?uppercase=true&background=CCC&name=${transaction.voucher.patientId}&bold=true&color=FFF`}
																			alt="Avatar Tailwind CSS Component"
																		/>
																	</div>
																</div>
																<div>
																	<div className="font-bold">{transaction.voucher.patientId}</div>
																	<div className="text-sm opacity-50">United States</div>
																</div>
															</div>
														</td>
														<td>
															{new Intl.NumberFormat("en-US", { style: 'currency', currency: transaction.voucher.currency }).format(transaction.voucher.amount)}
															<br />
															<span className="badge badge-ghost badge-sm">
																{new Intl.DateTimeFormat('fr-FR', { timeStyle: "short", dateStyle: "long" }).format(new Date(transaction.createdAt))}
															</span>
														</td>
														<td className="text-sm">
															{
																transaction.status == "UNCLAIMED" ? (
																	<>
																		<span class="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
																			<span class="w-1.5 h-1.5 inline-block bg-indigo-400 rounded-full"></span>
																			Non-reclamé
																		</span>
																	</>
																) : transaction.status == "PENDING" ? (
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
														</td>
														<th>
															<button className="btn btn-xs !lowercase">{transaction.shortenHash}</button>
														</th>
													</tr>
												))
											}
										</>
									) : (
										<>
											Aucune Transaction pour l'instant...
										</>
									)
								}

							</tbody>
						</table>
					</>
				)
			}
		</div>
	);
}
