import { NgModule } from '@angular/core';

// material angular
import {
    MatButtonModule,
    MatCardModule,
    MatBadgeModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatBadgeModule,
        MatMenuModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatBadgeModule,
        MatMenuModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
    ]
})
export class MaterialModule { }