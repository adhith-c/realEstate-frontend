// import axios from "axios";

// const API = axios.create({ baseURL: `${import.meta.env.BASEURL}` });
import instance from "../config/axios";

export const getMessages = (id) => instance.get(`/message/${id}`);

export const addMessage = (data) => instance.post("/message/", data);
