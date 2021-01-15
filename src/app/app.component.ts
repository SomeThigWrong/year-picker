import { Component, VERSION, OnInit } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public name = "Angular " + VERSION.major;
  public selectedYear = null;
  ngOnInit() {
    this.getSelectedYear();
  }
  getSelectedYear() {
    const curDate = new Date();
    const curYear = curDate.getFullYear();
    const curMonth = curDate.getMonth();
    this.selectedYear = curMonth === 0 ? curYear - 1 + "年" : curYear + "年";
  }
  changeYear(year) {
    let tempHosp;
    this.selectedYear = year + "年";
    const param = {
      pYear: year,
      pHospital: tempHosp
    };
  }
}
