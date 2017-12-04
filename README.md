# Watson Token Generator sample usage

Basic Node.js server with a form that accepts a service's credentials and URL and returns an [auth token](https://www.ibm.com/watson/developercloud/doc/common/getting-started-tokens.html).

May be run from IBM Cloud, a Raspberry Pi, etc. Automatically redirects to HTTPS when running on Bluemix.
In this sample the **Watson Conversation Service** is used to reuse **generated Token** to get the workspace information.

## Usage

1. Call the local URL **http://localhost:8080/**
2. Insert API **User** and **password** from your running **Watson Conversation Service**
3. Insert the gatway URL: **https://gateway.watsonplatform.net/conversation/api**
4. Press **generate token**
5. Call the local URL **http://localhost:8080/usetoken**
6. Now you should see your workspace information

Inside this Server the Token is stored in the variable **token_to_use** and this token will be used for the hard coded sample URL defined in the variables **thePath_URL = theProtocoll + theHost + wcs_action_url + wcs_version_date;**.

## Running locally

Requires [Node.js](https://nodejs.org/en/).
Then clone or [download](https://github.com/watson-developer-cloud/token-generator/archive/master.zip) the code, and run:

```sh
npm install
npm start
```

## Security

Due to the security implications, it is recommended that you run your own copy of this code rather than using someone else's,
and that you always use HTTPS.
