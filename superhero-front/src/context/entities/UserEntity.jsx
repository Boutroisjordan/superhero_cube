import { useState } from "react";
import { fetchAPI, postAPI, putAPI, deleteAPI } from "../../utils/Axios";

export const UserEntity = () => {
  const [users, setUsers] = useState();
  return {
    users: users,
    fetchUsers: async (email) => {
      var result = await fetchAPI(`/users/`);
      return result;
    },
    fetchUserInfo: async (params) => {
      var result = await fetchAPI(`/users/infos`, params);
      return result;
    },

    postLogin: async (data, params) => {
      var result = await postAPI(`/users/login`, data, params);
      console.log("le post dans entité: ", data, params);
      return result;
    },

    postSignIn: async (data, params) => {
      var result = await postAPI(`/users`, data, params);
      console.log("le post dans entité: ", data, params);
      return result;
    },
  };
};
