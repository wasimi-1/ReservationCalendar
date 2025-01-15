import {Component} from '@angular/core';
import {CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {FullCalendarModule} from '@fullcalendar/angular';
import {RepositoryService} from './services/repository.service';
import interactionPlugin from '@fullcalendar/interaction';
import {CustomAlertComponent} from "./custom-alert/custom-alert.component";
import {MatDialog} from "@angular/material/dialog";
import {RouterOutlet } from '@angular/router';
import { AlertComponent } from "./alert/alert.component";
import { AlertService } from './services/alert.service';
import { AlertTypeEnum } from './alert/types/alertType.enum';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FullCalendarModule, AlertComponent,RouterOutlet, AlertComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  alertTypes = AlertTypeEnum; 
  title = 'ReservationCalendar';
  events: any[] = [];

  

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    weekends: true,
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    events: []
  };


  constructor(private repositoryService: RepositoryService, private dialog: MatDialog, private alertService: AlertService) {
  }


  ngOnInit() {
    this.repositoryService.createMockEvents().subscribe((events: any) => {
      this.calendarOptions.events = events;
      console.log(this.calendarOptions.events);
    })
    this.repositoryService.getAllReservations().subscribe(
      (events: any) => {
        this.calendarOptions.events = events;
      }
    );
  }

  handleDateClick(arg
                  :
                  any
  ) {

    console.log('Date clicked:', arg.dateStr);
  }

  handleEventClick(info: any):
    void {
    // `info` contains details about the clicked event
    const eventTitle = info.event.title;
    const eventStart = info.event.start.getHours();
    const eventEnd = info.event.end.getHours();

    console.log(info.event);
    console.log(info.event.extendedProps);


    // Open a custom dialog to display event details or allow further interaction
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      width: '400px',
      data: {
        title: `${eventTitle}`,
        message: `Podaj imie i nazwisko do rezerwacji w godzinach ${eventStart} - ${eventEnd}.`,
        showInput: true,
        // event: info.event
        event: {start: info.event.start, end: info.event.end, title: info.event.title, Identifier: info.event.extendedProps.Identifier}
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== null) {
        console.log(`User input for event "${eventTitle}":`, result);
      } else {
        console.log('User canceled the event details interaction');
      }
    });

  }

  showAlert(type: AlertTypeEnum, text: string){
    this.alertService.setAlert({
      type,
      text,
    });
}
}

