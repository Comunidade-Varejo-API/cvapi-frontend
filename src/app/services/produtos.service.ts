import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Infoprod } from '../interfaces/infoprod';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private apiUrl = 'https://infoprodapi.vercel.app';
  constructor(@Inject(HttpClient) private http: HttpClient) {}

  getProdutos() {
    return this.http.get<Array<Infoprod>>(this.apiUrl + '/produto/');
  }
  getProduto(id: string | null): Observable<Array<Infoprod>> {
    const url = `${this.apiUrl}/produto/${id}`;

    return this.http.get<Array<Infoprod>>(url);
  }

  criarProduto(infoprod: Infoprod) {
    return this.http.post<Infoprod>(this.apiUrl + '/produto/', infoprod);
  }

  atualizarProduto(infoprod: Infoprod) {
    return this.http.put<Infoprod>(
      this.apiUrl + '/produto/' + infoprod.id,
      infoprod
    );
  }
}
