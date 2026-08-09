import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card';
import { TripDataService } from '../trip-data';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListingComponent implements OnInit {
  trips: any[] = [];
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getStuff();
  }

  getStuff(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value: any[]) => {
        this.trips = [...value];
        this.message = `There are ${value.length} trips available.`;
        console.log('Trips loaded:', value);
        this.cd.detectChanges();
      },
      error: (error: any) => {
        console.error('Error fetching trips:', error);
        this.message = 'Error fetching trips.';
      }
    });
  }
}