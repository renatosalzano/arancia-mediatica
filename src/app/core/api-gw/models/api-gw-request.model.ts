import { HttpParams } from "@angular/common/http";
import { timeStamp } from "console";
import { runInThisContext } from "vm";

export class ApiGatewayRequest<T> {
    urlPattern: string;
    pathParams: string[];
    paramsList: string[] = [];
    url: string;
    queryParams: HttpParams;
    body: T;

    constructor(requestModel: any, urlPattern?: string, nestedKey?: string, paramsList?: string[]) {
        this.getBody(requestModel);
        this.getQueryParams(requestModel, paramsList);
        this.getUrl(requestModel, urlPattern, nestedKey);
    }


    private getBody(request: any) {
        this.body = request;
    }

    private getQueryParams(request: any, paramsList?: string[]) {
        for (const paramKey of (paramsList ? paramsList : this.paramsList)) {
			if (request[paramKey]) {
				this.queryParams = this.queryParams.set(paramKey, request[paramKey]);
			}
		}
    }

    private getUrl(request: any, urlPattern?: string, nestedKey?: string) {
        this.pathParams = [];
		this.url = (urlPattern ? urlPattern : this.urlPattern).replace(/\{\{([^\}]*)\}\}/gi, (match, paramKey) => {
			const value: string = request[paramKey] ? request[paramKey] : request[nestedKey][paramKey];
            delete this.body[paramKey]
			this.pathParams.push(paramKey);
			return value;
		});
    }
}