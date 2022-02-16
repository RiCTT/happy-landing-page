import { http } from "@/utils/axios";

export const getUploadToken = (params) => {
  return http.get("/file/token", { params });
};
