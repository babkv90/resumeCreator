import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ResumeDashboardComponent } from './resume-dashboard/resume-dashboard.component';
import { WorkHistoryComponent } from './work-history/work-history.component';
import { EducationLevelComponent } from './education-level/education-level.component';
import { PreviewColumnComponent } from './preview-column/preview-column.component';
import { ProgressColumnComponent } from './shared/progress-column/progress-column.component';
import { AppRoutingModule } from './app.routes';
import { NgSelectModule } from '@ng-select/ng-select';
import { PortalModule } from '@angular/cdk/portal';
import { BlogsComponent } from './blogs/blogs.component';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
    // AppComponent,
    // ResumeDashboardComponent,
    // WorkHistoryComponent,
    // EducationLevelComponent,
    // PreviewColumnComponent,
    // ProgressColumnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    PortalModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    BlogsComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // bootstrap: [AppComponent]
})
export class AppModule { }