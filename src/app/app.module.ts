import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ResumeDashboardComponent } from './resume-dashboard/resume-dashboard.component';
import { WorkHistoryComponent } from './work-history/work-history.component';
import { EducationLevelComponent } from './education-level/education-level.component';
import { PreviewColumnComponent } from './preview-column/preview-column.component';
import { ProgressColumnComponent } from './shared/progress-column/progress-column.component';
import { AppRoutingModule } from './app.routes';
import { NavigationComponent } from './navigation/navigation.component';


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
    NavigationComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // <-- Add this line
  // bootstrap: [AppComponent]
})
export class AppModule { } 