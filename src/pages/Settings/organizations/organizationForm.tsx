// src/components/settings/organization/OrganizationForm.tsx
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Label from "@/components/form/Label";
import DropzoneComponent from "@/components/form/form-elements/FileInputExample";
import FileInputExample from "@/components/form/form-elements/FileInputExample";
import Input from "@/components/form/input/InputField";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader/loader";
import {
  useFetchOrganizations,
  useUpdateOrganization,
} from "@/hooks/settings/useOrganizations";
import { FileType } from "@/types/enums/attatchementType";
import {
  Boxes,
  Building,
  CalendarCheck,
  FolderTree,
  Store,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const OrganizationForm = () => {
  const {
    data: organizationData,
    isLoading,
    isError,
  } = useFetchOrganizations();
  const {
    mutate: updateOrganization,
    isPending,
    isError: isUpdateError,
  } = useUpdateOrganization();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      // Organization Info
      organization_name_ar: "",
      organization_name_en: "",
      industry_id: 0,
      industry_name_ar: "",
      industry_name_en: "",

      // Location Info
      country_id: 0,
      country_name_ar: "",
      country_name_en: "",
      time_zone_id: 0,
      time_zone: "",
      time_zone_offset: "",

      // Currency Info
      currency_id: 0,
      currency_name_ar: "",
      currency_name: "",
      currency_code: "",
      currency_symbol: "",

      // Subscription
      subscription: {
        plan_id: 0,
        plan_name_ar: "",
        plan_name_en: "",
        plan_price: 0,
        status: "",
        start_date: "",
        end_date: "",
      },

      // Modules
      modules: [] as Array<{
        id: number;
        name_ar: string;
        name_en: string;
        features: Array<{
          id: number;
          name_ar: string;
          name_en: string;
        }>;
      }>,

      // Branches
      branches: [] as Array<{
        id: number;
        branch_name_ar: string;
        branch_name_en: string;
        stores: Array<{
          id: number;
          store_name_ar: string;
          store_name_en: string;
        }>;
      }>,
    },
  });

  useEffect(() => {
    if (organizationData) {
      reset({
        ...organizationData,
        subscription: organizationData.subscription,
        modules: organizationData.modules,
        branches: organizationData.branches,
      });
    }
  }, [organizationData, reset]);

  // const onSubmit = (data: any) => {
  //   const formData = new FormData();

  //   // Basic Info
  //   Object.entries(data).forEach(([key, value]) => {
  //     if (key !== "subscription" && key !== "modules" && key !== "branches") {
  //       formData.append(key, value as string);
  //     }
  //   });

  //   // Subscription
  //   Object.entries(data.subscription).forEach(([key, value]) => {
  //     formData.append(`subscription[${key}]`, value as string);
  //   });

  //   // Modules
  //   data.modules.forEach((module: any, index: number) => {
  //     Object.entries(module).forEach(([key, value]) => {
  //       formData.append(`modules[${index}][${key}]`, value as string);
  //     });
  //   });

  //   // Branches
  //   data.branches.forEach((branch: any, index: number) => {
  //     Object.entries(branch).forEach(([key, value]) => {
  //       formData.append(`branches[${index}][${key}]`, value as string);
  //     });
  //   });

  //   formData.append("_method", "PUT");
  //   updateOrganization({ id: organizationData?.id, data: formData });
  // };

  const onSubmit = (data: any) => {
    const formData = new FormData();

    formData.append("organization_name_ar", data.organization_name_ar);
    formData.append("organization_name_en", data.organization_name_en);
    formData.append("_method", "PUT");

    /* 
  // Subscription
  // Object.entries(data.subscription).forEach(([key, value]) => {
  //   formData.append(`subscription[${key}]`, value as string);
  // });

  // Modules
  // data.modules.forEach((module: any, index: number) => {
  //   Object.entries(module).forEach(([key, value]) => {
  //     formData.append(`modules[${index}][${key}]`, value as string);
  //   });
  // });

  // Branches
  // data.branches.forEach((branch: any, index: number) => {
  //   Object.entries(branch).forEach(([key, value]) => {
  //     formData.append(`branches[${index}][${key}]`, value as string);
  //   });
  // });
  */

    updateOrganization({ id: organizationData?.id, data: formData });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-3 p-2">
      <PageBreadcrumb
        baseTitle="Settings"
        pageTitle="Profile"
        icon={<Boxes className="w-4 h-4 text-gray-600" />}
      />

      <div className="grid grid-cols-1 gap-2">

         <DropzoneComponent
              id={organizationData?.id}
              initialImage={
                organizationData?.attachments?.file_path
                  ? organizationData?.attachments?.file_path
                  : ""
              }
              type={FileType.ORGANIZATION}
              onUpload={(fileData) => {
                console.log("Uploaded file data:", fileData);
              }}
            />
        {/* Basic Information */}
        <ComponentCard
          title="Core Details"
          icon={<Building className="w-4 h-4 text-blue-600" />}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
           
            {/* <FileInputExample
              fileType={FileType.ORGANIZATION}
              fileTypeId={organizationData?.id}
              imageUrl={
                organizationData?.attachments?.file_path
                  ? organizationData?.attachments?.file_path
                  : ""
              }
            /> */}
            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">
                Organization Name
              </Label>
              <Input
                className="text-xs h-9"
                {...register("organization_name_en")}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">
                Industry
              </Label>
              <Input
                className="text-xs h-9"
                {...register("industry_name_en")}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">
                Country
              </Label>
              <Input className="text-xs h-9" {...register("country_name_en")} />
            </div>

            <div className="md:col-span-2 mt-2">
              <h3 className="text-xs font-semibold text-gray-700 mb-1">
                Currency Settings
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-600">
                    Code
                  </Label>
                  <Input
                    className="text-xs h-9"
                    {...register("currency_code")}
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-600">
                    Name
                  </Label>
                  <Input
                    className="text-xs h-9"
                    {...register("currency_name")}
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-600">
                    Symbol
                  </Label>
                  <Input
                    className="text-xs h-9"
                    {...register("currency_symbol")}
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2 mt-2">
              <h3 className="text-xs font-semibold text-gray-700 mb-1">
                Time Zone
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  className="text-xs h-9"
                  readOnly
                  {...register("time_zone")}
                  value={
                    organizationData?.time_zone &&
                    organizationData?.time_zone_offset
                      ? `(${organizationData.time_zone_offset}) ${organizationData.time_zone}`
                      : ""
                  }
                />
                {/* <input type="hidden" {...register("time_zone")} />
                <input type="hidden" {...register("time_zone_offset")} /> */}
              </div>
            </div>

            <div className="md:col-span-2 mt-3">
              <button
                type="submit"
                className="w-full px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center justify-center gap-1.5"
                disabled={isPending}
              >
                {isPending && (
                  <svg className="animate-spin h-4 w-4 text-white" />
                )}
                Save Changes
              </button>
            </div>
          </form>
        </ComponentCard>

        {/* Subscription */}
        <ComponentCard
          title="Subscription"
          icon={<CalendarCheck className="w-4 h-4 text-green-600" />}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">
                Plan Name
              </Label>
              <Input
                className="text-xs h-9"
                {...register("subscription.plan_name_en")}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">Price</Label>
              <Input
                type="number"
                className="text-xs h-9"
                {...register("subscription.plan_price")}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">
                Status
              </Label>
              <select
                {...register("subscription.status")}
                className="w-full text-xs h-9 px-2 border rounded-md bg-white"
              >
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">
                Start Date
              </Label>
              <Input
                type="date"
                className="text-xs h-9"
                {...register("subscription.start_date")}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium text-gray-600">
                End Date
              </Label>
              <Input
                type="date"
                className="text-xs h-9"
                {...register("subscription.end_date")}
              />
            </div>
          </div>
        </ComponentCard>

        {/* Modules */}
        <ComponentCard
          title="Enabled Modules"
          icon={<Boxes className="w-5 h-5 text-purple-600" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {organizationData?.modules.map((module: any, index: any) => (
              <div
                key={module.id}
                className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
              >
                <h3 className="text-xs font-semibold text-gray-800 flex items-center gap-2">
                  <FolderTree className="w-5 h-5 text-purple-500" />
                  {module.name_en}
                </h3>

                <div className="mt-3">
                  <p className="text-xs font-medium text-gray-600">Features:</p>
                  {module.features.length > 0 ? (
                    <>
                      {" "}
                      <ul className="mt-2 space-y-2">
                        {module.features.map((feature: any, fIndex: any) => (
                          <li
                            key={feature.id}
                            className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"
                          >
                            <Boxes className="w-4 h-4 text-gray-500" />
                            <Input
                              className="text-xs h-8 flex-1"
                              {...register(
                                `modules.${index}.features.${fIndex}.name_en`
                              )}
                            />
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="text-xs text-gray-500 mt-2">No Features</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ComponentCard>

        {/* Branches & Stores */}
        <ComponentCard
          title="Branches & Stores"
          icon={<Store className="w-5 h-5 text-orange-500" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {organizationData?.branches.map((branch: any, index: any) => (
              <div
                key={branch.id}
                className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
              >
                <h3 className="text-xs font-semibold text-gray-800 flex items-center gap-2 text-xs">
                  <Building className="w-5 h-5 text-orange-500" />
                  {branch.branch_name_en}
                </h3>

                <div className="mt-3">
                  <h4 className="text-xs font-medium text-gray-600">Stores:</h4>
                  <div className="grid grid-cols-1 gap-3 mt-2">
                    {branch.stores.map((store: any, sIndex: any) => (
                      <div
                        key={store.id}
                        className="p-3 bg-gray-100 rounded-md w-full flex items-center gap-2"
                      >
                        <Store className="w-4 h-4 text-gray-500" />
                        <Input
                          className="text-sm h-9 w-full"
                          {...register(
                            `branches.${index}.stores.${sIndex}.store_name_en`
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ComponentCard>
      </div>
    </div>
  );
};
