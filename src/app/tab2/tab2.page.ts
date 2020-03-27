import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  items;
  isShowing;

  constructor(private http:HttpClient) {
    this.isShowing = true;
      this.initializeItems();
  }

  initializeItems() {
   this.http.get('https://corona.lmao.ninja/countries').subscribe(data =>{
     this.items = data;
     if(data){
       this.isShowing = false;
     }
   })
  }

  getItems(ev) {
    // Reset items back to all of the items
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.country.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else {
      this.initializeItems();
    }
  }

}