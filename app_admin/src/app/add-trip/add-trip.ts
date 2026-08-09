import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../trip-data';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-trip.html',
  styleUrl: './add-trip.css'
})
export class AddTripComponent implements OnInit {
  trip: any = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  constructor(
    private tripDataService: TripDataService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSubmit(): void {
    this.tripDataService.addTrip(this.trip).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (error: any) => {
        console.error('Error adding trip:', error);
      }
    });
  }
}