// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  i18nPrefix: '.',

  apiGwBaseEndpoint: 'https://ixypa5nb2a.execute-api.eu-west-1.amazonaws.com/dev',
  chuckNorrisJokesApiPrefix: 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
  chuckNorrisJokesApiKey: '54652f8a13msh8ab1079554f5d96p159c86jsn42f12f84d527',
  googleApiPrefix: 'https://www.googleapis.com',
  googleAuth: {
    clientId: '786422237616-qkqo0m488fgph1boaknkth09ms3telo0.apps.googleusercontent.com',
    apiKey: 'AIzaSyB9euufbuEAXpAV4XoL9Apen-jyUEUqowA'
  },
  cognitoAuth: {
    userPoolId: 'eu-west-1_1aTbSXALN',
		userPoolClientId: '7og6bv7g2vjqro7hmhdd3c5j1f',
    identityPoolId: 'eu-west-1:d8745d4e-4c18-4524-84e6-00cd7b635b30',
		region: 'eu-west-1',
		oauth: {
			redirectSignIn: 'http://localhost:4200/home',
			redirectSignOut: 'http://localhost:4200/home',
			domain: 'nerdy-app.auth.eu-west-1.amazoncognito.com',
			responseType: 'token',
			scope:  ['openid', 'profile', 'email'],
		},
  },
  tmdbAuth: {
    apiBaseEndpoint: 'https://api.themoviedb.org/3',
    apiKeyV3: 'fc4dba0daa652b437303d1ba2ae1e8b9'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
