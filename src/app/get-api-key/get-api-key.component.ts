import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-get-api-key',
  standalone: true,
  imports: [RouterModule],
  //templateUrl: './get-api-key.component.html',
  template: `<main><h1>How to Get ChatGPT API Key</h1>
  <p>To get started with ChatGPT, you need an API key. Here's how to get it:</p>
  <ol>
      <li>First, create an OpenAI account or sign in. You can sign up or sign in <a href="https://platform.openai.com/docs/quickstart/account-setup" target="_blank">here</a>.</li>
      <li>Once logged in, navigate to the API key page.</li>
      <li>Click on "Create new secret key". You can optionally name the key for better organization.</li>
      <li>Make sure to save this API key somewhere safe and do not share it with anyone.</li>
  </ol>
  <p>Note: The keys themselves are free, but there is a very small cost to use the ChatGPT API. You need to add a minimum of $5 to your OpenAI account's credit balance to use the API key. Each use of the key deducts a small amount from this balance (currently about $.003 per use of Autocode, or 30 cents for 100 uses of Autocode). Once your balance reaches $0, the key will stop working until you add more funds.</p>
  <p>For more information on costs and billing, please refer to OpenAI's <a href="https://platform.openai.com/account/billing/overview" target="_blank">billing overview</a>.</p>
  <p>Once you have your API key, you can start using ChatGPT in AutoCode! Click <a [routerLink]="['/']">here</a> to go back to AutoCode's main page and generate JavaScript code automatically.</p></main>`,
  styleUrl: './get-api-key.component.css'
})
export class GetApiKeyComponent {

}
