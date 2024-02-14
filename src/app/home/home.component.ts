import { Component, ElementRef, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Inject, Optional, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
//import { Button, ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'Autocode';
  NG_APP_HELLO = import.meta.env['NG_APP_HELLO'];
  NG_APP_GENERATE_URL = import.meta.env['NG_APP_GENERATE_URL'];
  data!: string;
  baseURL!: string;
  isServer: boolean;
  codeForm: FormGroup;
  @ViewChild('spinner') spinner!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    @Optional() @Inject('serverUrl') private serverUrl: string,
    private http: HttpClient
  ) {
    this.codeForm = new FormGroup({
      prompt: new FormControl(''),
      apiKey: new FormControl(''),
      codeOutput: new FormControl(''),
    });
    this.isServer = isPlatformServer(this.platformId);

    console.log("ServerUrl variable is: " + this.serverUrl);
    console.log("Default url is : " + this.document.location.origin + '/');
    // get base url
    if (this.isServer && this.serverUrl) {
      this.baseURL = this.serverUrl; //this.appBaseHref
    } else {
      this.baseURL = this.document.location.origin + '/';
    }

    // grab data
    //this.getData().then((data) => this.data = data.r);
  }

  /*onSubmit(): void {
    if (this.codeForm.valid) {
      const formData = this.codeForm.value;
      console.log("Form submitted!")
      this.generateCode(formData);
    }
  }*/
  onSubmit(): void {
    if (this.codeForm.valid) {
      const formData = this.codeForm.value;
      this.generateCode(formData);
    }
  }

  async generateCode(formData: any): Promise<void> {
    console.log("formData before post: " + formData);
    console.log("GENERATE_URL: " + this.NG_APP_GENERATE_URL);
    this.spinner.nativeElement.classList.remove('hidden');
    this.spinner.nativeElement.classList.add('spinning');
    try {
      const response  = await firstValueFrom(
        this.http.post<{code: string}>(this.NG_APP_GENERATE_URL, formData, {
        //this.http.post<{code: string}>('http://localhost:3000/api/generate', formData, {
        //this.http.post<{code: string}>(this.baseURL + 'api/generate', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'json'
        })
      );

      this.codeForm.patchValue({ codeOutput: response.code });
    } catch (error) {
      console.error('Error generating code:', error);
    }
    this.spinner.nativeElement.classList.remove('spinning');
    this.spinner.nativeElement.classList.add('hidden');

  }

  /*async getData(): Promise<any> {
    return await firstValueFrom(
      this.http.get(this.baseURL + 'api/me', {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'json'
      })
    );
  };*/
  }

