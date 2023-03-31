import {APIRequestContext, APIResponse, Request} from '@playwright/test';
import {ClientsEnum} from './ClientsEnum';
import RequestOptions from './RequestOptions';

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
		return this._clientContext;
	}

	public set ClientContext(value: APIRequestContext) {
		this._clientContext = value;
	}

	delete(
		url: string,
		options?: RequestOptions | undefined
	): Promise<APIResponse> {
		return this.ClientContext.delete(url, options);
	}

	dispose(): Promise<void> {
		return this.ClientContext.dispose();
	}

	fetch(
		urlOrRequest: string | Request,
		options?: RequestOptions | undefined
	): Promise<APIResponse> {
		return this.ClientContext.fetch(urlOrRequest, options);
	}

	get(
		url: string,
		options?: RequestOptions | undefined
	): Promise<APIResponse> {
		if(options===undefined){
			return this.ClientContext.get(url);
		}
		else{
			return this.ClientContext.get(url, options);
		}
	}

	head(
		url: string,
		options?: RequestOptions | undefined
	): Promise<APIResponse> {
		return this.ClientContext.head(url, options);
	}

	patch(
		url: string,
		options?: RequestOptions | undefined
	): Promise<APIResponse> {
		return this.ClientContext.patch(url, options);
	}

	post(
		url: string,
		options?: RequestOptions | undefined
	): Promise<APIResponse> {
		return this.ClientContext.post(url, options);
	}

	put(
		url: string,
		options?: RequestOptions | undefined
	): Promise<APIResponse> {
		return this.ClientContext.put(url, options);
	}

	storageState(options?: {path?: string | undefined} | undefined): Promise<{
		cookies: {
			name: string;
			value: string;
			domain: string;
			path: string;
			expires: number;
			httpOnly: boolean;
			secure: boolean;
			sameSite: 'Strict' | 'Lax' | 'None';
		}[];
		origins: {
			origin: string;
			localStorage: {
				name: string;
				value: string;
			}[];
		}[];
	}> {
		return this.ClientContext.storageState(options);
	}
}
