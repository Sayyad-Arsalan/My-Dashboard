// src/app/services/api-handler.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudapiService {
  private readonly baseUrl = 'https://mern-portfolio-backend-ng23.onrender.com/api/v1'; // replace with your backend URL

  constructor(private http: HttpClient) {}

  // Create a new entity
  create<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, this.getHeaders());
  }

  // Get all entities
  getAll<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, this.getHeaders(),);
  }

  // Get a single entity by ID
  getOne<T>(endpoint: string, id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id}`, this.getHeaders());
  }

  // Update an existing entity by ID
  update<T>(endpoint: string, id: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}/${id}`, data, this.getHeaders());
  }

  // Delete an entity by ID
  delete<T>(endpoint: string, id: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}/${id}`, this.getHeaders());
  }

  // Optional: Centralize headers
  private getHeaders() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}` // if you need authorization
    },
  );
    return { headers, withCredentials: true };
  }
}
