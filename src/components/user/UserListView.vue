<template>
  <div
    v-for="(item, i) in $store.state.userData"
    :key="i"
    class="d-flex gap-2 border rounded p-3 mb-3"
  >
    <div class="avata">
      <img :src="item.image" alt="" />
    </div>
    <div class="d-flex flex-column justify-content-center gap2">
      <h5 class="mb-0 text-body-tertiary">{{ item.userid }}</h5>
      <p class="mb-0">{{ item.username }}</p>
    </div>

    <button
      type="button"
      class="btn btn-danger"
      style="margin-left: auto"
      @click="deleteUser(item.userid)"
    >
      삭제
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const deleteUser = (userId) => {
  store.commit("deleteUser", userId);
};
</script>

<style lang="scss" scoped>
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
</style>
