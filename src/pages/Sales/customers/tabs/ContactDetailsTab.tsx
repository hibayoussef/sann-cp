import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { CustomerType } from "@/components/lib/validations/customer";
import { CustomSelect } from "@/components/ui/select/customSelect";
import { CountriesData } from "@/types/common";
import {
  Badge,
  Briefcase,
  Building,
  Building2,
  Calendar,
  CreditCard,
  Facebook,
  FileText,
  Globe,
  IdCard,
  Inbox,
  Instagram,
  MapPin,
  MessageSquare,
  Phone,
  Plus,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const socialMediaOptions = [
  {
    id: "facebook",
    label: "Facebook",
    icon: <Facebook className="w-4 h-4" />,
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: <Instagram className="w-4 h-4" />,
  },
  {
    id: "tiktok",
    label: "TikTok",
    icon: <MessageSquare className="w-4 h-4" />,
  },
];

const ContactDetailsTab = ({
  countriesData,
}: {
  countriesData: CountriesData | undefined;
}) => {
  const {
    register,
    formState: { errors },
    watch,
    control,
    setValue,
    getValues,
  } = useFormContext<CustomerType>();

  const {
    fields: socialFields
  } = useFieldArray({
    control,
    name: "contact_details.social_media",
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Get the current nationality ID to filter states
  const nationalityId = watch("nationality_id");
  const [stateOptions, setStateOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);

  // Update state options when nationality changes
  useEffect(() => {
    if (countriesData && nationalityId) {
      const country = countriesData.data.find(
        (country) => country.id.toString() === nationalityId
      );
      if (country) {
        const options = country.country_states.map((state) => ({
          value: state.id.toString(),
          label: state.name_en,
        }));
        setStateOptions(options);
      } else {
        setStateOptions([]);
      }
    } else {
      setStateOptions([]);
    }
  }, [nationalityId, countriesData]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddSocialMedia = (_: any, platform: string) => {
    const currentSocials = getValues(`contact_details.social_media`) || [];
    const exists = currentSocials.some(
      (field: any) => field.platform.toLowerCase() === platform.toLowerCase()
    );

    if (!exists) {
      const newSocials = [...currentSocials, { platform, url: "" }];
      setValue(`contact_details.social_media`, newSocials);
    }
    setIsMenuOpen(false);
  };

  const getSocialMediaIcon = (platform: string) => {
    const option = socialMediaOptions.find(
      (opt) => opt.id.toLowerCase() === platform.toLowerCase()
    );
    return option ? option.icon : <Globe className="w-4 h-4" />;
  };

  const handleRemoveSocialMedia = (_: any, socialIndex: number) => {
    const currentSocials = [...(getValues(`contact_details.social_media`) || [])];
    currentSocials.splice(socialIndex, 1);
    setValue(`contact_details.social_media`, currentSocials);
  };

  // دالة لتحويل القيم null إلى strings فارغة
  const handleNullValues = (value: any) => {
    return value === null ? "" : value;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 dark:bg-gray-900">
        <div className="space-y-2">
          <Label>Passport Number</Label>
          <Input
            {...register("contact_details.passport_number", {
              setValueAs: (v) => handleNullValues(v),
            })}
            error={!!errors.contact_details?.passport_number}
            hint={errors.contact_details?.passport_number?.message}
            placeholder="Enter passport number"
            icon={<FileText className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Work Phone</Label>
          <Input
            {...register("contact_details.work_phone", {
              setValueAs: (v) => handleNullValues(v),
            })}
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
            {...register("contact_details.website_url", {
              setValueAs: (v) => handleNullValues(v),
            })}
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
            {...register("contact_details.department", {
              setValueAs: (v) => handleNullValues(v),
            })}
            error={!!errors.contact_details?.department}
            hint={errors.contact_details?.department?.message}
            placeholder="Enter department name"
            icon={<Building className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Profession</Label>
          <Input
            {...register("contact_details.profession", {
              setValueAs: (v) => handleNullValues(v),
            })}
            error={!!errors.contact_details?.profession}
            hint={errors.contact_details?.profession?.message}
            placeholder="Enter profession"
            icon={<Briefcase className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Designation</Label>
          <Input
            {...register("contact_details.designation", {
              setValueAs: (v) => handleNullValues(v),
            })}
            error={!!errors.contact_details?.designation}
            hint={errors.contact_details?.designation?.message}
            placeholder="Enter designation"
            icon={<Badge className="w-4 h-4" />}
          />
        </div>

        {/* Social Media Section */}
        <div className="space-y-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <Label>Social Media</Label>
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
              >
                <Plus className="w-3 h-3" />
              </button>

              {isMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 overflow-hidden border border-gray-200 dark:border-gray-700">
                  {socialMediaOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleAddSocialMedia(0, option.id)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                    >
                      <span className="mr-2">{option.icon}</span>
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {socialFields.length === 0 ? (
            <div className="text-sm text-gray-500 dark:text-gray-400 italic py-2">
              No social media accounts added
            </div>
          ) : (
            socialFields.map((socialField: any, socialIndex) => (
              <div
                key={socialIndex}
                className="flex gap-2 items-center mb-2 animate-fade-in"
              >
                <div className="relative w-1/3">
                  <Input
                    {...register(
                      `contact_details.social_media.${socialIndex}.platform`,
                      { setValueAs: (v) => handleNullValues(v) }
                    )}
                    readOnly
                    icon={getSocialMediaIcon(socialField.platform)}
                    className="text-xs"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    {...register(
                      `contact_details.social_media.${socialIndex}.url`,
                      { setValueAs: (v) => handleNullValues(v) }
                    )}
                    placeholder="Enter URL"
                    type="url"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSocialMedia(0, socialIndex)}
                  className="text-gray-500 hover:text-red-500 transition-colors duration-200 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="space-y-2">
          <Label>Issued Date</Label>
          <Input
            {...register("contact_details.id_issued_date", {
              setValueAs: (v) => handleNullValues(v),
            })}
            error={!!errors.contact_details?.id_issued_date}
            hint={errors.contact_details?.id_issued_date?.message}
            type="date"
          />
        </div>

        <div className="space-y-2">
          <Label>Expiry Date</Label>
          <Input
            {...register("contact_details.id_expiry_date", {
              setValueAs: (v) => handleNullValues(v),
            })}
            error={!!errors.contact_details?.id_expiry_date}
            hint={errors.contact_details?.id_expiry_date?.message}
            type="date"
          />
        </div>

        <div className="space-y-2">
          <Label>Unified Number</Label>
          <Input
            {...register("contact_details.unified_number", {
              setValueAs: (v) => handleNullValues(v),
            })}
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
            {...register("contact_details.date_of_birth", {
              setValueAs: (v) => handleNullValues(v),
            })}
            error={!!errors.contact_details?.date_of_birth}
            hint={errors.contact_details?.date_of_birth?.message}
            type="date"
          />
        </div>

        <div className="space-y-2">
          <Label>Place of birth</Label>
          <Input
            {...register("contact_details.place_of_birth", {
              setValueAs: (v) => handleNullValues(v),
            })}
            error={!!errors.contact_details?.place_of_birth}
            hint={errors.contact_details?.place_of_birth?.message}
            placeholder="Enter place of birth"
          />
        </div>

        <div className="space-y-2">
          <Label>Visa Number</Label>
          <div className="relative group">
            <Input
              {...register("contact_details.visit_visa_number", {
                setValueAs: (v) => (v === "" || v === null ? undefined : Number(v)),
              })}
              error={!!errors.contact_details?.visit_visa_number}
              hint={errors.contact_details?.visit_visa_number?.message}
              type="number"
              className="pl-12"
              placeholder="Enter visit visa number (optional)"
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
            {...register("contact_details.driving_license_number", {
              setValueAs: (v) => handleNullValues(v),
            })}
            error={!!errors.contact_details?.driving_license_number}
            hint={errors.contact_details?.driving_license_number?.message}
            type="number"
            placeholder="Enter driving license number"
            icon={<CreditCard className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Driving License Issued By</Label>
          <CustomSelect
            name="contact_details.driving_license_issued_by"
            options={stateOptions}
            placeholder="Select State"
            searchPlaceholder="Search states..."
            error={errors.contact_details?.driving_license_issued_by?.message}
            onChange={(value) => {
              setValue("contact_details.driving_license_issued_by", value);
            }}
          />
        </div>

        <div className="space-y-2">
          <Label>Driving License Issued Date</Label>
          <Input
            {...register("contact_details.driving_license_issued_date", {
              setValueAs: (v) => handleNullValues(v),
            })}
            error={!!errors.contact_details?.driving_license_issued_date}
            hint={errors.contact_details?.driving_license_issued_date?.message}
            type="date"
            icon={<Calendar className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Driving License Expiry Date</Label>
          <Input
            {...register("contact_details.driving_license_expiry_date", {
              setValueAs: (v) => handleNullValues(v),
            })}
            error={!!errors.contact_details?.driving_license_expiry_date}
            hint={errors.contact_details?.driving_license_expiry_date?.message}
            type="date"
            icon={<Calendar className="w-4 h-4 text-red-500" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Home Address</Label>
          <Input
            {...register("contact_details.home_address", {
              setValueAs: (v) => handleNullValues(v),
            })}
            error={!!errors.contact_details?.home_address}
            hint={errors.contact_details?.home_address?.message}
            placeholder="Enter home address"
            icon={<MapPin className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Work Address</Label>
          <Input
            {...register("contact_details.work_address", {
              setValueAs: (v) => handleNullValues(v),
            })}
            error={!!errors.contact_details?.work_address}
            hint={errors.contact_details?.work_address?.message}
            placeholder="Enter work address"
            icon={<Building2 className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>P.O. Box</Label>
          <Input
            {...register("contact_details.p_o_box", {
              setValueAs: (v) => handleNullValues(v),
            })}
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