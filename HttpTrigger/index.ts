import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as Prism from 'prismjs';
import * as loadLanguages from 'prismjs/components/index.js';
loadLanguages();

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    if(req.method === "GET") {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Ok"
        };
        return;
    }
    const data = req.rawBody;
    if(!data.startsWith('```')) {
        context.res = {
            status: 200,
            body: req.rawBody
        }
        return
    }
    const regex = data.match(/^```([a-zA-Z]*)$/m)
    const lang = regex[1]
    if(!lang) {
        context.res = {
            status: 200,
            body: req.rawBody
        }
        return
    }
    const highlighted = Prism.highlight(data.replace(/```[a-zA-Z]*/m, '').replace('```', ''), Prism.languages[lang], lang)
  
    // remove any backticks and the language
      const highlightedCleaned = highlighted.trim()
      context.res = {
        status: 200,
        body: `<pre><code>${highlightedCleaned}</code></pre>`
    }
    return

};

export default httpTrigger;