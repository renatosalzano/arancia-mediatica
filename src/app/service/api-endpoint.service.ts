import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ApiGatewayRequest } from '../core/api-gw/models/api-gw-request.model';
import { ApiGwService } from '../core/api-gw/service/api-gw.service';
import { HttpService } from '../core/http/services/http.service';
import { UserSessionService } from '../core/user-session/service/user-session.service';
import { BookItemModel } from './itemModels';
import { UserInfoService } from './user-info.service';

type Category = 'books' | 'music' | 'tv-series' | 'movies';

@Injectable({
  providedIn: 'root',
})
export class ApiEndpointService {
  constructor(
    private http: HttpClient,
    private userSession: UserSessionService
  ) {}

  private url = environment.apiGwBaseEndpoint;

  private option(token: string) {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        Mode: 'cors',
        Credential: 'include',
        'Content-Type': 'multipart/form-data',
      }),
    };
  }

  getUserData(): { user_id: string; token: string } {
    const { user_id } = this.userSession.getUserData();
    const token = this.userSession.getAuthToken()['jwtToken'];
    return { user_id, token };
  }

  getBooks() {
    try {
      const { user_id, token } = this.getUserData();
      return this.http.get(`${this.url}/books/${user_id}`, this.option(token));
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public getItems(category: Category) {
    try {
      const { user_id, token } = this.getUserData();
      return this.http.get(
        `${this.url}/${category}/${user_id}`,
        this.option(token)
      );
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  /* public postItem(item: Category, data: any) {
    if (data.image) delete data.image;
    try {
      const { user_id, token } = this.getUserData();
      const payload = { data: { user_id, data } };
      return this.http.post(`${this.url}/${item}`, payload, this.option(token));
    } catch (err) {
      console.error(err);
      return null;
    }
  } */

  public postItem(item: Category, data: any) {
    const { user_id, token } = this.getUserData();
    const body = { user_id, data };
    console.log('POST ITEM', body);
    return this.http.post(`${this.url}/${item}`, body, this.option(token));
  }

  public patchItem(category: Category, item_id: string, data: any) {
    if (data.image) delete data.image;
    const { user_id, token } = this.getUserData();
    const payload = { user_id, data };
    console.log(payload);
    console.log(`${this.url}/${category}/${user_id}/${item_id}`);
    return this.http.put(
      `${this.url}/${category}/${user_id}/${item_id}`,
      payload,
      this.option(token)
    );
  }

  public deleteItem(category: Category, item_id: string) {
    const { user_id, token } = this.getUserData();
    const header = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        Mode: 'cors',
        Credential: 'include',
      }),
    };
    try {
      return this.http.delete(
        `${this.url}/${category}/${user_id}/${item_id}`,
        header
      );
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
