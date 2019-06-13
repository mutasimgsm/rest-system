// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
      apiKey: "AIzaSyBAC__mGzzQPlU6OvvAjosB-_xgMFGi8wY",
      authDomain: "rest-billing-sys.firebaseapp.com",
      databaseURL: "https://rest-billing-sys.firebaseio.com",
      projectId: "rest-billing-sys",
      storageBucket: "rest-billing-sys.appspot.com",
      messagingSenderId: "930946336996"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
