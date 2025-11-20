import { useSelector } from "react-redux";
import { authRoutes } from "@/navigation/auth/routes";

const useUserDetails = () => {
  const { isLoggedIn, userDetails } = useSelector((state) => state.auth);

  // Map authRoutes to allowedRoutes with /app prefix
  const allowedRoutes = authRoutes
    .filter((route) => route.isShowOnSidebar)
    .map((route) => ({
      icon: route.icon,
      label: route.label,
      href: `/app/${route.path}`,
      mappingKey: route.path.replace("/", ""),
    }));

  return {
    isLoggedIn,
    data: userDetails,
    user: userDetails,
    allowedRoutes,
  };
};

export default useUserDetails;
