import { MyOrderDeleteComponent } from './user/my-order-delete/my-order-delete.component';
import { MyOrderDetailsComponent } from './user/my-order-details/my-order-details.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { OrderComponent } from './order/order.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { ManagerHomeComponent } from './manager/manager-home/manager-home.component';
import { TourListComponent } from './manager/tour-list/tour-list.component';
import { TourCreateEditComponent } from './manager/tour-create-edit/tour-create-edit.component';
import { TourDeleteComponent } from './manager/tour-delete/tour-delete.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InfotourListComponent } from './tours/infotour-list/infotour-list.component';
import { InfotourDetailsComponent } from './tours/infotour-details/infotour-details.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserCreateEditComponent } from './admin/user-create-edit/user-create-edit.component';
import { UserDeleteComponent } from './admin/user-delete/user-delete.component';
import { OrderListComponent } from './manager/order-list/order-list.component';
import { OrderDetailsComponent } from './manager/order-details/order-details.component';
import { InfotourListResolver } from './_resolves/infotour-list.resolver';
import { InfotourDetailsResolver } from './_resolves/infotour-details.resolver';
import { TransportListComponent } from './manager/transport-list/transport-list.component';
import { CountryListComponent } from './manager/country-list/country-list.component';
import { TransportCreateEditComponent } from './manager/transport-create-edit/transport-create-edit.component';
import { TransportDeleteComponent } from './manager/transport-delete/transport-delete.component';
import { CountryCreateEditComponent } from './manager/country-create-edit/country-create-edit.component';
import { CountryDeleteComponent } from './manager/country-delete/country-delete.component';
import { RoleListComponent } from './admin/role-list/role-list.component';
import { RoleCreateEditComponent } from './admin/role-create-edit/role-create-edit.component';
import { RoleDeleteComponent } from './admin/role-delete/role-delete.component';
import { UserAccessRightsComponent } from './admin/user-access-rights/user-access-rights.component';
import { MyOrderListComponent } from './user/my-order-list/my-order-list.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'infotours', component: InfotourListComponent,
    resolve: {tours: InfotourListResolver} },
  {path: 'infotours/:id', component: InfotourDetailsComponent,
    resolve: {tour: InfotourDetailsResolver} },
  {path: 'order/:id', component: OrderComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'admin', component: AdminHomeComponent,
  canActivate: [AuthGuard],
   children: [
    {path: 'users', component: UserListComponent},
    {path: 'user/create', component: UserCreateEditComponent},
    {path: 'user/edit/:id', component: UserCreateEditComponent},
    {path: 'user/delete/:id', component: UserDeleteComponent},
    {path: 'user/rights/:id', component: UserAccessRightsComponent},
    {path: 'roles', component: RoleListComponent},
    {path: 'role/create', component: RoleCreateEditComponent},
    {path: 'role/edit/:id', component: RoleCreateEditComponent},
    {path: 'role/delete/:id', component: RoleDeleteComponent},
    {path: '', redirectTo: 'users', pathMatch: 'full'}
  ]},
  {path: 'manager', component: ManagerHomeComponent,
  canActivate: [AuthGuard],
  children: [
    {path: 'tours', component: TourListComponent},
    {path: 'tour/create', component: TourCreateEditComponent},
    {path: 'tour/edit/:id', component: TourCreateEditComponent},
    {path: 'tour/delete/:id', component: TourDeleteComponent},
    {path: 'orders', component: OrderListComponent},
    {path: 'orders/:id', component: OrderDetailsComponent},
    {path: 'orders/edit/:id', component: TransportCreateEditComponent},
    {path: 'transports', component: TransportListComponent},
    {path: 'transports/create', component: TransportCreateEditComponent},
    {path: 'transports/edit/:id', component: TransportCreateEditComponent},
    {path: 'transports/delete/:id', component: TransportDeleteComponent},
    {path: 'countries', component: CountryListComponent},
    {path: 'countries/create', component: CountryCreateEditComponent},
    {path: 'countries/edit/:id', component: CountryCreateEditComponent},
    {path: 'countries/delete/:id', component: CountryDeleteComponent},
    {path: '', redirectTo: 'tours', pathMatch: 'full'}
  ]},
  {path: 'user', component: UserHomeComponent,
  canActivate: [AuthGuard],
  children: [
    {path: 'orders', component: MyOrderListComponent},
    {path: 'orders/:id', component: MyOrderDetailsComponent},
    {path: 'orders/delete/:id', component: MyOrderDeleteComponent},
    {path: '', redirectTo: 'orders', pathMatch: 'full'}
  ]},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

