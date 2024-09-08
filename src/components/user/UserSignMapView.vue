<template>
  <div>집 주소 {{ location.latitude }} / {{ location.longitude }}</div>
  <div
    id="map"
    style="position: relative; width: 100%; height: 300px; z-index: 10009"
  ></div>
</template>

<script setup>
import { onMounted, reactive } from "vue";

// 부모한테 전달할 location 값을 reactive로 변경
const location = reactive({
  latitude: 0,
  longitude: 0,
});
const emitLocation = defineEmits(["handleLocation"]);

onMounted(() => {
  if (!("geolocation" in navigator)) {
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      console.log(pos.coords.latitude, pos.coords.longitude);

      location.latitude = pos.coords.latitude;
      location.longitude = pos.coords.longitude;

      //   initMap();
      if (window.kakao && window.kakao.maps) {
        console.log("Kakao maps already loaded");
        initMap();
      } else {
        const script = document.createElement("script");
        script.onload = () => {
          console.log("Kakao maps script loaded");
          kakao.maps.load(initMap);
        };
        script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=46a397710eafda98fface8d44f6f4e14";

        document.head.appendChild(script);
      }
    },
    (err) => {
      alert(err.message);
    }
  );
});

const initMap = () => {
  console.log("initMap");
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(location.latitude, location.longitude),
    level: 3,
  };

  const map = new kakao.maps.Map(container, options);

  const markerPosition = new kakao.maps.LatLng(
    location.latitude,
    location.longitude
  );

  // 부모에게 location 전달
  emitLocation("handleLocation", location);

  // 마커를 생성합니다
  const marker = new kakao.maps.Marker({
    position: markerPosition,
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);

  // 지도에 클릭 이벤트를 등록합니다
  kakao.maps.event.addListener(map, "click", function (mouseEvent) {
    const latlng = mouseEvent.latLng;

    // 마커 위치를 클릭한 위치로 옮깁니다
    marker.setPosition(latlng);

    // location 값 업데이트
    location.latitude = latlng.getLat();
    location.longitude = latlng.getLng();

    // 부모에게 location 전달
    emitLocation("handleLocation", location);
  });
};
</script>

<style lang="scss" scoped>
#map {
  position: relative;
  z-index: 10009;
}
</style>
