import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />

      {/* Auth callback route  */}
      <Route path="/auth-callback" element={<AuthCallbackPage />} />

      {/* User profile route  */}

      {/* Protected route for only authenticated user start */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />

        {/* Manage Restaurant   */}
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurantPage />
            </Layout>
          }
        />

        <Route
          path="/order-status"
          element={
            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        />
      </Route>
      {/* Protected route for only authenticated user end */}

      <Route
        path="/search/:city"
        element={
          <Layout>
            <SearchPage />
          </Layout>
        }
      />

      <Route
        path="/detail/:restaurantId"
        element={
          <Layout>
            <DetailPage />
          </Layout>
        }
      />

      {/* if any route is not available catch all the invalid route and redirect to the root page */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default AppRoutes;
