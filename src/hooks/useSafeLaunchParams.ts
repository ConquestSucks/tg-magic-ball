interface User {
    id: number;
    first_name: string;
    photo_url: string;
}

interface TgWebAppData {
    auth_date: Date;
    hash: string;
    signature: string;
    user?: User;
}

interface LaunchParams {
    tgWebAppPlatform: string;
    tgWebAppThemeParams: object;
    tgWebAppVersion: string;
    tgWebAppData: TgWebAppData;
}

const defaultUser: User = {
    id: 0,
    first_name: 'Гость',
    photo_url: '',
};

export function useSafeLaunchParams(): LaunchParams {
    if (import.meta.env.MODE === 'development') {
        return {
            tgWebAppPlatform: 'web',
            tgWebAppThemeParams: {},
            tgWebAppVersion: '1.0',
            tgWebAppData: {
                auth_date: new Date(),
                hash: '',
                signature: '',
                user: defaultUser,
            },
        };
    } else {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const params = require('@telegram-apps/sdk-react').useLaunchParams();
        return {
            ...params,
            tgWebAppData: {
                ...params.tgWebAppData,
                user: params.tgWebAppData && params.tgWebAppData.user ? params.tgWebAppData.user : defaultUser,
            }
        };
    }
} 