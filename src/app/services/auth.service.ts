import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  host: string = environment.host;

  constructor(private http:HttpClient) { }

  login(username: string, password:string): Observable<any> {
    return this.http.post(this.host + 'api/login/authenticate', {
      Username: username,
      Password: password
    });
  }

  register(data: Register): Observable<any> {
    return this.http.post(this.host + 'api/login/register', data);
  }
  
}
