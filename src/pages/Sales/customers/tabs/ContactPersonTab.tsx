import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { CustomerType } from "@/components/lib/validations/customer";
import {
  Briefcase,
  Building,
  Facebook,
  Globe,
  Instagram,
  Mail,
  MessageSquare,
  MessageSquareText,
  Phone,
  Plus,
  PlusCircle,
  Trash2,
  Type,
  X
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

const ContactPersonTab = () => {
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useFormContext<CustomerType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contact_persons",
      keyName: "keyId"
  });

  console.log('fieeee: ', fields)
  const [socialMenuOpen, setSocialMenuOpen] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setSocialMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddSocialMedia = (personIndex: number, platform: string) => {
    const currentSocials =
      getValues(`contact_persons.${personIndex}.social_media`) || [];
    const exists = currentSocials.some(
      (field: any) => field.platform.toLowerCase() === platform.toLowerCase()
    );

    if (!exists) {
      const newSocials = [...currentSocials, { platform, url: "" }];
      setValue(`contact_persons.${personIndex}.social_media`, newSocials);
    }
    setSocialMenuOpen(null);
  };

  const handleRemoveSocialMedia = (
    personIndex: number,
    socialIndex: number
  ) => {
    const currentSocials = [
      ...(getValues(`contact_persons.${personIndex}.social_media`) || []),
    ];
    currentSocials.splice(socialIndex, 1);
    setValue(`contact_persons.${personIndex}.social_media`, currentSocials);
  };

  const getSocialMediaIcon = (platform: string) => {
    const option = socialMediaOptions.find(
      (opt) => opt.id.toLowerCase() === platform.toLowerCase()
    );
    return option ? option.icon : <Globe className="w-4 h-4" />;
  };

  const handleAddNewContact = () => {
    const newContact = {
           id: null,
      salutation_ar: "",
      salutation_en: "",
      full_name_ar: "",
      full_name_en: "",
      first_name_ar: "",
      first_name_en: "",
      last_name_ar: "",
      last_name_en: "",
      email: "",
      mobile: "",
      designation: "",
      department: "",
      social_media: [],
    };

    append(newContact);
    setIsAddingNew(true);
  };

  const handleCancelAdd = (index: number) => {
    remove(index);
    setIsAddingNew(false);
  };

  useEffect(() => {
    const currentPersons = getValues("contact_persons") || [];
    if (currentPersons.length > 0) {
      currentPersons.forEach((_, index) => {
        const currentSocials = getValues(
          `contact_persons.${index}.social_media`
        );
        if (!currentSocials) {
          setValue(`contact_persons.${index}.social_media`, []);
        }
      });
    }
  }, [getValues, setValue]);

  return (
    <div className="space-y-6">
      {fields.map((field, index) => {
        const socialMedia =
          watch(`contact_persons.${index}.social_media`) || [];
        const isPendingContact = isAddingNew && index === fields.length - 1;
        const fieldErrors = errors.contact_persons?.[index];

        return (
          <div
            key={field?.id}
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 border p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm relative ${
              isPendingContact ? "border-2 border-blue-500" : ""
            }`}
          >
            {/* Pending Contact Banner */}
            {isPendingContact && (
              <div className="absolute -top-3 left-4 bg-blue-500 text-white text-sm px-3 py-1 rounded-full flex items-center">
                <span>New Contact</span>
                <button
                  onClick={() => handleCancelAdd(index)}
                  className="ml-2 p-0.5 rounded-full hover:bg-blue-600"
                  title="Cancel addition"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Remove Contact Button (for existing contacts) */}
            {!isPendingContact && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-200"
                title="Remove contact"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}

            {/* Left Side Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>First Name (En)</Label>
                <Input
                  {...register(`contact_persons.${index}.first_name_en`)}
                  error={!!fieldErrors?.first_name_en}
                  hint={fieldErrors?.first_name_en?.message}
                  placeholder="Enter first name in English"
                  icon={<Type className="w-4 h-4" />}
                />
              </div>

              <div className="space-y-2">
                <Label>First Name (Ar)</Label>
                <Input
                  {...register(`contact_persons.${index}.first_name_ar`)}
                  placeholder="Enter first name in Arabic"
                  icon={<Type className="w-4 h-4" />}
                />
              </div>
              {/* <div className="space-y-2">
                <Label>Full Name (Ar)</Label>
                <Input
                  {...register(`contact_persons.${index}.full_name_ar`)}
                  placeholder="Enter full name in Arabic"
                  icon={<User className="w-4 h-4" />}
                />
              </div> */}

              {/* <div className="space-y-2">
                <Label>Full Name (En)</Label>
                <Input
                  {...register(`contact_persons.${index}.full_name_en`)}
                  error={!!fieldErrors?.full_name_en}
                  hint={fieldErrors?.full_name_en?.message}
                  placeholder="Enter full name in English"
                  icon={<User className="w-4 h-4" />}
                />
              </div> */}

              {/* <div className="space-y-2">
                <Label>First Name (Ar)</Label>
                <Input
                  {...register(`contact_persons.${index}.first_name_ar`)}
                  placeholder="Enter first name in Arabic"
                  icon={<UserCircle className="w-4 h-4" />}
                />
              </div> */}
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  type="tel"
                  {...register(`contact_persons.${index}.mobile`)}
                  placeholder="Enter phone number"
                  icon={<Phone className="w-4 h-4" />}
                />
              </div>
              <div className="space-y-2">
                <Label>Salutation (En)</Label>
                <Input
                  {...register(`contact_persons.${index}.salutation_en`)}
                  placeholder="Enter salutation in English"
                  icon={<MessageSquareText className="w-4 h-4" />}
                />
              </div>

              <div className="space-y-2">
                <Label>Department</Label>
                <Input
                  {...register(`contact_persons.${index}.department`)}
                  placeholder="Enter department"
                  icon={<Building className="w-4 h-4" />}
                />
              </div>

              {/* Social Media Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Social Media</Label>
                  <div className="relative" ref={menuRef}>
                    <button
                      type="button"
                      onClick={() =>
                        setSocialMenuOpen(
                          socialMenuOpen === index ? null : index
                        )
                      }
                      className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
                    >
                      <Plus className="w-3 h-3" />
                    </button>

                    {socialMenuOpen === index && (
                      <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 overflow-hidden border border-gray-200 dark:border-gray-700">
                        {socialMediaOptions.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() =>
                              handleAddSocialMedia(index, option.id)
                            }
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

                {socialMedia.length === 0 ? (
                  <div className="text-sm text-gray-500 dark:text-gray-400 italic py-2">
                    No social media accounts added
                  </div>
                ) : (
                  socialMedia.map((socialField: any, socialIndex: any) => (
                    <div
                      key={socialIndex}
                      className="flex gap-2 items-center mb-2 animate-fade-in"
                    >
                      <div className="relative w-1/3">
                        <Input
                          {...register(
                            `contact_persons.${index}.social_media.${socialIndex}.platform`
                          )}
                          readOnly
                          icon={getSocialMediaIcon(socialField.platform)}
                          className="text-xs"
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          {...register(
                            `contact_persons.${index}.social_media.${socialIndex}.url`
                          )}
                          placeholder="Enter URL"
                          type="url"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveSocialMedia(index, socialIndex)
                        }
                        className="text-gray-500 hover:text-red-500 transition-colors duration-200 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Side Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Last Name (En)</Label>
                <Input
                  {...register(`contact_persons.${index}.last_name_en`)}
                  error={!!fieldErrors?.last_name_en}
                  hint={fieldErrors?.last_name_en?.message}
                  placeholder="Enter last name in English"
                  icon={<Type className="w-4 h-4" />}
                />
              </div>
              <div className="space-y-2">
                <Label>Last Name (Ar)</Label>
                <Input
                  {...register(`contact_persons.${index}.last_name_ar`)}
                  placeholder="Enter last name in Arabic"
                  icon={<Type className="w-4 h-4" />}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  {...register(`contact_persons.${index}.email`)}
                  placeholder="Enter email"
                  icon={<Mail className="w-4 h-4" />}
                  error={!!fieldErrors?.email}
                  hint={fieldErrors?.email?.message}
                />
              </div>
              <div className="space-y-2">
                <Label>Salutation (Ar)</Label>
                <Input
                  {...register(`contact_persons.${index}.salutation_ar`)}
                  placeholder="Enter salutation in Arabic"
                  icon={<MessageSquareText className="w-4 h-4" />}
                />
              </div>

              <div className="space-y-2">
                <Label>Designation</Label>
                <Input
                  {...register(`contact_persons.${index}.designation`)}
                  placeholder="Enter designation"
                  icon={<Briefcase className="w-4 h-4" />}
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* Add New Contact Button */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={handleAddNewContact}
          disabled={isAddingNew}
          className={`flex items-center justify-center gap-3 px-1 py-2 rounded-lg w-full max-w-xs transition-all duration-200 border-2 border-dashed ${
            isAddingNew
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-blue-500 text-blue-600 hover:border-blue-600 hover:text-blue-700 dark:border-blue-400 dark:text-blue-400 dark:hover:border-blue-300 dark:hover:text-blue-300"
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span className="text-xs font-medium">
            {isAddingNew ? "Adding New Contact..." : "Add New Contact"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ContactPersonTab;
