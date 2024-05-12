import { Navigate, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<span>Home page</span>} />
      <Route path="/user-profile" element={<span>User Profile</span>} />
      {/* if any route is not available catch all the invalid route and redirect to the root page */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default AppRoutes;
