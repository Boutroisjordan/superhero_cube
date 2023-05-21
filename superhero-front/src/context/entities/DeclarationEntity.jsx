import { useState } from "react";
import { fetchAPI, postAPI, putAPI, deleteAPI } from "../../utils/Axios";

export const DeclarationEntity = () => {
  const [declarations, setDeclarations] = useState();
  return {
    declarations: declarations,
    fetchDeclarations: async (email) => {
      var result = await fetchAPI(`/declarations/`);
      setDeclarations(result.data);
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
    postDeclaration: async (data, params) => {
      var result = await postAPI(`/declarations`, data, params);
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

// const DeclarationEntity = () => {
//   const [declarations, setDeclarations] = useState([]);

//   const fetchData = async () => {
//     try {
//       const result = await fetchAPI("/api/endpoint"); // Exemple d'appel de récupération de données
//       setData(result); // Définir les données dans le state
//       set
//     } catch (error) {
//       console.log("Une erreur s'est produite lors de la récupération des données :", error);
//     }
//   };

//   const createData = async (data) => {
//     try {
//       const result = await postAPI("/api/endpoint", data); // Exemple d'appel de création de données
//       // Traiter la réponse si nécessaire
//       fetchData(); // Mettre à jour les données après la création
//     } catch (error) {
//       console.log("Une erreur s'est produite lors de la création des données :", error);
//     }
//   };

//   const updateData = async (id, data) => {
//     try {
//       const result = await putAPI(`/api/endpoint/${id}`, data); // Exemple d'appel de mise à jour de données
//       // Traiter la réponse si nécessaire
//       fetchData(); // Mettre à jour les données après la mise à jour
//     } catch (error) {
//       console.log("Une erreur s'est produite lors de la mise à jour des données :", error);
//     }
//   };

//   const deleteData = async (id) => {
//     try {
//       const result = await deleteAPI(`/api/endpoint/${id}`); // Exemple d'appel de suppression de données
//       // Traiter la réponse si nécessaire
//       fetchData(); // Mettre à jour les données après la suppression
//     } catch (error) {
//       console.log("Une erreur s'est produite lors de la suppression des données :", error);
//     }
//   };

//   return {
//     declarations: declarations,
//     fetchDeclarations: async (email) => {
//       var result = await fetchAPI(`/declarations/`);
//       return result;
//     },
//     fetchData,
//     createData,
//     updateData,
//     deleteData,
//   };
// };

// export default Entity;
