import { createStore } from "vuex";

export default createStore({
  state: {
    userData: [
      {
        userid: "hanyong5",
        password: "123",
        username: "홍길동",
        addr: "서울",
        location: {
          latitude: 37.55885781747545,
          longitude: 127.1659341,
        },
        image: "https://picsum.photos/100",
      },
      {
        userid: "ttomi",
        password: "123",
        username: "김유신",
        addr: "서울",
        location: {
          latitude: 37.559685423905066,
          longitude: 127.13475180054544,
        },
        image: "https://picsum.photos/100",
      },
      {
        userid: "test",
        password: "123",
        username: "감강찬",
        addr: "서울",
        location: {
          latitude: 37.553440243421605,
          longitude: 127.15761225828356,
        },
        image: "https://picsum.photos/100",
      },
    ],
  },
  mutations: {
    addUser(state, payload) {
      state.userData.push(payload);
    },
  },
});
