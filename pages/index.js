import Head from 'next/head';

import DashboardLayout from '../layouts/Dashboard';
import Carousel from '../components/organisms/Dashboard/Carousel';
import HistoryWallet from '../components/organisms/Wallet/History';
import Stat from '../components/atoms/Card/Stat';
import { BsFillCreditCardFill } from 'react-icons/bs';
import { RiSendToBack } from 'react-icons/ri';

import { FaEthereum, FaUserAlt } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import Fetcher from '../lib/Fetcher';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { MdQrCodeScanner } from 'react-icons/md';

const Page = () => {
  const router = useRouter();
  const { data } = useSession();

  const {
    data: result,
    isLoading,
    isError,
  } = Fetcher(
    `/provider/transactions?providerId=${data.user.data.providerId}`,
    data.accessToken,
  );
  const {
    data: resultStat,
    isLoading: loadingStat,
    isError: errorStat,
  } = Fetcher(
    `/provider/statistics?providerId=${data.user.data.providerId}`,
    data.accessToken,
  );

  console.log(result);
  useEffect(() => {
    if (resultStat && /AUTH_TOKEN_EXPIRED/i.test(resultStat.code))
      router.push('/login');
  }, [result, resultStat]);

  return (
    <>
      <Head>
        <title>Dashboard - Hôpital</title>
        <script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>
      </Head>
      {/* <Carousel />
			<Stat />
			<HistoryWallet /> */}

      <div className="">
        <section className=" flex flex-col gap-6 w-full">
          <div className="w-full flex flex-col pt-6 md:grid md:grid-cols-3 gap-6">
            <div className="col-span-2 flex flex-col gap-6">
              <div className="flex justify-between items-end bg-gray-50 shadow-sm  border border-gray-200 rounded-lg h-fit">
                <div className="p-8 md:p-12">
                  <a
                    href="#"
                    className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md mb-6"
                  >
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                    </svg>
                    Vous revoilà !
                  </a>
                  <h1 className="text-purple  text-md md:text-lg font-normal mb-2">
                    Bon retour, {data.user.data.names}
                  </h1>
                  <p className="text-sm font-light text-gray-500 mb-6">
                    Votre dashboard pour prendre en main la compte WiiQare de
                    l'hopital{' '}
                    <span className="text-orange">{data.user.data.names}</span>
                  </p>
                  <a
                    href={`tel:${data.user.data.phoneNumber}`}
                    className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-orange effect-up"
                  >
                    Contact
                    <svg
                      aria-hidden="true"
                      className="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>

                <div className="p-8 h-full">
                  <img
                    src="/images/sketch.png"
                    alt="Sketch"
                    className="h-full object-contain w-full"
                  />
                </div>
              </div>

              <div className="flex justify-between items-end bg-gray-50 shadow-sm border border-gray-200 rounded-lg h-fit">
                <div className="p-8 md:px-12 md:py-6 flex flex-col md:flex-row justify-between md:items-center gap-3 w-full h-full">
                  <p className="text-xl font-extrabold text-gray-500">
                    Scannez le Pass Santé du Patient
                  </p>
                  <Link href="/scan">
                    <button className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-orange effect-up gap-2">
                      <MdQrCodeScanner />
                      Scannez
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-6 w-full grid-cols-2 md:gap-4">
              <div className="bg-gray-50 w-full border border-gray-200 rounded-lg py-8 px-4 shadow-sm h-fit">
                {loadingStat ? (
                  <>Loading...</>
                ) : (
                  <div className="">
                    <div className="bg-orange bg-opacity-20 rounded-lg p-2 w-fit mb-2 text-orange">
                      <BsFillCreditCardFill />
                    </div>
                    <h3 className="font-semibold text-gray-500 mb-5">
                      Montant Non Reclamé
                    </h3>

                    <span className="font-semibold text-md text-gray-700 ">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'CDF',
                      }).format(resultStat.totalUnclaimedAmount)}
                    </span>

                    <div className="flex gap-2 text-green-400 items-center mt-3 text-sm">
                      <BsFillCreditCardFill />
                      <span>Balance</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 w-full border border-gray-200 rounded-lg py-8 px-4 shadow-sm h-fit">
                {loadingStat ? (
                  <>Loading...</>
                ) : (
                  <div className="">
                    <div className="bg-primary bg-opacity-20 rounded-lg p-2 w-fit mb-2 text-primary">
                      <FaUserAlt />
                    </div>
                    <h3 className="font-semibold text-gray-500 mb-5">
                      Total Patients Soignés
                    </h3>

                    <span className="font-semibold text-md text-gray-700 ">
                      {resultStat.totalUniquePatients}
                    </span>
                    <div className="flex gap-2 text-green-400 items-center mt-3 text-sm">
                      <BsFillCreditCardFill />
                      <span>Patient soigné</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 w-full border border-gray-200 rounded-lg py-8 px-4 shadow-sm h-fit">
                {loadingStat ? (
                  <>Loading...</>
                ) : (
                  <div className="">
                    <div className="bg-orange bg-opacity-20 rounded-lg p-2 w-fit mb-2 text-orange">
                      <BsFillCreditCardFill />
                    </div>
                    <h3 className="font-semibold text-gray-500 mb-5">
                      Montant remboursé
                    </h3>

                    <span className="font-semibold text-md text-gray-700 ">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'CDF',
                      }).format(resultStat.totalRedeemedAmount)}
                    </span>
                    <div className="flex gap-2 text-green-400 items-center mt-3 text-sm">
                      <BsFillCreditCardFill />
                      <span>Balance</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 w-full border border-gray-200 rounded-lg py-8 px-4 shadow-sm h-fit">
                {loadingStat ? (
                  <>Loading...</>
                ) : (
                  <div className="">
                    <div className="bg-primary bg-opacity-20 rounded-lg p-2 w-fit mb-2 text-primary">
                      <RiSendToBack />
                    </div>
                    <h3 className="font-semibold text-gray-500 mb-5">
                      En attente de reboursement
                    </h3>

                    <span className="font-semibold text-md text-gray-700 ">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'CDF',
                      }).format(resultStat.totalPendingAmount)}
                    </span>
                    <div className="flex gap-2 text-green-400 items-center mt-3 text-sm">
                      <BsFillCreditCardFill />
                      <span>Balance</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="max-w-screen-xl flex flex-col md:grid md:grid-cols-3 gap-6 mb-20 md:mb-10">
            <div className="col-span-2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
              {isLoading || result.code || !result ? (
                <>Loading...</>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-semibold leading-none text-gray-600 flex flex-col">
                      Historique{' '}
                      <span className="text-xs font-light text-gray-400">
                        {result.length} dernières transactions effectués
                      </span>
                    </h5>
                    <Link href={'/transactions'} legacyBehavior>
                      <a className="text-sm font-medium text-blue-600 hover:underline">
                        Voir tous
                      </a>
                    </Link>
                  </div>
                  <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200">
                      {result.map((transaction, index) => (
                        <>
                          {index < 5 ? (
                            <li className="py-3 sm:py-4">
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                  <img
                                    className="w-10 h-10 rounded-lg"
                                    src={`https://ui-avatars.com/api/?uppercase=true&background=888&name=${transaction.voucher.patientId}&bold=true&color=FFF`}
                                    alt="Neil image"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {transaction.voucher.patientId}
                                  </p>
                                  <p className="text-xs text-gray-500 truncate ">
                                    +243 814 978 651
                                  </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                  {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: transaction.voucher.currency,
                                  }).format(transaction.voucher.amount)}
                                </div>
                              </div>
                            </li>
                          ) : (
                            <></>
                          )}
                        </>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>

            {/* <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
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
						</div> */}

            <div className="flex flex-col w-full min-h-max gap-6">
              <div className="flex flex-col w-full h-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
                  Vos demandes de retrait prennent un certains temps ?
                </h5>
                <p className="font-normal text-gray-700 text-sm">
                  Le retrait de fonds chez WiiQare ne prend au maximum que 48h,
                  le temps d'une courte vérification puis le fond vous sera
                  déversé...
                </p>
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
