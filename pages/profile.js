import { getSession } from 'next-auth/client';

import UserProfile from '../components/Profile/UserProfile';

const ProfilePage = () => {
  return <UserProfile />;
};

// ADDING SERVER-SIDE PAGE GUARDS
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
