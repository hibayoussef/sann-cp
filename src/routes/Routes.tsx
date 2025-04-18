// // src/routes/Routes.tsx

import TwoFactorForm from "@/components/auth/TwoFactorForm";
import SecuritySettings from "@/components/auth/securitySettings";
import SettingsLayout from "@/layout/SettingsLayout";
import ShouldBeLogged from "@/middleware/shouldBeLogged";
import ShouldNotBeLogged from "@/middleware/shouldNotBeLogged";
import SignOtp from "@/pages/AuthPages/SignOtp";
import CreateCustomer from "@/pages/Sales/customers/createCustomer";
import Customers from "@/pages/Sales/customers/customers";
import CustomersLayout from "@/pages/Sales/customers/customersLayout";
import UpdateCustomer from "@/pages/Sales/customers/updateCustomer";
import CreateVendor from "@/pages/Sales/vendors/createVendor";
import UpdateVendor from "@/pages/Sales/vendors/updateVendor";
import Vendors from "@/pages/Sales/vendors/vendors";
import VendorsLayout from "@/pages/Sales/vendors/vendorsLayout";
import Settings from "@/pages/Settings/Settings";
import AccountForm from "@/pages/Settings/accounts/accountForm";
import AccountLayout from "@/pages/Settings/accounts/accountLayout";
import Accounts from "@/pages/Settings/accounts/accounts";
import Branches from "@/pages/Settings/branches/branches";
import CreateBranch from "@/pages/Settings/branches/createBranch";
import { OrganizationForm } from "@/pages/Settings/organizations/organizationForm";
import PaymentTerm from "@/pages/Settings/paymentTerm/paymentTerm";
import PaymentTermForm from "@/pages/Settings/paymentTerm/paymentTermForm";
import Categories from "@/pages/products/Categories/categories";
import CategoriesLayout from "@/pages/products/Categories/categoriesLayout";
import SubCategoryForm from "@/pages/products/SubCategories/SubCategoryForm";
import SubCategories from "@/pages/products/SubCategories/subCategories";
import SubUnitForm from "@/pages/products/SubUnits/subUnitForm";
import SubUnits from "@/pages/products/SubUnits/subUnits";
import CreateTax from "@/pages/products/Taxes/createTax";
import Taxes from "@/pages/products/Taxes/taxes";
import Units from "@/pages/products/Units/units";
import ProductForm from "@/pages/products/products/productForm";
import Products from "@/pages/products/products/products";
import CreateWarranty from "@/pages/products/warranties/createWarranty";
import Warranties from "@/pages/products/warranties/warranties";
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
import UnitForm from "../pages/products/Units/unitForm";
import MapSettings from "@/pages/Accountant/MapSettings/MapSettings";
import CreateMapSettings from "@/pages/Accountant/MapSettings/createMapSettings";
import ContactForm from "@/pages/Sales/ContactForm";
import ProductsLayout from "@/pages/products/products/productsLayout";
import ProductCloneForm from "@/pages/products/products/ProductCloneForm";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />

      <Route element={<ShouldNotBeLogged />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signin-otp" element={<SignOtp />} />
        <Route path="/two-factor-verify" element={<TwoFactorForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
      </Route>

      <Route element={<ShouldBeLogged />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductsLayout />} />
          <Route path="/products/create" element={<ProductForm />} />
          <Route path="/products/update/:id" element={<ProductForm />} />
          <Route path="/products/clone/:id" element={<ProductCloneForm />} />

          <Route path="/brands" element={<Brands />} />
          <Route path="/brands/create" element={<CreateBrand />} />
          <Route path="/brands/update/:id" element={<CreateBrand />} />

          <Route path="/warranties" element={<Warranties />} />
          <Route path="/warranties/create" element={<CreateWarranty />} />
          <Route path="/warranties/update/:id" element={<CreateWarranty />} />

          <Route path="/taxes" element={<Taxes />} />
          <Route path="/taxes/create" element={<CreateTax />} />
          <Route path="/taxes/update/:id" element={<CreateTax />} />

          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id" element={<CategoriesLayout />} />
          <Route path="/categories/create" element={<CreateCategory />} />
          <Route path="/categories/update/:id" element={<CreateCategory />} />

          <Route path="/sub-categories" element={<SubCategories />} />
          <Route path="/sub-categories/create" element={<SubCategoryForm />} />
          <Route
            path="/sub-categories/update/:id"
            element={<SubCategoryForm />}
          />

          <Route path="/categories/sub" element={<Brands />} />

          <Route path="/units" element={<Units />} />
          <Route path="/units/create" element={<UnitForm />} />
          <Route path="/units/update/:id" element={<UnitForm />} />

          <Route path="/sub-units" element={<SubUnits />} />
          <Route path="/sub-units/create" element={<SubUnitForm />} />
          <Route path="/sub-units/update/:id" element={<SubUnitForm />} />

          {/* Sales */}
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomersLayout />} />
          <Route path="/customers/create" element={<CreateCustomer />} />
          <Route path="/customers/update/:id" element={<UpdateCustomer />} />
          <Route path="/contacts/clone/:id" element={<ContactForm />} />
          {/* Purchases */}
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendors/:id" element={<VendorsLayout />} />
          <Route path="/vendors/create" element={<CreateVendor />} />
          <Route path="/vendors/update/:id" element={<UpdateVendor />} />
          {/* Accountant */}
          <Route path="/map-settings" element={<MapSettings />} />
          <Route path="/map-settings/create" element={<CreateMapSettings />} />
          <Route
            path="/map-settings/update/:id"
            element={<CreateMapSettings />}
          />

          <Route path="/accounts" element={<Accounts />} />
          <Route path="/accounts/:id" element={<AccountLayout />} />
          <Route path="/accounts/create" element={<AccountForm />} />
          <Route path="/accounts/update/:id" element={<AccountForm />} />

          {/* end sales */}
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />
        </Route>

        <Route path="/settings" element={<SettingsLayout />}>
          <Route path="orgProfile" element={<OrganizationForm />} />
          <Route path="branches" element={<Branches />} />
          <Route path="branches/create" element={<CreateBranch />} />
          <Route path="branches/update/:id" element={<CreateBranch />} />
          <Route path="security" element={<SecuritySettings />} />
          <Route path="payment_terms" element={<PaymentTerm />} />
          <Route path="payment_terms/create" element={<PaymentTermForm />} />
          <Route
            path="payment_terms/update/:id"
            element={<PaymentTermForm />}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesComponent;
