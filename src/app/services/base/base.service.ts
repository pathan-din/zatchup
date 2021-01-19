import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import * as fileSaver from 'file-saver';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  environment = environment
  dynamicJson: any
  public serverImagePath: any = this.environment.serverImagePath;
  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) { }

  getData(url, args?) {
    if (url.charAt(url.length - 1) !== '/')
      url = url.concat('/')
    let params: any
    if (args) {
      params = this.setParams(args)
    } else {
      params = new HttpParams()
    }
    return this.http.get(this.environment.baseUrl + url, { params })
  }
  getDateFormat(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  getDateReverseFormat(date) {
    return new Date(date);
  }
  setParams(params) {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(function (key) {
      if (params[key])
        httpParams = httpParams.append(key, params[key]);
    });
    return httpParams
  }

  downloadFile(url: any, args?: any): any {
    let params: any
    if (args) {
      params = this.setParams(args)
    } else {
      params = new HttpParams()
    }
    return this.http.get(this.environment.baseUrl + url, { params, responseType: 'blob' })
  }

  generateExcel(url: any, fileName: any, args?: any) {
    this.downloadFile(url, args).subscribe(response => {
      let blob: any = new Blob([response], { type: 'application/vnd.ms-excel' });
      const url = window.URL.createObjectURL(blob);
      fileSaver.saveAs(blob, fileName + '.xlsx');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  generatePdf(url: any, fileName: any, args?: any) {
    this.downloadFile(url, args).subscribe(response => {
      let blob: any = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      fileSaver.saveAs(blob, fileName + '.pdf');
    }), error => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  action(url: any, data: any, args?: any) {
    // debugger
    // let obj = this.setActionData(data);
    let params: any
    if (args) {
      params = this.setParams(args)
    } else {
      params = new HttpParams()
    }
    return this.http.post(this.environment.baseUrl + url, data, { params })
  }

  actionForPutMethod(url: any, data: any, args?: any) {
    let params: any
    if (args) {
      params = this.setParams(args)
    } else {
      params = new HttpParams()
    }
    return this.http.put(this.environment.baseUrl + url, data, { params })
  }

  setActionData(data) {
    let obj = {}
    Object.keys(data).forEach(function (key) {
      if (!data[key])
        delete data[key]
    });
    return obj
  }

  actionForFormData(url: any, data: any) {
    console.log(this.setFormData(data));

    return this.http.post(this.environment.baseUrl + url, this.setFormData(data))
  }

  setFormData(data) {
    
    const formData = new FormData();
    Object.keys(data).forEach(function (key) {
      if (data[key]) {

        formData.append(key, data[key]);

      }
      
    });
    return formData;
  }

  //server Side Validation function
  getErrorResponse(loader, errors) {
    loader.hide();
    var errorCollection = '';
    let displayError = {};
    for (var key in errors) {
      displayError[key] = errors[key][0];
      if (errors[key][0]) {
        errorCollection = errorCollection + errors[key][0] + '\n'
      } else {
        errorCollection = errorCollection + JSON.stringify(errors[key]) + '\n'
      }
    }
    return errorCollection;
  }

  getCountsOfPage() {
    let arr = [5, 10, 20, 50, 100]
    return arr;
  }

  isLoggedIn() {
    return !!localStorage.getItem("token");
  }

}
