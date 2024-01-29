import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Inject, Optional, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, ReactiveFormsModule],
})
export class AppComponent {
  title = 'angular-endpoint-test6';

  data!: string;
  baseURL!: string;
  isServer: boolean;
  codeForm: FormGroup;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    @Optional() @Inject('serverUrl') private serverUrl: string,
    private http: HttpClient,
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
    this.getData().then((data) => this.data = data.r);
  }

  onSubmit(): void {
    if (this.codeForm.valid) {
      const formData = this.codeForm.value;
      console.log("Form submitted!")
      //this.generateCode(formData);
    }
  }

  async generateCode(formData: any): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.post(this.baseURL + 'api/generate-code', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'json'
        })
      );

      // Assuming response.result contains the generated code
      //this.codeForm.patchValue({ codeOutput: response?.result });
    } catch (error) {
      console.error('Error generating code:', error);
    }
  }

  async getData(): Promise<any> {
    return await firstValueFrom(
      this.http.get(this.baseURL + 'api/me', {
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'json'
      })
    );
  };
}
