import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  openInframe(_t75: any) {
    throw new Error('Method not implemented.');
  }
  invoices: any[] = [];
  filter_data: any[] = [];
  apiUrl = 'http://localhost/invoicesapp/api/2.0/invoices?statusoid=2601&pageSize=10&pageNumber=1&sortName=invoiceoid&sortOrder=desc';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit() {
    this.fetchInvoices();
  }

  fetchInvoices() {
    const guid = this.cookieService.get('sessionguid');
    const headers = new HttpHeaders({
      'sid': guid
     
    });
    console.log('headers',headers)
    this.http.get<any>(this.apiUrl, { headers }).pipe(
      tap(response => {
        console.log('API Response:', response);
        this.invoices = response.data || [];
        console.log('aaaa',this.invoices)
        this.filter_data = [...this.invoices];
      }),
      catchError(error => {
        console.error('Error fetching invoices:', error);
        return of([]);
      })
    ).subscribe();
  }

  filter(query: string) {
    if (!query) {
      this.filter_data = [...this.invoices];
      return;
    }
    this.filter_data = this.invoices.filter((invoice) =>
      invoice.queueOid.toString().includes(query)
    );
  }

  reset() {
    this.filter_data = [...this.invoices];
  }
}
