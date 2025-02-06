import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class  AuthenticationService{
  private apiUrl = 'http://localhost/invoicesapp/api/2.0/users/LoginToCapture';

  constructor(private http: HttpClient,private service:SessionService,private router: Router) {}

  login(credentials: { loginname: string; password: string; }): Observable<any> {
    let sessionguid:any;
    this.http.post(this.apiUrl, credentials).subscribe(
      (response)=>{
        this.service.setSession(response)
        this.router.navigate(['/header'])
      }
    );
    
    return sessionguid=sessionguid;
    
  }
}
