import Axios from "axios";

const instance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_HASURA_BASEURL,
  headers: {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  },
});

export default instance;
