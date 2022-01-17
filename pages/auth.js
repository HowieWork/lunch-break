import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';

import AuthForm from '../components/Forms/AuthForm';

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // ADDING CLIENT-SIDE PAGE GUARD
  // NOTE ONLY CALL HOOKS AT THE TOP LEVEL
  // Don’t call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function, before any early returns.
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        setIsLoading(false);
      }
      if (session) {
        router.replace('/');
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return <AuthForm />;
};

export default AuthPage;
