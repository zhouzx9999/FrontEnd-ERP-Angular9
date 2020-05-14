import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpClient: HttpClient) { }

   URL1 = 'http://localhost:8080/user/listUsers';
   URL_UPDATE = 'http://localhost:8080/user/updateUser';

   getAllUser(): Observable<any> {
    return this.httpClient.get(this.URL1);
  }


  updateUser(id: String, value: any): Observable<Object> {
    console.log(id);
    return this.httpClient.put(`${this.URL_UPDATE}/${id}`, value);
  }

}
