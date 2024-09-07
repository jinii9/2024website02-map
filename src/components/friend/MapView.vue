<template>
  <!-- <div>{{ location.latitude }} / {{ location.longitude }}</div> -->
  <div id="map" style="width: 100%; height: 100%"></div>
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
    level: 6, // 지도의 확대 레벨
  };

  var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

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
    /** 마커&토글 스타일링 */
    // markerWrap div 생성
    const content = document.createElement("div");
    content.className = "markerWrap d-inline-flex gap-5 position-relative";

    // imgWrap div 생성
    const imgWrap = document.createElement("div");
    imgWrap.className = "imgWrap";

    // back-img img 요소 생성
    const backImg = document.createElement("img");
    backImg.src = "/public/marker.png";
    backImg.alt = "";
    backImg.className = "back-img";

    // main-img img 요소 생성
    const mainImg = document.createElement("img");
    mainImg.src = position.image;
    mainImg.alt = "";
    mainImg.className = "image-fluid rounded-circle main-img";

    content.appendChild(imgWrap);
    imgWrap.appendChild(backImg);
    imgWrap.appendChild(mainImg);

    // 다른 오버레이 표시
    // card div 생성
    const card = document.createElement("div");
    card.className = "card";
    card.style.width = "18rem ";
    card.style.marginLeft = "1rem";
    // card.style.display = "none";
    card.style.visibility = "hidden";

    // card-body div 생성
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // card-title h5 생성
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = "윤서진";

    // card-subtitle h6 생성
    const cardSubtitle = document.createElement("h6");
    cardSubtitle.className = "card-subtitle mb-2 text-body-secondary";
    cardSubtitle.textContent = "Seojin9";

    // card-text p 생성
    const cardText = document.createElement("p");
    cardText.className = "card-text lh-sm";
    cardText.textContent =
      "안녕? 나는 윤서진이야 ㅎㅎ 이 근처에 온다면 연락해줘^^";

    content.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSubtitle);
    cardBody.appendChild(cardText);

    /** 마커 생성 */
    var customOverlay = new kakao.maps.CustomOverlay({
      map: map,
      position: position.latlng,
      //   image: markerImage,
      content: content,
      yAnchor: 1,
      clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
    });

    customOverlay.setMap(map); // 첫 번째 오버레이 클릭 시 두 번째 오버레이를 표시합니다

    /** 토글 생성 */
    var customOverlay2 = new kakao.maps.CustomOverlay({
      map: map,
      position: position.latlng,
      content: card,
      yAnchor: 1,
    });

    /** card 이벤트 */
    content.addEventListener("mouseenter", () => {
      customOverlay2.setMap(map); // 첫 번째 오버레이 클릭 시 두 번째 오버레이를 표시합니다
      //   card.style.display = "inline-block";
      card.style.visibility = "visible";
    });

    content.addEventListener("mouseleave", () => {
      customOverlay2.setMap(null);
      //   card.style.display = "none";
      card.style.visibility = "hidden";
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

.imgWrap {
  //   background: red;
  position: relative;
  display: inline-flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  .back-img {
    width: 88px;
    height: 88px;
    object-fit: cover;
  }
  .main-img {
    position: absolute;
    // width: 60%;
    // height: 60%;
    width: 55px;
    height: 55px;
    top: 8px;
    left: 50%;
    transform: translateX(-50%); // 자신의 너비의 50%만큼 왼쪽으로 이동
  }
}

.card-text {
  white-space: normal; /* 텍스트가 한 줄을 넘을 경우 자동 줄바꿈 */
  word-wrap: break-word; /* 단어가 부모 요소를 넘을 경우 강제로 줄 바꿈 */
  overflow-wrap: break-word; /* 텍스트가 넘칠 경우 단어 단위로 줄바꿈 */
}

.triangle-down {
  width: 0;
  height: 0;
  border-bottom: 25px solid transparent;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-top: 25px solid pink;

  /* 위치 */
  position: absolute;
  bottom: -40px;
  z-index: 20;

  // 부모 컨테이너의 중앙에 위치하는 방법
  left: 50%; // 부모 요소의 왼쪽에서 50% 위치
  transform: translateX(-50%); // 자신의 너비의 50%만큼 왼쪽으로 이동
}
</style>
