import { Component, Input, OnChanges } from '@angular/core';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Infoprod } from '../../interfaces/infoprod';
import { ProdutosService } from '../../services/produtos.service';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
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
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    ListComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnChanges {
  @Input() selectedItem!: number;

  produto!: Observable<Infoprod[]>;

  constructor(private infoProdService: ProdutosService) {}


  ngOnChanges(): void {
    if (this.selectedItem) {
      this.produto = this.infoProdService.getProduto(this.selectedItem.toString());
    }
  }

  /*   ngOnInit(): void {
    if (this.selectedItem) {
      this.infoProdService.getProduto(this.selectedItem.toString()).subscribe(
        (data: Infoprod[]) => {
          this.produto = of(data);
          console.log(this.produto);
        },
        (error) => {
          console.log(error);
          this.produto = of([]);
        }
      );
    }
  } */

  onEditItem() {}

  /*  getProduto(): Observable<Infoprod[]> {
    if (this.selectedItem) {
      return this.infoProdService.getProduto(this.selectedItem.toString());
    }
    return new Observable<Infoprod[]>((observer) => {
      observer.next([]);
      observer.complete();
    });
  } */
}
