<template>
  <!-- <div>{{ location.latitude }} / {{ location.longitude }}</div> -->
  <div id="map" style="width: 100%; height: 100%"></div>
  <img
    src="../../../public/img-avatars/1.png"
    alt=""
    style="width: 100px; height: 100px"
  />
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useMyLocation } from "../../utils/useMyLocation";
import store from "../../store/store";
// import {} from "../../../public/10.png"
const location = useMyLocation();

/** 지도 생성 함수 **/
const createMap = () => {
  const mapContainer = document.getElementById("map"); // 지도를 표시할 div
  const mapOption = {
    center: new kakao.maps.LatLng(location.latitude, location.longitude), // 지도의 중심좌표
    level: 4, // 지도의 확대 레벨
  };

  const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

  // 마커를 표시할 위치와 title 객체 배열입니다
  const positions = store.state.userData.map((user) => ({
    title: user.username,
    latlng: new kakao.maps.LatLng(
      user.location.latitude,
      user.location.longitude
    ),
    image: user.image,
  }));

  positions.forEach((position) => {
    const imageSize = new kakao.maps.Size(35, 35); // 마커 이미지의 이미지 크기

    let markerImage = new kakao.maps.MarkerImage(position.image, imageSize); // 마커 이미지를 생성합니다
    console.log(position.image);
    // ///////////
    // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    var content =
      '<div class="markerWrap d-inline-flex flex-column position-relative">' +
      '<div class="p-3 border rounded-circle bg-light">' +
      `<img src = ${position.image} alt="" class="image-fluid rounded-circle" style="width: 50px; height: 50px"/>` +
      "</div>" +
      '<div class="triangle-down">' +
      "</div>" +
      "</div>";

    //////////////
    // 커스텀 오버레이를 생성합니다
    new kakao.maps.CustomOverlay({
      map: map,
      position: position.latlng,
      content: content,
      yAnchor: 1,
    });
  });
};

// 지도 생성
onMounted(() => {
  createMap();
});

// location의 변화 감지
watch(
  () => location,
  (newLocation) => {
    // 위치 정보 업데이트 시, 지도 생성
    if (newLocation.latitude !== 0 && newLocation.longitude !== 0) {
      createMap();
    }
  },
  { deep: true } // 객체의 속성 변경을 관찰
);
</script>

<style lang="scss">
.mapContainer {
  //   position: absolute;
  //   width: 100%;
  //   height: 100%;
}

.triangle-down {
  width: 0;
  height: 0;
  border-bottom: 25px solid transparent;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-top: 25px solid gray;

  /* 위치 */
  position: absolute;
  bottom: -40px;
  z-index: 20;

  // 부모 컨테이너의 중앙에 위치하는 방법
  left: 50%; // 부모 요소의 왼쪽에서 50% 위치
  transform: translateX(-50%); // 자신의 너비의 50%만큼 왼쪽으로 이동
}
</style>
