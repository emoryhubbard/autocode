import { Component, ElementRef, ViewChild } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Inject, Optional, PLATFORM_ID } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
//import { initializeApp } from 'firebase/app';
//import { getFirestore } from 'firebase/firestore';
//import { Button, ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.css'
})
export class CreateJobComponent {
  title = 'Autocode';
  NG_APP_HELLO = import.meta.env['NG_APP_HELLO'];
  NG_APP_GENERATE_URL = import.meta.env['NG_APP_GENERATE_URL'];
  NG_APP_REMOTE = import.meta.env['NG_APP_REMOTE'];
  data!: string;
  baseURL!: string;
  isServer: boolean;
  codeForm: FormGroup;
  @ViewChild('spinner') spinner!: ElementRef;
  @ViewChild('featureSubmitted') featureSubmitted!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    @Optional() @Inject('serverUrl') private serverUrl: string,
    private http: HttpClient
  ) {
    this.codeForm = new FormGroup({
      prompt: new FormControl(''),
      repoURL: new FormControl(''),
      dotenvContents: new FormControl(''),
      autocodeDotenv: new FormControl('PROD="false"\t# This should stay false\nCHATGPT_APIKEY="your key here"\nPORT="4000"\t# Or any other port not used by your repo'),
      serviceJSON: new FormControl(''),
      stepDescription1: new FormControl(''),
      testPath1: new FormControl(''),
      showHTML1: new FormControl(''),
      fileName1: new FormControl(''),
      filePath1: new FormControl(''),
      secondFileName1: new FormControl(''),
      secondFilePath1: new FormControl(''),
      stepDescription2: new FormControl(''),
      testPath2: new FormControl(''),
      showHTML2: new FormControl(''),
      fileName2: new FormControl(''),
      filePath2: new FormControl(''),
      secondFileName2: new FormControl(''),
      secondFilePath2: new FormControl(''),
      stepDescription3: new FormControl(''),
      testPath3: new FormControl(''),
      showHTML3: new FormControl(''),
      fileName3: new FormControl(''),
      filePath3: new FormControl(''),
      secondFileName3: new FormControl(''),
      secondFilePath3: new FormControl(''),
      stepDescription4: new FormControl(''),
      testPath4: new FormControl(''),
      showHTML4: new FormControl(''),
      fileName4: new FormControl(''),
      filePath4: new FormControl(''),
      secondFileName4: new FormControl(''),
      secondFilePath4: new FormControl(''),
      stepDescription5: new FormControl(''),
      testPath5: new FormControl(''),
      showHTML5: new FormControl(''),
      fileName5: new FormControl(''),
      filePath5: new FormControl(''),
      secondFileName5: new FormControl(''),
      secondFilePath5: new FormControl(''),
    });
    
    this.isServer = isPlatformServer(this.platformId);

    console.log("ServerUrl variable is: " + this.serverUrl);
    console.log("Default url is : " + this.document.location.origin + '/');
    console.log("NG_APP_REMOTE: " + this.NG_APP_REMOTE);
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
    console.log("formData before post: ");
    console.log(formData);
    console.log("GENERATE_URL: " + this.NG_APP_GENERATE_URL);
    this.spinner.nativeElement.classList.remove('hidden');
    this.spinner.nativeElement.classList.add('spinning');
    this.featureSubmitted.nativeElement.innerText = 'Submitting Feature...';
    try {
      const response  = await firstValueFrom(
        this.http.post<{code: string}>('http://localhost:4000/api/feature', this.convertToFeature(formData), {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'json'
        })
      );
      this.featureSubmitted.nativeElement.innerText = 'Feature Submitted!';
    } catch (error) {
      console.error('Error generating code:', error);
    }
    this.spinner.nativeElement.classList.remove('spinning');
    this.spinner.nativeElement.classList.add('hidden');
    if (this.NG_APP_REMOTE == 'true') {
      
    }

  }
  convertToFeature(formData: any): any {
    const feature: any = {
      description: formData.prompt,
      repoURL: formData.repoURL,
      dotenvContents: formData.dotenvContents,
      autocodeDotenv: formData.autocodeDotenv,
      serviceJSON: formData.serviceJSON,
      status: "Not Started",
      steps: []
    };

    // Loop through steps 1 to 5
    for (let i = 1; i <= 5; i++) {
      const stepDescription = formData['stepDescription' + i];
      const fileName = formData['fileName' + i];
      const filePath = formData['filePath' + i];
      const secondFileName = formData['secondFileName' + i];
      const secondFilePath = formData['secondFilePath' + i];
      const testPath = formData['testPath' + i];
      const showHTML = formData['showHTML' + i];

      // If step description is empty, skip
      if (!stepDescription) continue;

      const step: any = {
        description: stepDescription,
        target: fileName,
        files: [
          {
            fileName: fileName,
            filePath: filePath,
            fileContents: "// Content of " + fileName + " file", // You might need to fetch file contents
            isTarget: true
          }
        ],
        testPath: testPath,
        showHTML: showHTML
      };

      // Add second file if applicable
      if (secondFileName && secondFilePath) {
        step.files.push({
          fileName: secondFileName,
          filePath: secondFilePath,
          fileContents: "// Content of " + secondFileName + " file", // You might need to fetch file contents
          isTarget: false
        });
      }

      feature.steps.push(step);
    }

    return feature;
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


