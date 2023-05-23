import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Fetcher from "../../../lib/Fetcher";
import { useSession } from "next-auth/react";
import { TableContext } from "../../organisms/Transaction";

export default function TransactionTable() {
	const { data: session } = useSession();
	const { selected, setSelected, isChecked, setIsChecked } = useContext(TableContext);
	

	const { data, isLoading, isError } = Fetcher(`/provider/transactions?providerId=${session.user.data.providerId}`, session.accessToken);

	const selectItem = (id) => {
		setSelected([...selected, id])
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
											<input type="checkbox" className="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
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
																<input type="checkbox" className="checkbox" onChange={e => e.target.checked ? selectItem(transaction.id) : unselectItem(transaction.id)} />
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
														<td className="text-sm">{transaction.status}</td>
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
