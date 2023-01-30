import { ReadStream } from "fs";

export default class RequestOptions {
    data?: string | Buffer | any;
    failOnStatusCode?: boolean;
    form?: { [key: string]: string | number | boolean; };
    headers?: { [key: string]: string; };
    ignoreHTTPSErrors?: boolean;
    maxRedirects?: number;
    method?: string;
    multipart?: {
        [key: string]: string | number | boolean | ReadStream | {
            name: string;
            mimeType: string;
            buffer: Buffer;
        };
    };
    params?: { [key: string]: string | number | boolean; };
    timeout?: number;
}