import { Component } from '@angular/core';
import { TabInterface } from '@realpage/raul-library';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  activeTab = "one";
  tabs: TabInterface[] = [
    {
      label: "Home",
      name: "home",
      icon : "places-home-1",
    },
    {
      label: "Help",
      name: "help",
      icon : "interface-question-mark",
    },
   
  ];
  handleTabChange(e: any) {
    const newTab = e.detail;
    if (!newTab) return;
    this.activeTab = newTab;
  }
}
