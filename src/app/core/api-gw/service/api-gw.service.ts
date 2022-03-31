import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../http/services/http.service';
import { ApiGatewayRequest } from '../models/api-gw-request.model';
import { NerdyApiGwResources } from '../models/api-gw.models';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiGwService {
  private baseEndpoint: string = environment.apiGwBaseEndpoint;
  protected resource: NerdyApiGwResources;
  private pathParams = [];
  private endpoint: string

  constructor(
    public httpService: HttpService,
    private _resource: NerdyApiGwResources
  ) {
    this.resource = _resource;
    this.endpoint = this.baseEndpoint + '/' + this.resource
  }

  public insert(request: any, urlPattern?: string): Observable<any> {
    const _urlPattern = urlPattern ? this.endpoint + '/' + urlPattern : this.endpoint;
    const _request = new ApiGatewayRequest<typeof request>(request, _urlPattern);
    return this.httpService.post(
      _request.url,
      _request.body
    )
  }

  public getItem(request: any, urlPattern?: string, nestedKey?:string, paramsList?: string[]): Observable<any> {
    const _urlPattern = urlPattern ? this.endpoint + '/' + urlPattern : this.endpoint;
    const _request = new ApiGatewayRequest<typeof request>(request, _urlPattern, nestedKey, paramsList);
    
    return this.httpService.get(
      _request.url,
      {
        params: _request.queryParams
      }
    )
  }

  public getItemList(request: any, urlPattern?: string, nestedKey?:string, paramsList?: string[]): Observable<any> {
    const _urlPattern = urlPattern ? this.endpoint + '/' + urlPattern : this.endpoint;
    const _request = new ApiGatewayRequest<typeof request>(request, _urlPattern, nestedKey, paramsList);
    
    return this.httpService.get(
      _request.url,
      {
        params: _request.queryParams
      }
    )
  }

  public deleteItem(request: any, urlPattern?: string): Observable<any> {
    const _urlPattern = urlPattern ? this.endpoint + '/' + urlPattern : this.endpoint;
    const _request = new ApiGatewayRequest<typeof request>(request, _urlPattern);

    return this.httpService.delete(
      _request.url
    )
  }

  public putItem(request: any, urlPattern?: string): Observable<any> {
    const _urlPattern = urlPattern ? this.endpoint + '/' + urlPattern : this.endpoint;
    const _request = new ApiGatewayRequest<typeof request>(request, _urlPattern);

    return this.httpService.put(
      _request.url,
      _request.body
    )
  }




}
