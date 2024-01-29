//import puppeteer from "puppeteer";

export const generate = async (req: any, res: any) => {
    //let code: string = 'reached generate route';
    const apiKey = req.body.apiKey;
    const userPrompt = req.body.prompt;

    let maxAttempts = 3;
    let code = '';
    let logs = '';
    let passing = false;
    let currPrompt = addInstruct(userPrompt)
    for (let i = 0; i < maxAttempts && !passing; i++) {
        code = await prompt(currPrompt, apiKey);
        code = trimToJS(code);
        //logs = await logAndRun(code);
        //passing = await isPassing(code, logs, apiKey);
        if (!passing) {
            currPrompt = addInstruct("Could you give a corrected version of this code? The logs read: " + logs + " And the code reads: " + code);
        }
    }

    res.status(200).json({ code });
}

function addInstruct(prompt: string): string {
    return prompt + ' Furthermore, could you make sure that this is actually done in JavaScript instead? And could you make sure that, in your response, you give ONLY code (no text or explanation, except in CODE comments), with a simple test in the code itself using console.log statments?';
}

async function prompt(prompt: string, apiKey: string): Promise<string> {
    const requestData = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt}],
        temperature: 0.7,
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestData),
        });
    
    let code = '';
    if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.choices[0].message.content);
        code = responseData.choices[0].message.content;
    } else {
        console.error('Failed to fetch data:', response.status, response.statusText);
        code = "Failed to fetch data: " + response.status + " " + response.statusText;
    }
    return code;
}

/*async function logAndRun(code: string): Promise<string> {
        // Launch a headless browser
    const browser = await puppeteer.launch();
    // Create a new page
    const page = await browser.newPage();
    // Your HTML and JavaScript code as strings
    const html = '<html><body><h1>Hello, Puppeteer!</h1></body></html>';
    const script = `
        // Capture console log output as a string
        const consoleOutput = [];
        const originalConsoleLog = console.log;
        console.log = function() {
        consoleOutput.push(Array.from(arguments).map(String).join(' '));
        originalConsoleLog.apply(console, arguments);
        };

        ${code}

        // Return the console log output
        return consoleOutput.join('\\n');
    `;

    // Set the HTML content and execute JavaScript
    await page.setContent(html);
    const consoleLogOutput = await (page.evaluate(script)) as string;
    // Close the browser
    await browser.close();
    return consoleLogOutput;
}

async function isPassing(code: string, logs: string, apiKey: string): Promise<boolean> {
    const response = await prompt("Here is the code: " + code + "Based on the following logs, does this code looks like it ran ran properly? (if yes, please include the word fantastic in your response): " + logs + " ", apiKey);
    return response.toLowerCase().includes('fantastic');
}*/

function trimToJS(inputString: string): string {
    const startMarker = '```javascript';
    const endMarker = '```';

    const startIndex = inputString.indexOf(startMarker);
    const endIndex = inputString.indexOf(endMarker, startIndex + startMarker.length);
    
    let code = '';
    if (startIndex !== -1 && endIndex !== -1) {
        code = inputString.substring(startIndex + startMarker.length, endIndex).trim();
    }
    return code;
}