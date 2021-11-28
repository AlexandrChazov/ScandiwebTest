import { useLocation } from "react-router-dom";

export const useUrlLastChild = () => {
  const { pathname } = useLocation();
  const splitedUrl = pathname.split("/");
  return splitedUrl[splitedUrl.length - 1];
};
