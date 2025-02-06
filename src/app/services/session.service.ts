import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  
  setSession(key: any): void {
    // document.cookie = `${key.sessionguid}`;
    document.cookie= "sessionguid" + "=" + key.sessionguid + "; path=/";
  }

 
  getSession(key: string): string | null {
    const cookies = document.cookie.split('; ');
    const targetCookie = cookies.find((cookie) => cookie.startsWith(`${key}=`));
    return targetCookie ? targetCookie.split('=')[1] : null;
  }

 
  clearSession(key: string): void {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  }

  
  sessionExists(key: string): boolean {
    return this.getSession(key) !== null;
  }
}
