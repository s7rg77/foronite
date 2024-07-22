import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MainService {

  private lastcases = 'https://foronite.com/lastcases.php';
  private likecases = 'https://foronite.com/likecases.php';
  private accesscases = 'https://foronite.com/accesscases.php';
  private name = 'https://foronite.com/name.php';
  private zones = 'https://foronite.com/zones.php';
  private zone = 'https://foronite.com/zone.php';
  private cases = 'https://foronite.com/cases.php';
  private case = 'https://foronite.com/case.php';
  private newcase = 'https://foronite.com/newcase.php';
  private posts = 'https://foronite.com/posts.php';
  private newpost = 'https://foronite.com/newpost.php';
  private user = 'https://foronite.com/getuser.php';
  private data = 'https://foronite.com/edituser.php';
  private editicon = 'https://foronite.com/editicon.php';
  private newcaselike = 'https://foronite.com/newcaselike.php';
  private newpostlike = 'https://foronite.com/newpostlike.php';
  private accessnu = 'https://foronite.com/accessnu.php';
  private search = 'https://foronite.com/search.php';

  constructor(private http: HttpClient) { }

  getLastCasesService(): Observable<any> {

    return this.http.get<any>(this.lastcases);

  }

  getLikeCasesService(): Observable<any> {

    return this.http.get<any>(this.likecases);

  }

  getAccessCasesService(): Observable<any> {

    return this.http.get<any>(this.accesscases);

  }

  getNameService(userId: any): Observable<any> {

    const url = `${this.name}?userId=${userId}`;
    return this.http.get<any>(url);

  }

  getZonesService(): Observable<any> {

    return this.http.get<any>(this.zones);

  }

  getZoneService(zoneId: any): Observable<any> {

    const url = `${this.zone}?zoneId=${zoneId}`;
    return this.http.get<any>(url);

  }

  getCasesService(caseData: any): Observable<any> {

    const url = `${this.cases}?zoneId=${caseData.zoneId}&page=${caseData.page}`;
    return this.http.get<any>(url);

  }

  getCaseService(caseData: any): Observable<any> {

    const url = `${this.case}?caseId=${caseData.caseId}&userId=${caseData.userId}`;
    return this.http.get<any>(url);

  }

  newCaseService(formData: any): Observable<any> {

    return this.http.post<any>(this.newcase, formData);

  }

  getPostsService(postData: any): Observable<any> {

    const url = `${this.posts}?caseId=${postData.caseId}&userId=${postData.userId}&page=${postData.page}`;
    return this.http.get<any>(url);

  }

  newPostService(formData: any): Observable<any> {

    return this.http.post<any>(this.newpost, formData);

  }

  getUserService(userId: any): Observable<any> {

    const url = `${this.user}?userId=${userId}`;
    return this.http.get<any>(url);

  }

  editUserService(formData: any): Observable<any> {

    return this.http.post<any>(this.data, formData);

  }

  editIconService(formData: any): Observable<any> {

    return this.http.post<any>(this.editicon, formData);

  }

  newCaseLikeService(likeData: any): Observable<any> {

    return this.http.post(this.newcaselike, likeData);

  }

  newPostLikeService(likeData: any): Observable<any> {

    return this.http.post(this.newpostlike, likeData);

  }

  accessNuService(data: any): Observable<any> {

    return this.http.post(this.accessnu, data);

  }

  searchService(searchText: any): Observable<any[]> {

    const url = `${this.search}?searchText=${searchText}`;
    return this.http.get<any[]>(url);

  }

}