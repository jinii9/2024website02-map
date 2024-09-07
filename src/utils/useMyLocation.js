// import { reactive } from "vue";

// export function myLocation() {
//   const location = reactive({
//     latitude: 0,
//     longitude: 0,
//   });

//   if (!("geolocation" in navigator)) {
//     return;
//   }

//   navigator.geolocation.getCurrentPosition(
//     (pos) => {
//       //   console.log(pos.coords.latitude, pos.coords.longitude);

//       location.latitude = pos.coords.latitude;
//       location.longitude = pos.coords.longitude;

//       return location;
//     },
//     (err) => {
//       alert(err.message);
//     }
//   );
// }

// utils/myLocation.js
import { reactive } from "vue";

export function useMyLocation() {
  const location = reactive({
    latitude: 0,
    longitude: 0,
  });

  if (!("geolocation" in navigator)) {
    console.error("Geolocation not supported");
    return location;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      location.latitude = pos.coords.latitude;
      location.longitude = pos.coords.longitude;
    },
    (err) => {
      alert(err.message);
    }
  );

  return location;
}
