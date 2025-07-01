import { useState, useEffect } from 'react';

interface User {
  first_name: string;
  photo_url: string;
}

interface LaunchParams {
  tgWebAppData: {
    user?: User;
  };
}

export function useSafeLaunchParams(): LaunchParams | null {
  const [params, setParams] = useState<LaunchParams | null>(null);

  useEffect(() => {
    if (import.meta.env.MODE === 'development') {
      setParams({
        tgWebAppData: {
          user: {
            first_name: 'Dev',
            photo_url: '',
          },
        },
      });
    } else {
      import('@telegram-apps/sdk-react').then(mod => {
        const sdkParams = mod.useLaunchParams?.();
        if (sdkParams && sdkParams.tgWebAppData) {
          const user = sdkParams.tgWebAppData.user;
          setParams({
            tgWebAppData: {
              user: user ? {
                first_name: user.first_name ?? '',
                photo_url: user.photo_url ?? '',
              } : undefined,
            },
          });
        } else {
          setParams({ tgWebAppData: {} });
        }
      });
    }
  }, []);

  return params;
} 