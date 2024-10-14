import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Event {
    start_time: number;
    end_time: number;
}

@Component({
  selector: 'app-event-scheduler',
  templateUrl: './event-scheduler.component.html',
  styleUrls: ['./event-scheduler.component.scss']
})
export class EventSchedulerComponent {
  events: Event[] = [];
  startTime: number = 0;
  endTime: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.getEvents();
  }

  addEvent() {
      if (this.startTime < 0 || this.endTime > 23 || this.startTime >= this.endTime) {
          alert('Invalid event times');
          return;
      }

      this.http.post<Event>('https://scheduler-project-0jev.onrender.com/add-event', {
          start_time: this.startTime,
          end_time: this.endTime,
      }).subscribe(
          (response) => {
              this.events.push(response);
              this.startTime = 0;
              this.endTime = 0;
              this.getEvents();
          },
          (error) => {
              alert(error.error || 'Event overlaps with existing events');
          }
      );
  }

  

  getEvents() {
      this.http.get<Event[]>('https://scheduler-project-0jev.onrender.com/events').subscribe((events) => {
          this.events = events;
      });
  }
}
