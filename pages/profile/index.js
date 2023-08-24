import Head from 'next/head';
import DashboardLayout from '../../layouts/Dashboard';
import Profile from '../../components/organisms/Profile';
import Fetcher from '../../lib/Fetcher';

const Page = () => {
  //const {data, isLoading, isError} = Fetcher(`/payer/${session.user.data.userId}`, session.user.data.id);

  //console.log(session.user.data.userId, data)

  return (
    <>
      <Head>
        <title>My Profile</title>
      </Head>
      <Profile />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;
