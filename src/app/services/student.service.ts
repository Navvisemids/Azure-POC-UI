import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = 'https://localhost:44319/';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  readAll(): Observable<any> {
    return this.httpClient.get(baseURL + 'api/Student');
  }

  read(id): Observable<any> {
    return this.httpClient.get(`${baseURL}api/Student/${id}`);
  }

  create(data): Observable<any> {
    return this.httpClient.post(baseURL + 'api/Student', data);
  }

  update(id, data): Observable<any> {
    return this.httpClient.put(baseURL + 'api/Student', data);
  }

  delete(id): Observable<any> {
    return this.httpClient.delete(`${baseURL}api/Student/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(baseURL + 'api/Student');
  }

  searchByName(name): Observable<any> {
    return this.httpClient.get(`${baseURL}api/Student?name=${name}`);
  }

  getStudentCourse(id): Observable<any> {
    return this.httpClient.get(`${baseURL}api/StudentCourse?_studentId=${id}`);
  }

  readAllCourses(): Observable<any> {
    return this.httpClient.get(baseURL + 'api/Course');
  }

  updateStudentCourse(id, data): Observable<any> {
    return this.httpClient.post(baseURL + 'api/StudentCourse', data);
  }

  generateFees(date): Observable<any> {
    return this.httpClient.get(`${baseURL}api/FeesReceipts/GenerateFees?feesDate=${date}`);
  }

  readAllFeeList(fromDate, toDate, onlyPending): Observable<any> {
    return this.httpClient.get(`${baseURL}api/Fees/GetFeesList?fromDate=${fromDate}&toDate=${toDate}&onlyPending=${onlyPending}`);
  }

  deleteFee(data): Observable<any> {
    return this.httpClient.delete(`${baseURL}api/Fees`, data);
  }
  
}
