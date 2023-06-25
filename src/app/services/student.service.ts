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

  readByName(searchString): Observable<any> {
    return this.httpClient.get(`${baseURL}api/Student/SearchStudents?searchString=${searchString}`);
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

  deleteFee(id): Observable<any> {
    return this.httpClient.delete(`${baseURL}api/Fees?studentFeesID=${id}`);
  }

  readFee(id): Observable<any> {
    return this.httpClient.get(`${baseURL}api/Fees?feesID=${id}`);
  }

  updateFee(data): Observable<any> {
    return this.httpClient.put(baseURL + 'api/Fees', data);
  }

  readAllPaymentList(fromDate, toDate): Observable<any> {
    return this.httpClient.get(`${baseURL}api/FeesReceipts/GetPaymentList?fromDate=${fromDate}&toDate=${toDate}`);
  }

  deletePayment(id): Observable<any> {
    return this.httpClient.delete(`${baseURL}api/FeesReceipts?feeReceiptID=${id}`);
  }

  updatePayment(data): Observable<any> {
    return this.httpClient.put(baseURL + 'api/FeesReceipts', data);
  }

  readPayment(id): Observable<any> {
    return this.httpClient.get(`${baseURL}api/FeesReceipts?feesreceiptID=${id}`);
  }

  readStudentStatistics(): Observable<any> {
    return this.httpClient.get(baseURL + 'api/Dashboard/StudentSummary');
  }

  readFeesStatistics(): Observable<any> {
    return this.httpClient.get(baseURL + 'api/Dashboard/FeesSummary');
  }

 
  public feeFilter = {
    fromDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + 1,
    toDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
    onlyPending: false
  };
}
