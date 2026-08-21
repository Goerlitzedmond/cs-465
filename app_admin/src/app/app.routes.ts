import { Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing';
import { AddTripComponent } from './add-trip/add-trip';
import { EditTripComponent } from './edit-trip/edit-trip';
import { LoginComponent } from './login/login';
import { AuthGuard } from './auth-guard';

export const routes: Routes = [
  { path: '', component: TripListingComponent },
  { path: 'add-trip', component: AddTripComponent, canActivate: [AuthGuard] },
  { path: 'edit-trip', component: EditTripComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];