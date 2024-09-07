<template>
  <div>{{ location.latitude }} / {{ location.longitude }}</div>
  <div id="map" style="width: 100%; height: 350px"></div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useMyLocation } from "../../utils/useMyLocation";
import store from "../../store/store";

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
  }));

  // 마커 이미지의 이미지 주소입니다
  const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

  positions.forEach((position) => {
    const imageSize = new kakao.maps.Size(24, 35); // 마커 이미지의 이미지 크기
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); // 마커 이미지를 생성합니다

    // 마커를 생성합니다
    new kakao.maps.Marker({
      map, // 마커를 표시할 지도
      position: position.latlng, // 마커를 표시할 위치
      title: position.title, // 마커의 타이틀
      image: markerImage, // 마커 이미지
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

<style lang="scss" scoped></style>
