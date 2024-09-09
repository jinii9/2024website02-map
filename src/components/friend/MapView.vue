<template>
  <!-- 로딩 상태일 때 스피너 표시 -->
  <div
    v-if="isLoading"
    class="d-flex justify-content-center align-items-center"
    style="width: 100%; height: 100%"
  >
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <!-- 맵이 로딩된 후에만 표시됨 -->
  <div id="map" class="position-relative" style="width: 100%; height: 100%">
    <MenuView v-model:modelValue="isStarbucks" />
  </div>
  ddd
  {{ isStarbucks }}
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useMyLocation } from "../../utils/useMyLocation";
import store from "../../store/store";
import MenuView from "./MenuView.vue";

const location = useMyLocation();
const isLoading = ref(true);
const isStarbucks = ref(false);

const updateStarbucks = (value) => {
  console.log(value);
};
/** 지도 생성 함수 **/
const createMap = () => {
  console.log("createMap 함수 호출됨", isStarbucks);
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
    intro: user.intro,
    userId: user.userid,
    userName: user.username,
  }));

  /** 스타벅스 */
  // 스타벅스 position

  if (isStarbucks.value) {
    console.log("스타벅스 마커를 표시합니다.");
    console.log("starbucks", isStarbucks);
    var starbucksPositions = store.state.starbucksData.map((item) => ({
      name: item.name,
      addr: item.addr,
      // location: {
      //   latitude: item.location.latitude,
      //   longitude: item.location.longitude,
      // },
      latlng: new kakao.maps.LatLng(
        item.location.latitude,
        item.location.longitude
      ),
    }));
    // console.log(starbucksPositions);
    // 마커 이미지의 이미지 주소입니다
    var imageSrc =
      "	https://www.starbucks.co.kr/common/img/store/pin/pin_general.png";

    for (var i = 0; i < positions.length; i++) {
      // console.log("확인하겠슴니다", positions[i]);
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });
    }
  }
  ////////////////////////

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
    cardTitle.textContent = position.userName;

    // card-subtitle h6 생성
    const cardSubtitle = document.createElement("h6");
    cardSubtitle.className = "card-subtitle mb-2 text-body-secondary";
    cardSubtitle.textContent = position.userId;

    // card-text p 생성
    const cardText = document.createElement("p");
    cardText.className = "card-text lh-sm";
    cardText.textContent = position.intro;

    content.appendChild(card);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSubtitle);
    cardBody.appendChild(cardText);

    //** 스타벅스 마커 생성 */
    // var map = new kakao.maps.Map();
    // var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
    /** 마커 생성 */
    var customOverlay = new kakao.maps.CustomOverlay({
      map: map,
      position: position.latlng,
      //   image: markerImage,
      content: content,
      yAnchor: 1,
      clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
    });

    /** 토글 생성 */
    var customOverlay2 = new kakao.maps.CustomOverlay({
      map: map,
      position: position.latlng,
      content: card,
      yAnchor: 1,
    });

    customOverlay.setMap(map);
    customOverlay2.setMap(map);

    /** card 이벤트 */
    content.addEventListener("mouseenter", () => {
      customOverlay2.setMap(map);
      //   card.style.display = "inline-block";
      card.style.visibility = "visible";
    });

    content.addEventListener("mouseleave", () => {
      customOverlay2.setMap(null);
      //   card.style.display = "none";
      card.style.visibility = "hidden";
    });
  });

  isLoading.value = false;
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
      isLoading.value = true;
      createMap();
    }
  },
  { deep: true } // 객체의 속성 변경을 관찰
);
watch(
  () => isStarbucks.value,
  (newValue) => {
    console.log("isStarbucks 값 변경됨", newValue);
    if (location.latitude !== 0 && location.longitude !== 0) {
      isLoading.value = true;
      createMap();
    }
  }
);
</script>

<style lang="scss">
.mapContainer {
  //   position: absolute;
  //   width: 100%;
  //   height: 100%;
}

.imgWrap {
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
