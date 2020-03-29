import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  items = [];
  data;
  count: number = 0;
  isShowing;

  constructor(private http:HttpClient) {
    this.isShowing = true;
    this.initializeItems();
  }


  initializeItems(){
    this.http.get('https://corona.lmao.ninja/countries').subscribe(data =>{
      if(data){
        this.isShowing = false;
      }
      this.data = data;
      for (let i = 0; i < 20; i++) {  // here you can limit the items according to your needs.
        this.items.push(this.data[this.count]);   // your JSON data which you want to display
        this.count++ //i am using a count variable to keep track of inserted records to avoid inserting duplicate records on infinite scroll
      }
    })
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      for (let i = 0; i < 15; i++) {   
        this.items.push(this.data[this.count]); // this will start pushing next 5 items
        if(this.data.length > this.count){
          this.count++
        }if(this.data.length == this.count){
          infiniteScroll.target.disabled = true;
          break;
        }
      }
      infiniteScroll.target.complete();
    }, 500);
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