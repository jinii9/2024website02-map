import { createStore } from "vuex";
export default createStore({
  state: {
    userData: [
      {
        userid: "whiteSnow1",
        password: "123",
        username: "백설공주",
        addr: "서울",
        intro: "나는 아침마다 사과를 먹어🍎",
        location: {
          latitude: 37.48663916609662,
          longitude: 126.88931630598522,
        },
        // image: "/public/img-avatars/princess1.jpg",
        image: "/img-avatars/princess1.jpg",
      },
      {
        userid: "findMyShoes22",
        password: "123",
        username: "신데렐라",
        intro: "내 유리구두를 찾으면 연락줘🛼",
        addr: "서울",
        location: {
          latitude: 37.482492,
          longitude: 126.8800348,
        },
        // image: "/public/img-avatars/princess2.webp",
        image: "/img-avatars/princess2.webp",
      },
      {
        userid: "thumb00",
        password: "123",
        username: "엄지공주",
        intro: "니 엄지가 클까, 내 키가 더 클까?🤔",
        addr: "서울",
        location: {
          latitude: 37.48341028351542,
          longitude: 126.89561876529997,
        },
        // image: "/public/img-avatars/princess3.jpg",
        image: "/img-avatars/princess3.jpg",
      },
      {
        userid: "lapunzel09",
        password: "123",
        username: "라푼젤",
        intro: "내 머리카락 길다~ 부러워?",
        addr: "서울",
        location: {
          latitude: 37.484555636211766,
          longitude: 126.87793360566988,
        },
        // image: "/public/img-avatars/princess4.jpg",
        image: "/img-avatars/princess4.jpg",
      },
    ],
    filterdUsers: [],
    starbucksData: [
      {
        name: "가산에스케이",
        addr: "서울특별시 금천구 가산동 371-41, SK V1센터 1층",
        location: {
          latitude: 37.48082408602027,
          longitude: 126.88100079322535,
        },
      },
      {
        name: "가산디지털",
        addr: "서울특별시 금천구 가산동 371-28, 우림라이온스밸리 B동 1층",
        location: {
          latitude: 37.485996997425715,
          longitude: 126.88672798580158,
        },
      },
      {
        name: "가산디지털",
        addr: "서울특별시 금천구 가산동 371-28, 우림라이온스밸리 B동 1층",
        location: {
          latitude: 37.480050688166365,
          longitude: 126.88246896653567,
        },
      },
      {
        name: "가산디지털",
        addr: "서울특별시 금천구 가산동 371-28, 우림라이온스밸리 B동 1층",
        location: {
          latitude: 37.489603125615915,
          longitude: 126.87973457471817,
        },
      },
      {
        name: "가산디지털",
        addr: "서울특별시 금천구 가산동 371-28, 우림라이온스밸리 B동 1층",
        location: {
          latitude: 37.499432882442015,
          longitude: 126.87951525180304,
        },
      },
    ],
  },
  mutations: {
    addUser(state, payload) {
      state.userData.push(payload);
    },
    setFilteredUser(state, payload) {
      state.filteredUsers = payload;
    },
    deleteUser(state, payload) {
      // userId
      state.userData = state.userData.filter((user) => user.userid !== payload);
      console.log(state.userData);
    },
  },
});
