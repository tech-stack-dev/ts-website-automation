import { APIRequestContext, APIResponse, Request } from "@playwright/test";
import { client } from "./Client";
import { ClientsEnum } from "./ClientsEnum";
import RequestOptions from "./RequestOptions";

export default class BaseClient implements APIRequestContext {
    private _clientName: ClientsEnum;
    private _clientContext: APIRequestContext;

    public get ClientName(): ClientsEnum {
        return this._clientName;
    }

    public set ClientName(value: ClientsEnum) {
        this._clientName = value;
    }

    public get ClientContext(): APIRequestContext {
        return client.focusedClient._clientContext;
    }

    public set ClientContext(value: APIRequestContext) {
        client.focusedClient._clientContext = value;
    }

    delete(url: string, options?: RequestOptions | undefined): Promise<APIResponse> {
        return client.ClientContext.delete(url, options);
    }

    dispose(): Promise<void> {
        return client.ClientContext.dispose();
    }

    fetch(urlOrRequest: string | Request, options?: RequestOptions | undefined): Promise<APIResponse> {
        return client.ClientContext.fetch(urlOrRequest, options);
    }

    get(url: string, options?: RequestOptions | undefined): Promise<APIResponse> {
        return client.ClientContext.get(url, options);
    }

    head(url: string, options?: RequestOptions | undefined): Promise<APIResponse> {
        return client.ClientContext.head(url, options);
    }

    patch(url: string, options?: RequestOptions | undefined): Promise<APIResponse> {
        return client.ClientContext.patch(url, options);
    }

    post(url: string, options?: RequestOptions | undefined): Promise<APIResponse> {
        return client.ClientContext.post(url, options);
    }

    put(url: string, options?: RequestOptions | undefined): Promise<APIResponse> {
        return client.ClientContext.put(url, options);
    }

    storageState(options?: { path?: string | undefined; } | undefined): Promise<{
        cookies: {
            name: string;
            value: string;
            domain: string;
            path: string;
            expires: number;
            httpOnly: boolean;
            secure: boolean;
            sameSite: "Strict" | "Lax" | "None";
        }[];
        origins: {
            origin: string;
            localStorage: {
                name: string;
                value: string;
            }[];
        }[];
    }> {
        return client.ClientContext.storageState(options);
    }
}