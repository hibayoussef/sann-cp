// src/routes/Routes.tsx

import Settings from "@/pages/Settings/Settings";
import Categories from "@/pages/products/Categories/categories";
import CategoriesLayout from "@/pages/products/Categories/categoriesLayout";
import SubCategories from "@/pages/products/SubCategories/subCategories";
import Units from "@/pages/products/Units/units";
import { Navigate, Route, Routes } from "react-router";
import AppLayout from "../layout/AppLayout";
import ForgotPassword from "../pages/AuthPages/ForgotPassword";
import ResetPassword from "../pages/AuthPages/ResetPassword";
import SignIn from "../pages/AuthPages/SignIn";
import SignUp from "../pages/AuthPages/SignUp";
import VerifyEmail from "../pages/AuthPages/VerifyEmail";
import BarChart from "../pages/Charts/BarChart";
import LineChart from "../pages/Charts/LineChart";
import Home from "../pages/Dashboard/Home";
import NotFound from "../pages/OtherPage/NotFound";
import Alerts from "../pages/UiElements/Alerts";
import Avatars from "../pages/UiElements/Avatars";
import Badges from "../pages/UiElements/Badges";
import Buttons from "../pages/UiElements/Buttons";
import Images from "../pages/UiElements/Images";
import Videos from "../pages/UiElements/Videos";
import Brands from "../pages/products/Brands/brands";
import CreateBrand from "../pages/products/Brands/createBrand";
import CreateCategory from "../pages/products/Categories/createCategory";
import CreateUnit from "../pages/products/Units/createUnit";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />

      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password/reset/:token" element={<ResetPassword />} />
      <Route path="/verify-email/:token" element={<VerifyEmail />} />

      <Route element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />

        <Route path="/brands" element={<Brands />} />
        <Route path="/brands/create" element={<CreateBrand />} />
        <Route path="/brands/update/:id" element={<CreateBrand />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<CategoriesLayout />} />
        <Route path="/categories/create" element={<CreateCategory />} />
        <Route path="/categories/update/:id" element={<CreateCategory />} />

        <Route path="/sub-categories" element={<SubCategories />} />
        {/* <Route path="/sub-categories/:id" element={<CategoryDetails />} /> */}
        <Route path="/sub-categories/create" element={<CreateCategory />} />
        <Route path="/sub-categories/update/:id" element={<CreateCategory />} />

        <Route path="/categories/sub" element={<Brands />} />

        {/* <Route path="/categories/sub/create" element={<CreateSubCategory />} /> */}

        <Route path="/units" element={<Units />} />
        <Route path="/units/create" element={<CreateUnit />} />
        {/* <Route path="/categories" element={<Blank />} />
        <Route path="/categories/:id" element={<Blank />} />
        <Route path="/sub-categories" element={<Blank />} />
        <Route path="/sub-categories/:id" element={<Blank />} />
        <Route path="/units" element={<Blank />} />
        <Route path="/units/:id" element={<Blank />} />
        <Route path="/sub-units/:id" element={<Blank />} />
        <Route path="/profile" element={<UserProfiles />} /> */}

        <Route path="/alerts" element={<Alerts />} />
        <Route path="/avatars" element={<Avatars />} />
        <Route path="/badge" element={<Badges />} />
        <Route path="/buttons" element={<Buttons />} />
        <Route path="/images" element={<Images />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/line-chart" element={<LineChart />} />
        <Route path="/bar-chart" element={<BarChart />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesComponent;
