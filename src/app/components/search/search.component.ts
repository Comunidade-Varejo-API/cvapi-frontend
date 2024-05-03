import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Observable, firstValueFrom, of } from 'rxjs';
import { debounceTime, filter, map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { ProdutosService } from '../../services/produtos.service';
import { Infoprod } from '../../interfaces/infoprod';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from '../list/list.component';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ListComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    HttpClientModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  @ViewChild(ListComponent) listComponent!: ListComponent;

  // selectedItem!: number;
  async onSelectItem($event: MatOptionSelectionChange<number>) {
    console.log('onSelectItem', $event);
    this.infoProdService
      .getProduto($event.source.value.toString())
      .subscribe({
        next: (product: any) => {
          this.listComponent.produto = product;
        },
        error: (error: any) => {
          console.error(error);
        },
        complete: () => {
          console.log('Observable completo');
        }
      });
    console.log(this.listComponent.produto);
  }

  filteredOptions!: Observable<number[]>;
  myControl = new FormControl('');
  products: Observable<Infoprod[]> = new Observable<Infoprod[]>();
  options: Infoprod[] = [];
  constructor(private infoProdService: ProdutosService) {}

  ngOnInit(): void {
    this.myControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300), // Wait for 300 milliseconds after the user stops typing
        map((value) => (value ? value : '')), // Trim the input value
        filter((value) => value.length >= 4) // Filter out values with less than 4 digits
      )
      .subscribe((value) => {
        this.infoProdService.getProdutos().subscribe((products) => {
          this.options = products.filter((product) =>
            product.id.toString().includes(value)
          );
          this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map((filterValue) => this._filter(filterValue || ''))
          );
        });
      });
  }
  private _filter(value: string): number[] {
    const filterValue = value;
    return this.options
      .filter((option) => option.toString().toLowerCase().includes(filterValue))
      .map((option) => option.id);
  }

  async fetchProduct(): Promise<Infoprod[]> {
    try {
      const product = await firstValueFrom(
        this.infoProdService.getProduto(this.myControl.value)
      );
      return product;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
