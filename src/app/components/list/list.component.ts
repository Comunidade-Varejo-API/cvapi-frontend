import { Component } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Infoprod } from '../../interfaces/infoprod';
import { Observable, of } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    AsyncPipe,
    MatCardModule,
    MatAccordion,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatButton,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  produto: Infoprod = {
    hascode: false,
    id: 0,
    CEST: '',
    DESCRICAO: '',
    CST: '',
    NCM: '',
  };

  constructor() {}
}
