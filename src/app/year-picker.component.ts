import {
  Component,
  OnInit,
  forwardRef,
  HostListener,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-year-picker",
  templateUrl: "./year-picker.component.html",
  styleUrls: ["./year-picker.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YearPickerComponent),
      multi: true
    }
  ]
})
export class YearPickerComponent implements OnInit {
  @ViewChild("YearSelection", { static: true }) yearSelection: ElementRef;
  @ViewChild("IncreaseYear", { static: true }) increaseYearel: ElementRef;
  @ViewChild("DecreaseYear", { static: true }) decreaseYearel: ElementRef;
  @Input() Year;
  @Output() changeValue = new EventEmitter();
  public inputWidth: number;
  public isHiddenYearPanel = false;
  public currentDecade = 101;
  public years = [];
  public fromYear: number;
  public toYear: number;
  public startActiveYear = 2013;
  public endActiveYear: number;
  constructor() {}
  ngOnInit() {
    this.generateYearPanelData();
    this.initialEndActiveYear();
  }
  onClickInput(event) {
    this.isHiddenYearPanel = !this.isHiddenYearPanel;
  }
  generateYearPanelData() {
    this.fromYear = this.currentDecade * 20 + 1;
    this.toYear = this.fromYear + 20 - 1;
    const tempYears = [];
    for (let i = this.fromYear; i <= this.toYear; ++i) {
      tempYears.push(i);
    }
    while (tempYears.length) {
      this.years.push(tempYears.splice(0, 5));
    }
  }
  selectYear(event) {
    const year = parseInt(event.target.innerText);
    if (this.startActiveYear <= year && year <= this.endActiveYear) {
      const selectedYear = event.target.innerText + "年";
      if (this.Year !== selectedYear) {
        this.changeValue.emit(event.target.innerText);
      }
      this.Year = selectedYear;
    }
  }
  onFocus() {
    this.yearSelection.nativeElement.classList.add("on-focus-input");
  }
  onBlur() {
    this.yearSelection.nativeElement.classList.remove("on-focus-input");
  }
  @HostListener("document:click", ["$event"])
  clickout(event) {
    if (event.target != this.yearSelection.nativeElement) {
      this.isHiddenYearPanel = false;
    }
    if (this.increaseYearel) {
      if (
        event.target == this.increaseYearel.nativeElement ||
        event.target == this.decreaseYearel.nativeElement
      ) {
        this.isHiddenYearPanel = true;
      }
    }
  }
  increaseYear() {
    this.years = [];
    this.currentDecade += 1;
    this.generateYearPanelData();
  }
  decreaseYear() {
    this.years = [];
    this.currentDecade -= 1;
    this.generateYearPanelData();
  }
  initialEndActiveYear() {
    const currrent = new Date();
    this.endActiveYear = currrent.getFullYear();
  }
}
