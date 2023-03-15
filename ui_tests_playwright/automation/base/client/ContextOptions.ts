export default class ContextOptions{
    baseURL?: string;
    extraHTTPHeaders?: { [key: string]: string; };
    httpCredentials?: {
      username: string;

      password: string;
    };
    ignoreHTTPSErrors?: boolean;
    proxy?: {
      server: string;
      bypass?: string;
      username?: string;
      password?: string;
    };
    storageState?: string|{
      cookies: Array<{
        name: string;
        value: string;
        domain: string;
        path: string;
        expires: number;
        httpOnly: boolean;
        secure: boolean;
        sameSite: "Strict"|"Lax"|"None";
      }>;
      origins: Array<{
        origin: string;
        localStorage: Array<{
          name: string;
          value: string;
        }>;
      }>;
    };
    timeout?: number;
    userAgent?: string;
}