import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated, getUser } from '../utils/auth';
import Loading from './Loading';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <Loading fullScreen />;
  }

  return <>{children}</>;
}
