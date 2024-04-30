import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Observable, firstValueFrom } from 'rxjs';
import { debounceTime, filter, map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { ProdutosService } from '../../services/produtos.service';
import { Infoprod } from '../../interfaces/infoprod';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
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
        map((value) => (value ? value.trim() : '')), // Trim the input value
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
    const filterValue = value.toLowerCase();
    return this.options
      .filter((option) => option.toString().toLowerCase().includes(filterValue))
      .map((option) => option.id); // Assuming each Infoprod object has an 'id' property of type number
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
