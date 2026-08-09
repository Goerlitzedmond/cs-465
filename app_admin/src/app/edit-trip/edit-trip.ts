import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../trip-data';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTripComponent implements OnInit {
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
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const tripCode = localStorage.getItem('tripCode') || '';
    if (tripCode) {
      this.tripDataService.getTrip(tripCode).subscribe({
        next: (value: any) => {
          this.trip = Array.isArray(value) ? {...value[0]} : {...value};
          this.cd.detectChanges();
          console.log('Trip loaded into form:', this.trip);
        },
        error: (error: any) => {
          console.error('Error fetching trip:', error);
        }
      });
    }
  }

  onSubmit(): void {
    this.tripDataService.updateTrip(this.trip).subscribe({
      next: () => {
        localStorage.removeItem('tripCode');
        this.router.navigate(['']);
      },
      error: (error: any) => {
        console.error('Error updating trip:', error);
      }
    });
  }
}