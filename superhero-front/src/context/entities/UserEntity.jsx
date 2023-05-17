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
    // postLogin: async (email) => {
    //   var result = await fetchAPI(`/users/login`);
    //   return result;
    // },
    //     getAuthorize: async (data) => {
    //       console.log(data);

    //         var result = await fetchAPI(`/users/authorize`,
    //         {"email": data.email,
    //          "password": data.password});
    //         return result;
    //     },
    //     reset_pass: async (data) => {
    //       var result = await postAPI(`/users/reset_pass`, data);
    //       return result;
    //     },
    postLogin: async (data, params) => {
      var result = await postAPI(`/users/login`, data, params);
      console.log("le post dans entité: ", data, params);
      return result;
    },
    // postLogin: (data) => postAPI(`/users/login`, data).then((res) => res),
    //     putUser: async (data) => {
    //       var result = await putAPI(`/users/update`, data)
    //       return result;
    //   },
    //     deleteUser: async (data) => {
    //       var result = await deleteAPI(`/users/delete`, data)
    //       return result;
    // },
  };
};
