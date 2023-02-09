// import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:4000" });
import instance from "../config/axios";

export const createChat = (data) => instance.post("/chat/", data);

export const userChats = (id) => instance.get(`/chat/${id}`);

export const findChat = (firstId, secondId) =>
  instance.get(`/chat/find/${firstId}/${secondId}`);

export const getUser = (userId) => instance.get(`/user/${userId}`);
