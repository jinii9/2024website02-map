<template>
  <div>
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
    <div class="input-group mb-3">
      <input
        type="file"
        class="form-control"
        id="fileform"
        @change="handleImage"
        accept="image/*"
      />
      <label class="input-group-text" for="fileform">Upload</label>
    </div>

    <!-- map 위치 가져오기 -->
    <UserSignMapView @handleLocation="handleLocation" />
    <div class="btn btn-primary" @click="addUser">회원가입</div>
  </div>

  <!-- {{ userdata }} -->
  <!-- {{ $store.state.userData[$store.state.userData.length - 1] }} -->
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import UserSignMapView from "./UserSignMapView.vue";

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

<style lang="scss" scoped></style>
