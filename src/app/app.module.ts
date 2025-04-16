import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ResumeDashboardComponent } from './resume-dashboard/resume-dashboard.component';
import { WorkHistoryComponent } from './work-history/work-history.component';
import { EducationLevelComponent } from './education-level/education-level.component';
import { PreviewColumnComponent } from './preview-column/preview-column.component';
import { ProgressColumnComponent } from './shared/progress-column/progress-column.component';
import { AppRoutingModule } from './app.routes';
import { NgSelectModule } from '@ng-select/ng-select';
import { PortalModule } from '@angular/cdk/portal';



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
    PortalModule 
    
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // <-- Add this line
  // bootstrap: [AppComponent]
})
export class AppModule { } 