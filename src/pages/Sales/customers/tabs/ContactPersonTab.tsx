import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { CustomerType } from "@/components/lib/validations/customer";
import Button from "@/components/ui/button/Button";
import {
  Briefcase,
  Building,
  Facebook,
  Mail,
  MessageSquareText,
  Phone,
  Plus,
  Trash,
  User,
  UserCheck,
  UserCircle,
} from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

const ContactPersonTab = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CustomerType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contact_persons",
  });

  // const socialMediaFields = fields.map((_, index) =>
  //   useFieldArray({
  //     control,
  //     name: `contact_persons.${index}.social_media`,
  //   })
  // );

  return (
    <div className="space-y-6">
      {fields.map((field, index) => {
        // const {
        //   fields: socialFields,
        //   append: appendSocial,
        //   remove: removeSocial,
        // } = socialMediaFields[index];

        return (
          <div
            key={field.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 border p-4 rounded-lg"
          >
            {/* Left Side Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Salutation (Ar)</Label>
                <Input
                  {...register(`contact_persons.${index}.salutation_ar`)}
                  error={!!errors.contact_persons?.[index]?.salutation_ar}
                  hint={errors.contact_persons?.[index]?.salutation_ar?.message}
                  placeholder="Enter salutation in Arabic"
                  icon={<MessageSquareText className="w-4 h-4" />}
                />
              </div>

              <div className="space-y-2">
                <Label>Salutation (En)</Label>
                <Input
                  {...register(`contact_persons.${index}.salutation_en`)}
                  error={!!errors.contact_persons?.[index]?.salutation_en}
                  hint={errors.contact_persons?.[index]?.salutation_en?.message}
                  placeholder="Enter salutation in English"
                  icon={<MessageSquareText className="w-4 h-4" />}
                />
              </div>

              <div className="space-y-2">
                <Label>Full Name (Ar)</Label>
                <Input
                  {...register(`contact_persons.${index}.full_name_ar`)}
                  error={!!errors.contact_persons?.[index]?.full_name_ar}
                  hint={errors.contact_persons?.[index]?.full_name_ar?.message}
                  placeholder="Enter full name in Arabic"
                  icon={<User className="w-4 h-4" />}
                />
              </div>

              <div className="space-y-2">
                <Label>Full Name (En)</Label>
                <Input
                  {...register(`contact_persons.${index}.full_name_en`)}
                  error={!!errors.contact_persons?.[index]?.full_name_en}
                  hint={errors.contact_persons?.[index]?.full_name_en?.message}
                  placeholder="Enter full name in English"
                  icon={<User className="w-4 h-4" />}
                />
              </div>

              <div className="space-y-2">
                <Label>First Name (Ar)</Label>
                <Input
                  {...register(`contact_persons.${index}.first_name_ar`)}
                  error={!!errors.contact_persons?.[index]?.first_name_ar}
                  hint={errors.contact_persons?.[index]?.first_name_ar?.message}
                  placeholder="Enter first name in Arabic"
                  icon={<UserCircle className="w-4 h-4" />}
                />
              </div>

              <div className="space-y-2">
                <Label>First Name (En)</Label>
                <Input
                  {...register(`contact_persons.${index}.first_name_en`)}
                  error={!!errors.contact_persons?.[index]?.first_name_en}
                  hint={errors.contact_persons?.[index]?.first_name_en?.message}
                  placeholder="Enter first name in English"
                  icon={<UserCircle className="w-4 h-4" />}
                />
              </div>

              <div className="space-y-2">
                <Label>Last Name (Ar)</Label>
                <Input
                  {...register(`contact_persons.${index}.last_name_ar`)}
                  error={!!errors.contact_persons?.[index]?.last_name_ar}
                  hint={errors.contact_persons?.[index]?.last_name_ar?.message}
                  placeholder="Enter last name in Arabic"
                  icon={<UserCheck className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* Right Side Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Last Name (En)</Label>
                <Input
                  {...register(`contact_persons.${index}.last_name_en`)}
                  error={!!errors.contact_persons?.[index]?.last_name_en}
                  hint={errors.contact_persons?.[index]?.last_name_en?.message}
                  placeholder="Enter last name in English"
                  icon={<User className="w-4 h-4" />}
                />
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  {...register(`contact_persons.${index}.email`)}
                  error={!!errors.contact_persons?.[index]?.email}
                  hint={errors.contact_persons?.[index]?.email?.message}
                  placeholder="Enter email"
                  icon={<Mail className="w-4 h-4" />}
                />
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  type="tel"
                  {...register(`contact_persons.${index}.mobile`)}
                  error={!!errors.contact_persons?.[index]?.mobile}
                  hint={errors.contact_persons?.[index]?.mobile?.message}
                  placeholder="Enter phone number"
                  icon={<Phone className="w-4 h-4" />}
                />
              </div>

              <div className="space-y-2">
                <Label>Designation</Label>
                <Input
                  {...register(`contact_persons.${index}.designation`)}
                  error={!!errors.contact_persons?.[index]?.designation}
                  hint={errors.contact_persons?.[index]?.designation?.message}
                  placeholder="Enter designation"
                  icon={<Briefcase className="w-4 h-4" />}
                />
              </div>

              <div className="space-y-2">
                <Label>Department</Label>
                <Input
                  {...register(`contact_persons.${index}.department`)}
                  error={!!errors.contact_persons?.[index]?.department}
                  hint={errors.contact_persons?.[index]?.department?.message}
                  placeholder="Enter department"
                  icon={<Building className="w-4 h-4" />}
                />
              </div>

              {/* Social Media Section */}
              {/* <div className="space-y-2">
                <Label>Social Media</Label>
                {socialFields.map((socialField, socialIndex) => (
                  <div key={socialField.id} className="flex gap-2 items-center">
                    <Input
                      {...register(
                        `contact_persons.${index}.social_media.${socialIndex}.platform`
                      )}
                      placeholder="Platform (e.g., Facebook)"
                    />
                    <Input
                      {...register(
                        `contact_persons.${index}.social_media.${socialIndex}.url`
                      )}
                      placeholder="URL"
                    />
                    <button
                      onClick={() => removeSocial(socialIndex)}
                      className=" bg-red-500 text-white p-1.5 rounded"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <Button
                  onClick={() => appendSocial({ platform: "", url: "" })}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Social Media
                </Button>
              </div> */}
            </div>

            {/* Remove Contact Button */}
            <div className="col-span-2 text-right">
              {fields.length > 1 && (
                <Button
                  onClick={() => remove(index)}
                  size="sm"
                  variant="outline"
                >
                  Remove Contact
                </Button>
              )}
            </div>
          </div>
        );
      })}

      {/* Add New Contact Button */}
      <Button
        onClick={() =>
          append({
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
          })
        }
      >
        Add Contact Person
      </Button>
    </div>
  );
};

export default ContactPersonTab;
