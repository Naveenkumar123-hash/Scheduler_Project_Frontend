import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private http:HttpClient){}
  ngOnInit() {
    this.http.get('https://scheduler-project-naveens-projects-8b0f9405.vercel.app/').subscribe(
        (response) => {
            console.log(response); // Should log: { message: 'baseroute', status: 200 }
        },
        (error) => {
            console.error(error);
        }
    );
}

  title = 'frontend';
}
