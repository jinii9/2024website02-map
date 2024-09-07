<template>
  <div class="position-absolute menuWrap p-4 rounded bg-light">
    <div class="row gap-2">
      <div
        v-for="(item, i) in $store.state.userData"
        :key="i"
        class="col-md-12 d-flex gap-5 border rounded p-3"
      >
        <div class="avata">
          <img :src="item.image" alt="" />
        </div>
        <div
          class="d-flex flex-column algin-items-center justify-content-center gap-2"
        >
          <p class="text-body-tertiary">{{ item.userid }}</p>
          <p>{{ item.username }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
</style>
