// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ACCESS_POINT_POSTS: "https://poliradio.poligran.edu.co/wp-json/wp/v2/posts/?page=",
  ACCESS_POINT_STREAMING_INFO: "http://poliradio.airtime.pro/api/live-info",
  ACCESS_POINT_STREAMING: "https://poliradio.out.airtime.pro/poliradio_b",
  ACCESS_POINT_POSTIMAGES: "https://poliradio.poligran.edu.co/wp-json/wp/v2/media/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
