import { useState } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { useMeStore } from "../../../store/useMeStore";
import { useAddWarranty } from "@/hooks/prouducts/useWarranties";

export default function CreateWarranty() {
  const [warrantyNameAr, setWarrantyNameAr] = useState("");
  const [warrantyNameEn, setWarrantyNameEn] = useState("");
  const [duration, setDuration] = useState("");
  const [durationType, setDurationType] = useState("");

  const addWarranty = useAddWarranty();
  const organizationId = useMeStore((state) => state.organizationId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addWarranty.mutateAsync({
      organization_id: organizationId,
      warranty_name_ar: warrantyNameAr,
      warranty_name_en: warrantyNameEn,
      duration,
      duration_type: durationType,
    });
  };

  return (
    <>
      <PageBreadcrumb
        baseLink="/warranties"
        baseTitle="Warranties"
        pageTitle="Create Warranty"
      />

      <ComponentCard title="Create Warranty">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Label htmlFor="warranty-name-ar">Warranty Name (Ar)</Label>
              <Input
                type="text"
                id="warranty-name-ar"
                value={warrantyNameAr}
                onChange={(e) => setWarrantyNameAr(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="warranty-name-en">Warranty Name (En)</Label>
              <Input
                type="text"
                id="warranty-name-en"
                value={warrantyNameEn}
                onChange={(e) => setWarrantyNameEn(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="duration-type">Duration Type</Label>
              <select
                id="duration-type"
                value={durationType}
                onChange={(e) => setDurationType(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Type</option>
                <option value="days">Days</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 text-sm font-medium disabled:opacity-50 text-white transition rounded-lg shadow-theme-xs bg-[#575db1] hover:bg-[#474ca1]"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </ComponentCard>
    </>
  );
}
