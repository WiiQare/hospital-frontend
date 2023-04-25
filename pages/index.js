import Head from "next/head";

import DashboardLayout from "../layouts/Dashboard";
import Carousel from "../components/organisms/Dashboard/Carousel";
import HistoryWallet from "../components/organisms/Wallet/History";
import Stat from "../components/atoms/Card/Stat";
import { BsFillCreditCardFill } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";

const Page = () => {

	return (
		<>
			<Head>
				<title>JAMII - UNICEF CRYPTO</title>
				<script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>
			</Head>
			{/* <Carousel />
			<Stat />
			<HistoryWallet /> */}

			<div className="">

				<section className=" flex flex-col gap-6">
					<div className="mx-auto max-w-screen-xl pt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
						<div className="flex justify-between items-end bg-gray-50 shadow-sm col-span-2 border border-gray-200 rounded-lg h-fit overflow-hidden">
							<div className=" p-8 md:p-12">
								<a href="#" className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md mb-6">
									<svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
										<path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
									</svg>
									Vous revoilà !
								</a>
								<h1 className="text-purple  text-md md:text-lg font-normal mb-2">Bon retour, Ngaliema Center</h1>
								<p className="text-sm font-light text-gray-500 mb-6">
									Votre dashboard pour prendre en main la compte WiiQare de l'hopital <span className="text-orange">HJ Hospital</span>
								</p>
								<a href="#" className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-orange effect-up">
									Contact
									<svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
								</a>
							</div>

							<div className="h-full">
								<img src="/images/sketch.png" alt="Sketch" className="h-full object-cover w-full" />
							</div>
						</div>
						<div className="md:grid flex gap-6 w-full md:grid-cols-2 md:gap-4">
							<div className="bg-gray-50 w-full border border-gray-200 rounded-lg py-8 px-4 shadow-sm h-fit">

								<div className="">
									<div className="bg-orange bg-opacity-20 rounded-lg p-2 w-fit mb-2 text-orange">
										<BsFillCreditCardFill />
									</div>
									<h3 className="font-semibold text-gray-500 mb-5">Carte Bancaire</h3>

									<span className="font-semibold text-5xl text-gray-700 ">10</span>
									<div className="flex gap-2 text-green-400 items-center mt-3 text-sm">
										<BsFillCreditCardFill />
										<span>Balance</span>
									</div>
								</div>
							</div>
							<div className="bg-gray-50 w-full border border-gray-200 rounded-lg py-8 px-4 shadow-sm h-fit">

								<div className="">
									<div className="bg-primary bg-opacity-20 rounded-lg p-2 w-fit mb-2 text-primary">
										<FaEthereum />
									</div>
									<h3 className="font-semibold text-gray-500 mb-5">Cryptomonnaie</h3>

									<span className="font-semibold text-5xl text-gray-700 ">32</span>
									<div className="flex gap-2 text-green-400 items-center mt-3 text-sm">
										<BsFillCreditCardFill />
										<span>Balance</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="max-w-screen-xl flex flex-col md:grid md:grid-cols-3 gap-6 mb-20 md:mb-10">

						<div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
							<div className="flex items-center justify-between mb-4">
								<h5 className="text-xl font-semibold leading-none text-gray-600 flex flex-col">Statistique <span className="text-xs font-light text-gray-400">18 opérations effectués</span></h5>
								<a href="#" className="text-sm font-medium text-blue-600 hover:underline ">
									Voir tous
								</a>
							</div>
							<div className="flow-root">
								<ul role="list" className="divide-y divide-gray-200">
									<li className="py-3 sm:py-4">
										<div className="flex items-center space-x-4">
											<div className="flex-shrink-0">
												<img className="w-10 h-10 rounded-lg" src="https://source.unsplash.com/random" alt="Neil image" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-gray-900 truncate">
													Neil Sims
												</p>
												<p className="text-xs text-gray-500 truncate ">
													+243 814 978 651
												</p>
											</div>
											<div className="inline-flex items-center text-base font-semibold text-gray-900">
												$320
											</div>
										</div>
									</li>
									<li className="py-3 sm:py-4">
										<div className="flex items-center space-x-4">
											<div className="flex-shrink-0">
												<img className="w-10 h-10 rounded-lg" src="https://source.unsplash.com/random" alt="Bonnie image" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-gray-900 truncate">
													Bonnie Green
												</p>
												<p className="text-xs text-gray-500 truncate">
													+243 814 978 651
												</p>
											</div>
											<div className="inline-flex items-center text-base font-semibold text-gray-900">
												$3467
											</div>
										</div>
									</li>
									<li className="py-3 sm:py-4">
										<div className="flex items-center space-x-4">
											<div className="flex-shrink-0">
												<img className="w-10 h-10 rounded-lg" src="https://source.unsplash.com/random" alt="Michael image" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-gray-900 truncate">
													Michael Gough
												</p>
												<p className="text-xs text-gray-500 truncate">
													+243 814 978 651
												</p>
											</div>
											<div className="inline-flex items-center text-base font-semibold text-gray-900">
												$67
											</div>
										</div>
									</li>
									<li className="py-3 sm:py-4">
										<div className="flex items-center space-x-4">
											<div className="flex-shrink-0">
												<img className="w-10 h-10 rounded-lg" src="https://source.unsplash.com/random" alt="Lana image" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-gray-900 truncate">
													Lana Byrd
												</p>
												<p className="text-xs text-gray-500 truncate">
													+243 814 978 651
												</p>
											</div>
											<div className="inline-flex items-center text-base font-semibold text-gray-900">
												$367
											</div>
										</div>
									</li>
									<li className="pt-3 pb-0 sm:pt-4">
										<div className="flex items-center space-x-4">
											<div className="flex-shrink-0">
												<img className="w-10 h-10 rounded-lg" src="https://source.unsplash.com/random" alt="Thomas image" />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-gray-900 truncate">
													Thomes Lean
												</p>
												<p className="text-xs text-gray-500 truncate">
													+243 814 978 651
												</p>
											</div>
											<div className="inline-flex items-center text-base font-semibold text-gray-900">
												$2367
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>

						<div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
							<div className="flex items-center justify-between mb-4">
								<h5 className="text-xl font-semibold leading-none text-gray-600 flex flex-col">Mes Balances</h5>
							</div>
							<div className="flow-root">
								<ul role="list" className="divide-y divide-gray-200">
									<li className="py-3 sm:py-4">
										<div className="flex items-center space-x-4">

											<div className="flex-shrink-0 bg-orange bg-opacity-20 rounded-lg p-2 w-fit mb-2 text-orange">
												<BsFillCreditCardFill size={24} />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-gray-900 truncate">
													CDF
												</p>
												<p className="text-xs text-gray-500 truncate ">
													Carte Bancaire
												</p>
											</div>
											<div className="inline-flex items-center text-base font-semibold text-gray-900">
												CDF 3,200,000.00
											</div>
										</div>
									</li>

									<li className="py-3 sm:py-4">
										<div className="flex items-center space-x-4">

											<div className="flex-shrink-0 bg-green-400 bg-opacity-20 rounded-lg p-2 w-fit mb-2 text-green-400">
												<BsFillCreditCardFill size={24} />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-gray-900 truncate">
													USD
												</p>
												<p className="text-xs text-gray-500 truncate ">
													Carte Bancaire
												</p>
											</div>
											<div className="inline-flex items-center text-base font-semibold text-gray-900">
												$ 430.00
											</div>
										</div>
									</li>

									<li className="py-3 sm:py-4">
										<div className="flex items-center space-x-4">

											<div className="flex-shrink-0 bg-orange bg-opacity-20 rounded-lg p-2 w-fit mb-2 text-orange">
												<BsFillCreditCardFill size={24} />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-gray-900 truncate">
													CDF
												</p>
												<p className="text-xs text-gray-500 truncate ">
													Carte Bancaire
												</p>
											</div>
											<div className="inline-flex items-center text-base font-semibold text-gray-900">
												CDF 3,200,000.00
											</div>
										</div>
									</li>

									<li className="py-3 sm:py-4">
										<div className="flex items-center space-x-4">

											<div className="flex-shrink-0 bg-green-400 bg-opacity-20 rounded-lg p-2 w-fit mb-2 text-green-400">
												<BsFillCreditCardFill size={24} />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-gray-900 truncate">
													USD
												</p>
												<p className="text-xs text-gray-500 truncate ">
													Carte Bancaire
												</p>
											</div>
											<div className="inline-flex items-center text-base font-semibold text-gray-900">
												$ 430.00
											</div>
										</div>
									</li>

									<li className="py-3 sm:py-4">
										<div className="flex items-center space-x-4">

											<div className="flex-shrink-0 bg-purple bg-opacity-20 rounded-lg p-2 w-fit mb-2 text-purple">
												<FaEthereum size={24} />
											</div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-gray-900 truncate">
													EUR
												</p>
												<p className="text-xs text-gray-500 truncate ">
													Cryptomonnaie
												</p>
											</div>
											<div className="inline-flex items-center text-base font-semibold text-gray-900">
												£ 135.00
											</div>
										</div>
									</li>

								</ul>
							</div>
						</div>

						<div className="flex flex-col min-h-max gap-6">
							<div className="md:grid flex gap-6 w-full md:grid-cols-2 md:gap-4">
								<div className="bg-gray-50 w-full border border-gray-200 rounded-lg py-8 px-4 shadow-sm h-fit">

									<div className="">
										<div className="bg-orange bg-opacity-20 rounded-lg p-2 w-fit mb-2 text-orange">
											<BsFillCreditCardFill />
										</div>
										<h3 className="font-semibold text-gray-500 mb-5">Carte Bancaire</h3>

										<span className="font-semibold text-5xl text-gray-700 ">10</span>
										<div className="flex gap-2 text-green-400 items-center mt-3 text-sm">
											<BsFillCreditCardFill />
											<span>Balance</span>
										</div>
									</div>
								</div>
								<div className="bg-gray-50 w-full border border-gray-200 rounded-lg py-8 px-4 shadow-sm h-fit">

									<div className="">
										<div className="bg-primary bg-opacity-20 rounded-lg p-2 w-fit mb-2 text-primary">
											<FaEthereum />
										</div>
										<h3 className="font-semibold text-gray-500 mb-5">Cryptomonnaie</h3>

										<span className="font-semibold text-5xl text-gray-700 ">32</span>
										<div className="flex gap-2 text-green-400 items-center mt-3 text-sm">
											<BsFillCreditCardFill />
											<span>Balance</span>
										</div>
									</div>
								</div>
							</div>


							<div className="block h-full max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
								<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Noteworthy technology acquisitions 2021</h5>
								<p className="font-normal text-gray-700 ">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
							</div>

						</div>

					</div>
				</section>

			</div>

		</>
	);
};

Page.getLayout = (page) => (
	<DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;
