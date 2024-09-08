<template>
  <div class="toggleWrap">
    <div class="d-inline-flex flex-column bg-light p-5 rounded">
      <!-- input -->
      <div class="formWrap">
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="userid"
            v-model="userdata.userid"
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="password"
            v-model="userdata.password"
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="username"
            v-model="userdata.username"
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="addr"
            v-model="userdata.addr"
          />
        </div>
        <!-- 이미지 -->
        <div class="input-group">
          <input
            type="file"
            class="form-control"
            id="fileform"
            @change="handleImage"
            accept="image/*"
          />
          <label class="input-group-text" for="fileform">Upload</label>
        </div>
      </div>

      <!-- map 위치 가져오기 -->
      <div class="border">
        <UserSignMapView @handleLocation="handleLocation" />
      </div>
      <div class="btn btn-primary" @click="addUser">회원가입</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import UserSignMapView from "../user/UserSignMapView.vue";

const store = useStore();
const userdata = ref({
  userid: null,
  password: null,
  username: null,
  addr: null,
  image: null,
  location: null,
});

const clearform = () => {
  userdata.value.userid = null;
  userdata.value.password = null;
  userdata.value.username = null;
  userdata.value.addr = null;
  userdata.value.image = null;
  userdata.value.location = null;
};

const addUser = () => {
  let uData = {
    userid: userdata.value.userid,
    password: userdata.value.password,
    username: userdata.value.username,
    addr: userdata.value.addr,
    image: userdata.value.image,
    location: userdata.value.location,
  };
  store.commit("addUser", uData);
  clearform();
};

const handleImage = (e) => {
  const file = e.target.files[0];
  console.log(file);
  if (file) {
    userdata.value.image = URL.createObjectURL(file);
  }
};

const handleLocation = (location) => {
  console.log("handleLocation");
  userdata.value.location = location;
  console.log(userdata.value.location);
};
</script>

<style lang="scss" scoped>
.toggleWrap {
  position: fixed;
  // position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  // width: 100vw;
  // height: 100vh;
  width: 100%;
  height: 100%;
  z-index: 10000;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
