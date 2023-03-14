Deployed Site: (Azure Static Web App):
https://kind-cliff-02ef4cd1e.2.azurestaticapps.net/

 
 If you want to deploy react app with env variables in azure static web app, create a /api to have your server th calls your azure functions and add the env varible stored in your app settings. follow these steps https://learn.microsoft.com/en-us/azure/static-web-apps/application-settings <br> 
 Then, it my frontend folder, I have an http trigger azure function that fetches the data from my other get azure function. (it could be better, but it seems that using azure functions with more functionality costs more for static sites.. so I opted for this way) In addition, this way I can use app settings as env for my api.
 <br>

TODO: <br>
- Clean code <br>
- recalculate total cost <br>


