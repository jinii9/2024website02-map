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
          latitude: 37.55885781747545,
          longitude: 127.1659341,
        },
        image: "/public/img-avatars/princess1.jpg",
      },
      {
        userid: "findMyShoes22",
        password: "123",
        username: "신데렐라",
        intro: "내 유리구두를 찾으면 연락줘🛼",
        addr: "서울",
        location: {
          latitude: 37.559685423905066,
          longitude: 127.13475180054544,
        },
        image: "/public/img-avatars/princess2.webp",
      },
      {
        userid: "thumb00",
        password: "123",
        username: "엄지공주",
        intro: "니 엄지가 클까, 내 키가 더 클까?🤔",
        addr: "서울",
        location: {
          latitude: 37.553440243421605,
          longitude: 127.15761225828356,
        },
        image: "/public/img-avatars/princess3.jpg",
      },
    ],
    filterdUsers: [],
  },
  mutations: {
    addUser(state, payload) {
      state.userData.push(payload);
    },
    setFilteredUser(state, payload) {
      state.filteredUsers = payload;
    },
  },
});
