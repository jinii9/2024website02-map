<template>
  <div
    class="wow animate__animated animate__backInLeft position-absolute menuWrap rounded bg-light p-3"
  >
    <!-- 검색창 -->
    <form class="d-flex mb-3" role="search">
      <div class="input-group">
        <span class="input-group-text">
          <i class="fa-solid fa-magnifying-glass"></i>
        </span>
        <input
          class="form-control"
          type="search"
          placeholder="친구의 이름을 입력하세요"
          @input="inputText = $event.target.value"
        />
      </div>
    </form>

    <!-- user 추가 -->
    <div class="w-100 d-flex justify-content-end pb-2">
      <button type="button" class="btn btn-dark" @click="isModal = true">
        + 친구 추가
      </button>
    </div>
    <!-- user 리스트 -->
    <div class="d-flex flex-column gap-2">
      <div
        v-for="(item, i) in filteredUserData"
        :key="i"
        class="d-flex gap-4 border rounded p-2 bg-white"
      >
        <div class="avata">
          <img :src="item.image" alt="" />
        </div>
        <div class="d-flex flex-column justify-content-center gap-2">
          <p class="text-body-tertiary">{{ item.userid }}</p>
          <p>{{ item.username }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- 모달 -->
  <!-- <SignToggleView /> -->
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import store from "../../store/store";
import SignToggleView from "./SignToggleView.vue";

const inputText = ref("");
const isModal = false;

onMounted(() => {
  new WOW().init();
});

// 1. computed로 검색을 실시간으로 필터하는 경우 ✅
// 2. 검색 버튼을 누르면 필터되는 경우
const filteredUserData = computed(() => {
  if (inputText.value === "") {
    return store.state.userData;
  }
  return store.state.userData.filter((user) =>
    user.username.includes(inputText.value)
  );
});
</script>

<style lang="scss" scoped>
.menuWrap {
  z-index: 9999;
  width: 300px;
  height: 70%;
  margin: 2rem;
  //   top: 50%;
  //   transform: translateY(-50%);
  overflow-y: auto;
  @media screen and (max-width: 790px) {
    width: 100%;
    bottom: 0;
    height: 30%;
    margin: 0;
  }
}
.avata {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}

.sIcon {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
