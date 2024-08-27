import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: "037186f9-0881-424a-beec-0aeca3952e72",  // Replace with your actual client ID from Azure
        authority: "https://login.microsoftonline.com/99f6c824-7f02-4c02-9f57-8e581af8d383",  // Replace with your tenant ID
        redirectUri: "http://localhost:8082/",  // This is where the MSAL login popup will redirect back to your app
        postLogoutRedirectUri: "http://localhost:8082/"
    },
    cache: {
        cacheLocation: "localStorage",  // You can use "sessionStorage" if preferred
        storeAuthStateInCookie: true,  // Set to true for IE11 or lower
    }
};

const loginRequest = {
    scopes: ["User.Read"]  // Adjust scopes as needed
};

const msalInstance = new PublicClientApplication(msalConfig);

export { msalInstance, loginRequest };
