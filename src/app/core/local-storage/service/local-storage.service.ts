import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) { }

  public setData(key: string, data: any) {
    this.storage.set(key, data);
  }

  public getData(key: string) {
    return this.storage.get(key);
  }

  public removeData(key: string) {
    this.storage.remove(key);
  }
}
