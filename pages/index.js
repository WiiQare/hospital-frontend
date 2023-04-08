import Head from "next/head";

import DashboardLayout from "../layouts/Dashboard";
import Carousel from "../components/organisms/Dashboard/Carousel";
import HistoryWallet from "../components/organisms/Wallet/History";
import Stat from "../components/atoms/Card/Stat";

const Page = () => {

	return (
		<>
			<Head>
				<title>JAMII - UNICEF CRYPTO</title>
				<script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>
			</Head>
			<Carousel />
			<Stat />
			<HistoryWallet />

		</>
	);
};

Page.getLayout = (page) => (
	<DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;
