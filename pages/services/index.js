import Head from "next/head";
import DashboardLayout from "../../layouts/Dashboard";
import Service from "../../components/organisms/Service";

const Page = () => {
  return (
    <>
      <Head>
        <title>Services</title>
      </Head>
      <Service />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;