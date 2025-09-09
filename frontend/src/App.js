import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useAuthStore from "./store/restaurant/authStore";
import useDriverAuthStore from "./store/driver/authStore";

// Customer Pages
import { Login } from "./pages/customer/Login";
import Signup from "./pages/customer/Signup";
import ForgotPassword from "./pages/customer/ForgotPassword";
import ResetPassword from "./pages/customer/ResetPassword";
import { Landing_Page } from "./pages/customer/Landing Page";
import VerificationCode from "./components/VerificationCode";
import OrderHistory from "./pages/customer/OrderHistory";
import FeedbackPage from "./pages/customer/FeedBack";
import NearbyRestaurants from "./pages/customer/NearbyRestaurants";
import Sidebar from "./components/Sidebar";
import MenuPage from "./pages/customer/MenuPage";
import CartPage from "./pages/customer/CartPage";
import OrderStatus from "./pages/customer/OrderStatus";
import CheckoutPage from "./pages/customer/CheckoutPage";
import OrderConfirmationPage from "./pages/customer/OrderConfirmationPage";

// Restaurant Pages
import RestaurantSignup from "./pages/restaurant/Signup";
import RestaurantVerificationCode from "./components/restaurant/VerificationCode";
import RestaurantLogin from "./pages/restaurant/Login";
import Dashboard from "./pages/restaurant/Dashboard";
import AddMenuItem from "./pages/restaurant/MenuManager";
import MenuManagement from "./pages/restaurant/MenuManagementpage";
import InventoryPage from "./pages/restaurant/InventoryPage";
import InviteDriverPage from "./pages/restaurant/InviteDriver";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import RestaurantManagement from "./pages/admin/RestaurantManagement";
import PendingRestaurants from "./pages/admin/PendingRestaurants";

// Driver Pages
import DriverLogin from "./pages/driver/Login";
import DriverForgotPassword from "./pages/driver/ForgotPassword";
import DriverResetPassword from "./pages/driver/ResetPassword";
import DriverVerifyOTP from "./pages/driver/VerifyOTP";
import DriverDashboard from "./pages/driver/Dashboard";
import DriverOrders from "./pages/driver/Orders";
import DriverEarnings from "./pages/driver/Earnings";
import DriverProfile from "./pages/driver/Profile";

function App() {
  const { checkAuth } = useAuthStore();

  // Check HTTP-only cookie auth on app load
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Protected route wrapper with loading handling
  const PrivateRoute = ({ children, allowedRoles, useAuthHook, loginPath }) => {
    const { isLoggedIn, role, loading } = useAuthHook();

    if (loading)
      return (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      );

    if (!isLoggedIn) return <Navigate to={loginPath} replace />;
    if (allowedRoles && !allowedRoles.includes(role))
      return <Navigate to="/" replace />;

    return children;
  };

  return (
    <Router>
      <div className="min-h-screen bg-white/90">
        <Routes>
          {/* Customer Pages */}
          <Route path="/" element={<Landing_Page />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<VerificationCode />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/nearby" element={<NearbyRestaurants />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/menu/:restaurantId" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/order-confirmation"
            element={<OrderConfirmationPage />}
          />
          <Route path="/order-status" element={<OrderStatus />} />

          {/* Restaurant Pages */}
          <Route path="/restaurant/login" element={<RestaurantLogin />} />
          <Route path="/restaurant/signup" element={<RestaurantSignup />} />
          <Route
            path="/restaurant/verify"
            element={<RestaurantVerificationCode />}
          />

          <Route
            path="/restaurant/dashboard"
            element={
              <PrivateRoute
                allowedRoles={["restaurant"]}
                useAuthHook={useAuthStore}
                loginPath="/restaurant/login"
              >
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/restaurant/menu"
            element={
              <PrivateRoute
                allowedRoles={["restaurant"]}
                useAuthHook={useAuthStore}
                loginPath="/restaurant/login"
              >
                <AddMenuItem />
              </PrivateRoute>
            }
          />
          <Route
            path="/MenuManagement/:restaurantId"
            element={
              <PrivateRoute
                allowedRoles={["restaurant"]}
                useAuthHook={useAuthStore}
                loginPath="/restaurant/login"
              >
                <MenuManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory/:restaurantId"
            element={
              <PrivateRoute
                allowedRoles={["restaurant"]}
                useAuthHook={useAuthStore}
                loginPath="/restaurant/login"
              >
                <InventoryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/restaurant/invite-driver"
            element={
              <PrivateRoute
                allowedRoles={["restaurant"]}
                useAuthHook={useAuthStore}
                loginPath="/restaurant/login"
              >
                <InviteDriverPage />
              </PrivateRoute>
            }
          />

          {/* Driver Pages */}
          <Route path="/driver/login" element={<DriverLogin />} />
          <Route
            path="/driver/forgot-password"
            element={<DriverForgotPassword />}
          />
          <Route
            path="/driver/reset-password"
            element={<DriverResetPassword />}
          />
          <Route path="/driver/verify-otp" element={<DriverVerifyOTP />} />
          <Route
            path="/driver/dashboard"
            element={
              <PrivateRoute
                allowedRoles={["driver"]}
                useAuthHook={useDriverAuthStore}
                loginPath="/driver/login"
              >
                <DriverDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/driver/orders"
            element={
              <PrivateRoute
                allowedRoles={["driver"]}
                useAuthHook={useDriverAuthStore}
                loginPath="/driver/login"
              >
                <DriverDashboard>
                  <DriverOrders />
                </DriverDashboard>
              </PrivateRoute>
            }
          />
          <Route
            path="/driver/earnings"
            element={
              <PrivateRoute
                allowedRoles={["driver"]}
                useAuthHook={useDriverAuthStore}
                loginPath="/driver/login"
              >
                <DriverDashboard>
                  <DriverEarnings />
                </DriverDashboard>
              </PrivateRoute>
            }
          />
          <Route
            path="/driver/profile"
            element={
              <PrivateRoute
                allowedRoles={["driver"]}
                useAuthHook={useDriverAuthStore}
                loginPath="/driver/login"
              >
                <DriverDashboard>
                  <DriverProfile />
                </DriverDashboard>
              </PrivateRoute>
            }
          />

          {/* Admin Pages */}
          <Route
            path="/admin"
            element={
              <PrivateRoute
                allowedRoles={["admin"]}
                useAuthHook={useAuthStore}
                loginPath="/admin/login"
              >
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute
                allowedRoles={["admin"]}
                useAuthHook={useAuthStore}
                loginPath="/admin/login"
              >
                <UserManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/restaurants"
            element={
              <PrivateRoute
                allowedRoles={["admin"]}
                useAuthHook={useAuthStore}
                loginPath="/admin/login"
              >
                <RestaurantManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/restaurants/pending"
            element={
              <PrivateRoute
                allowedRoles={["admin"]}
                useAuthHook={useAuthStore}
                loginPath="/admin/login"
              >
                <PendingRestaurants />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
