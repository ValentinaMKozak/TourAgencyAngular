import { TourDeleteComponent } from './manager/tour-delete/tour-delete.component';
import { TourCreateEditComponent } from './manager/tour-create-edit/tour-create-edit.component';
import { TourListComponent } from './manager/tour-list/tour-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
 import { ManagerHomeComponent } from './manager/manager-home/manager-home.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthModule } from 'angular2-jwt';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TourService } from './_services/tour.service';
import { UserListComponent } from './admin/user-list/user-list.component';
import { InfotourListComponent } from './tours/infotour-list/infotour-list.component';
import { InfotourDetailsComponent } from './tours/infotour-details/infotour-details.component';
import { InfotourCardComponent } from './tours/infotour-card/infotour-card.component';
import { PictureListComponent } from './manager/picture-list/picture-list.component';
import { PictureService } from './_services/picture.service';
import { AuthGuard } from './_guards/auth.guard';
import { UserCreateEditComponent } from './admin/user-create-edit/user-create-edit.component';
import { UserDeleteComponent } from './admin/user-delete/user-delete.component';
import { UserService } from './_services/user.service';
import { NgxGalleryModule } from 'ngx-gallery';
import { DailyProgramService } from './_services/dailyProgram.service';
import { OrderComponent } from './order/order.component';
import { OrderService } from './_services/order.service';
import { DailyProgramListComponent } from './manager/daily-program-list/daily-program-list.component';
import { FileUploadModule } from 'ng2-file-upload';
import { DailyProgramEditorComponent } from './manager/daily-program-editor/daily-program-editor.component';
import { AuthHttp, provideAuth } from 'angular2-jwt';
import { OrderListComponent } from './manager/order-list/order-list.component';
import { OrderDetailsComponent } from './manager/order-details/order-details.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { InfotourListResolver } from './_resolves/infotour-list.resolver';
import { InfotourDetailsResolver } from './_resolves/infotour-details.resolver';
import { DailyProgramCreateComponent } from './manager/daily-program-create/daily-program-create.component';
import { TransportService } from './_services/transport.service';
import { TransportListComponent } from './manager/transport-list/transport-list.component';
import { CountryListComponent } from './manager/country-list/country-list.component';
import { CountryService } from './_services/country.service';
import { TransportCreateEditComponent } from './manager/transport-create-edit/transport-create-edit.component';
import { TransportDeleteComponent } from './manager/transport-delete/transport-delete.component';
import { CountryCreateEditComponent } from './manager/country-create-edit/country-create-edit.component';
import { CountryDeleteComponent } from './manager/country-delete/country-delete.component';
import { RoleListComponent } from './admin/role-list/role-list.component';
import { RoleCreateEditComponent } from './admin/role-create-edit/role-create-edit.component';
import { RoleDeleteComponent } from './admin/role-delete/role-delete.component';
import { UserAccessRightsComponent } from './admin/user-access-rights/user-access-rights.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { MyOrderListComponent } from './user/my-order-list/my-order-list.component';
import { MyOrderDetailsComponent } from './user/my-order-details/my-order-details.component';
import { MyOrderDeleteComponent } from './user/my-order-delete/my-order-delete.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    UserListComponent,
    ManagerHomeComponent,
    TourListComponent,
    TourCreateEditComponent,
    TourDeleteComponent,
    HomeComponent,
    HeaderComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    InfotourListComponent,
    InfotourDetailsComponent,
    InfotourCardComponent,
    PictureListComponent,
    UserCreateEditComponent,
    UserDeleteComponent,
    OrderComponent,
    DailyProgramListComponent,
    DailyProgramEditorComponent,
    OrderListComponent,
    OrderDetailsComponent,
    DailyProgramCreateComponent,
    TransportListComponent,
    CountryListComponent,
    TransportCreateEditComponent,
    TransportDeleteComponent,
    CountryCreateEditComponent,
    CountryDeleteComponent,
    RoleListComponent,
    RoleCreateEditComponent,
    RoleDeleteComponent,
    UserAccessRightsComponent,
    UserHomeComponent,
    MyOrderListComponent,
    MyOrderDetailsComponent,
    MyOrderDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxGalleryModule,
    AuthModule,
    BsDropdownModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AlertifyService,
    UserService,
    TourService,
    PictureService,
    DailyProgramService,
    OrderService ,
    TransportService,
    CountryService,
    InfotourListResolver,
    InfotourDetailsResolver,
    AuthHttp,
    provideAuth({
        headerName: 'Authorization',
        headerPrefix: 'bearer',
        tokenName: 'token',
        tokenGetter: (() => localStorage.getItem('token')),
        globalHeaders: [{ 'Content-Type': 'application/json' }],
        noJwtError: true
    })

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

