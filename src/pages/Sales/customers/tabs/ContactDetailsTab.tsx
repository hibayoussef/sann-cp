import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import {
  Badge,
  Briefcase,
  Building,
  Building2,
  Calendar,
  CreditCard,
  FileText,
  Globe,
  IdCard,
  Inbox,
  MapPin,
  Phone,
} from "lucide-react";

const ContactDetailsTab = ({
  register,
  errors,
}: {
  register: Function;
  errors: any;
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label>Passport Number</Label>
          <Input
            {...register("contact_details.passport_number")}
            error={!!errors.contact_details?.passport_number}
            hint={errors.contact_details?.passport_number?.message}
            placeholder="Enter passport number"
            icon={<FileText className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Work Phone</Label>
          <Input
            {...register("contact_details.work_phone")}
            error={!!errors.contact_details?.work_phone}
            hint={errors.contact_details?.work_phone?.message}
            type="tel"
            placeholder="Enter work phone"
            icon={<Phone className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Website URL</Label>
          <Input
            {...register("contact_details.website_url")}
            error={!!errors.contact_details?.website_url}
            hint={errors.contact_details?.website_url?.message}
            type="url"
            placeholder="Enter website URL"
            icon={<Globe className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Department</Label>
          <Input
            {...register("contact_details.department")}
            error={!!errors.contact_details?.department}
            hint={errors.contact_details?.department?.message}
            placeholder="Enter department name"
            icon={<Building className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Profession</Label>
          <Input
            {...register("contact_details.profession")}
            error={!!errors.contact_details?.profession}
            hint={errors.contact_details?.profession?.message}
            placeholder="Enter profession"
            icon={<Briefcase className="w-4 h-4" />}
          />
        </div>
        <div className="space-y-2">
          <Label>Designation</Label>
          <Input
            {...register("contact_details.designation")}
            error={!!errors.contact_details?.designation}
            hint={errors.contact_details?.designation?.message}
            placeholder="Enter designation"
            icon={<Badge className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Social Media</Label>
          <Input
            {...register("contact_details.social_media")}
            error={!!errors.contact_details?.social_media}
            hint={errors.contact_details?.social_media?.message}
            placeholder="Enter social media profile/link"
            icon={<Globe className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Issued Date</Label>
          <Input
            {...register("contact_details.id_issued_date")}
            error={!!errors.contact_details?.id_issued_date}
            hint={errors.contact_details?.id_issued_date?.message}
            type="date"
          />
        </div>
        <div className="space-y-2">
          <Label>Expiry Date</Label>
          <Input
            {...register("contact_details.id_expiry_date")}
            error={!!errors.contact_details?.id_expiry_date}
            hint={errors.contact_details?.id_expiry_date?.message}
            type="date"
          />
        </div>
        <div className="space-y-2">
          <Label>Unified Number</Label>
          <Input
            {...register("contact_details.unified_number")}
            error={!!errors.contact_details?.unified_number}
            hint={errors.contact_details?.unified_number?.message}
            type="number"
            placeholder="Enter unified number"
            icon={<IdCard className="w-4 h-4" />}
          />
        </div>
        <div className="space-y-2">
          <Label>Date of birth</Label>
          <Input
            {...register("contact_details.date_of_birth")}
            error={!!errors.contact_details?.date_of_birth}
            hint={errors.contact_details?.date_of_birth?.message}
            type="date"
          />
        </div>
        <div className="space-y-2">
          <Label>Place of birth</Label>
          <Input
            {...register("contact_details.place_of_birth")}
            error={!!errors.contact_details?.place_of_birth}
            hint={errors.contact_details?.place_of_birth?.message}
            type="date"
          />
        </div>
        <div className="space-y-2">
          <Label> Visa Number</Label>
          <div className="relative group">
            <Input
              {...register("contact_details.visit_visa_number", {
                valueAsNumber: true,
              })}
              error={!!errors.contact_details?.visit_visa_number}
              hint={errors.contact_details?.visit_visa_number?.message}
              type="number"
              className="pl-12"
              placeholder="Enter visit visa number"
            />
            <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none bg-gray-50 border-r border-gray-300 rounded-l-md group-focus-within:border-blue-500 dark:bg-gray-800 dark:border-gray-700">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="6.25" cy="10" r="5.625" fill="#E80B26" />
                <circle cx="13.75" cy="10" r="5.625" fill="#F59D31" />
                <path
                  d="M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z"
                  fill="#FC6020"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Driving License Number</Label>
          <Input
            {...register("contact_details.driving_license_number")}
            error={!!errors.contact_details?.driving_license_number}
            hint={errors.contact_details?.driving_license_number?.message}
            type="number"
            placeholder="Enter driving license number"
            icon={<CreditCard className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Driving License Issued By</Label>
          <Input
            {...register("contact_details.driving_license_issued_by")}
            error={!!errors.contact_details?.driving_license_issued_by}
            hint={errors.contact_details?.driving_license_issued_by?.message}
            placeholder="Enter issuing authority"
            icon={<Building className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Driving License Issued Date</Label>
          <Input
            {...register("contact_details.driving_license_issued_date")}
            error={!!errors.contact_details?.driving_license_issued_date}
            hint={errors.contact_details?.driving_license_issued_date?.message}
            type="date"
            icon={<Calendar className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Driving License Expiry Date</Label>
          <Input
            {...register("contact_details.driving_license_expiry_date")}
            error={!!errors.contact_details?.driving_license_expiry_date}
            hint={errors.contact_details?.driving_license_expiry_date?.message}
            type="date"
            icon={<Calendar className="w-4 h-4 text-red-500" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Home Address</Label>
          <Input
            {...register("contact_details.home_address")}
            error={!!errors.contact_details?.home_address}
            hint={errors.contact_details?.home_address?.message}
            placeholder="Enter home address"
            icon={<MapPin className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Work Address</Label>
          <Input
            {...register("contact_details.work_address")}
            error={!!errors.contact_details?.work_address}
            hint={errors.contact_details?.work_address?.message}
            placeholder="Enter work address"
            icon={<Building2 className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>P.O. Box</Label>
          <Input
            {...register("contact_details.p_o_box")}
            error={!!errors.contact_details?.p_o_box}
            hint={errors.contact_details?.p_o_box?.message}
            placeholder="Enter P.O. Box number"
            icon={<Inbox className="w-4 h-4" />}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsTab;
