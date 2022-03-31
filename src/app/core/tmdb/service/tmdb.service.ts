import { HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../http/services/http.service';
import { TmdbCategoryEnum, TmdbMovieListItemModel, TmdbSearchResponseModel, TmdbTvSeriesListItemModel } from '../models/tmbd.models';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private tmbDbMoviesEndpoint: string = environment.tmdbAuth.apiBaseEndpoint;
  constructor(
    private httpService: HttpService
  ) { }

  public search(category:TmdbCategoryEnum, text: string, page: number = null): Observable<TmdbSearchResponseModel<TmdbMovieListItemModel | TmdbTvSeriesListItemModel>> {

    /**
     * category: TmdbCategoryEnum
     *  the category between movies or tv-series
     * text: string
     *  Text to search
     * page: page number to be retrieved, default null
     * 
     * 
     * response example:
     * {
          "page": 4,
      "results": [
          {
              "adult": false,
              "backdrop_path": null,
              "genre_ids": [
                  99
              ],
              "id": 472854,
              "original_language": "en",
              "original_title": "The Body as Matrix: Matthew Barney's Cremaster Cycle",
              "overview": "",
              "popularity": 0.6,
              "poster_path": "/fA6tvlNtOJ4c8ds6ouGEgLs5pdl.jpg",
              "release_date": "",
              "title": "The Body as Matrix: Matthew Barney's Cremaster Cycle",
              "video": false,
              "vote_average": 0,
              "vote_count": 0
          },
          {
              "adult": false,
              "backdrop_path": null,
              "genre_ids": [
                  16,
                  10751
              ],
              "id": 268477,
              "original_language": "en",
              "original_title": "Adventures in Odyssey: Escape from the Forbidden Matrix",
              "overview": "",
              "popularity": 0.699,
              "poster_path": "/oxXzC5K3WCzaQfyjWcx55HyqnBe.jpg",
              "release_date": "2001-01-23",
              "title": "Adventures in Odyssey: Escape from the Forbidden Matrix",
              "video": true,
              "vote_average": 6,
              "vote_count": 1
          }
      ],
      "total_pages": 1,
      "total_results": 3
      }
     */
    const endpoint = `${this.tmbDbMoviesEndpoint}/search/${category}`;
    const paramsOption: HttpParamsOptions = {
      fromObject: {
        language: 'it-IT',
        query: text,
        include_adult: true,
        page
      }
    }
    const params = new HttpParams(paramsOption);
    return (this.httpService.get(
      endpoint,
      {
        params
      }
    ) as Observable<TmdbSearchResponseModel<TmdbMovieListItemModel | TmdbTvSeriesListItemModel>>)
  }
}
