import { http } from "@/utils/axios";

export const getPageList = (params) => {
  return http.get("/page/list", { params });
};

export const getPageItem = (params) => {
  return http.get("/page/item", { params });
};

export const createPageItem = (data) => {
  return http.post("/page/create", data);
};

export const updatePageItem = (data) => {
  return http.post("/page/update", data);
};
