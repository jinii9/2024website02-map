<template>
  <div class="position-absolute menuWrap rounded bg-light p-3">
    <!-- 검색창 -->
    <form class="d-flex mb-3" role="search">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <!-- <button class="btn btn-outline-success" type="submit">Search</button> -->
      <div class="sIcon border rounded">
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
    </form>

    <!-- user 리스트 -->
    <div class="d-flex flex-column gap-2">
      <div
        v-for="(item, i) in $store.state.userData"
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

.sIcon {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
