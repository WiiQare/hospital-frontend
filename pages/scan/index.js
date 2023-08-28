import Head from 'next/head';
import DashboardLayout from '../../layouts/Dashboard';
import Scan from '../../components/atoms/Scan';

const Page = () => {
  return (
    <>
      <Head>
        <title>Scanner le pass santé</title>
      </Head>
      <Scan />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;
