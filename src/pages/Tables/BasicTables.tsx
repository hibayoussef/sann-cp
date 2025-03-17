import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import EcommerceMetricsTry from "../../components/ecommerce/EcommerceMetricsTry";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Users" />

      <EcommerceMetricsTry />

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
          <h4
            className="text-md font-semibold text-gray-800 dark:text-white/90"
            x-text="pageName"
          >
            Users in Your System
          </h4>
        </div>
        {/* <ComponentCard title="Basic Table 1"> */}
          {/* <BasicTableOne /> */}
          {/* <BasicTables /> */}
        {/* </ComponentCard> */}
      </div>
    </>
  );
}
// import PageBreadcrumb from "../../components/common/PageBreadCrumb";
// import ComponentCard from "../../components/common/ComponentCard";
// import PageMeta from "../../components/common/PageMeta";
// import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
// import EcommerceMetricsTry from "../../components/ecommerce/EcommerceMetricsTry";

// export default function BasicTables() {
//   return (
//     <>
//       <PageBreadcrumb pageTitle="Basic Tables" />

//       <EcommerceMetricsTry />
//       <BasicTableOne />

//       <PageMeta
//         title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
//         description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
//       />
//       <BasicTableOne />

//       <div className="space-y-6">
//         <ComponentCard title="Basic Table 1">
//           <BasicTableOne />
//         </ComponentCard>
//       </div>
//     </>
//   );
// }
