import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import {
  Briefcase,
  Building,
  Facebook,
  Mail,
  MessageSquareText,
  Phone,
  User,
  UserCheck,
  UserCircle,
} from "lucide-react";

const ContactPersonTab = ({
  register,
  errors,
}: {
  register: Function;
  errors: any;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Salutation (Ar)</Label>
          <Input
            {...register("contact_persons.0.salutation_ar")}
            error={!!errors.contact_persons?.["0"]?.salutation_ar}
            hint={errors.contact_persons?.["0"]?.salutation_ar?.message}
            placeholder="Enter salutation in Arabic"
            icon={<MessageSquareText className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Salutation (En)</Label>
          <Input
            {...register("contact_persons.0.salutation_en")}
            error={!!errors.contact_persons?.["0"]?.salutation_en}
            hint={errors.contact_persons?.["0"]?.salutation_en?.message}
            placeholder="Enter salutation in English"
            icon={<MessageSquareText className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Full Name (Ar)</Label>
          <Input
            {...register("contact_persons.0.full_name_ar")}
            error={!!errors.contact_persons?.["0"]?.full_name_ar}
            hint={errors.contact_persons?.["0"]?.full_name_ar?.message}
            placeholder="Enter full name in Arabic"
            icon={<User className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Full Name (En)</Label>
          <Input
            {...register("contact_persons.0.full_name_en")}
            error={!!errors.contact_persons?.["0"]?.full_name_en}
            hint={errors.contact_persons?.["0"]?.full_name_en?.message}
            placeholder="Enter full name in English"
            icon={<User className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>First Name (Ar)</Label>
          <Input
            {...register("contact_persons.0.first_name_ar")}
            error={!!errors.contact_persons?.["0"]?.first_name_ar}
            hint={errors.contact_persons?.["0"]?.first_name_ar?.message}
            placeholder="Enter full name in Arabic"
            icon={<UserCircle className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>First Name (En)</Label>
          <Input
            {...register("contact_persons.0.first_name_en")}
            error={!!errors.contact_persons?.["0"]?.first_name_en}
            hint={errors.contact_persons?.["0"]?.first_name_en?.message}
            placeholder="Enter first name in English"
            icon={<UserCircle className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Last Name (Ar)</Label>
          <Input
            {...register("contact_persons.0.last_name_ar")}
            error={!!errors.contact_persons?.["0"]?.last_name_ar}
            hint={errors.contact_persons?.["0"]?.last_name_ar?.message}
            placeholder="Enter full name in Arabic"
            icon={<UserCheck className="w-4 h-4" />}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Last Name (En)</Label>
          <Input
            {...register("contact_persons.0.last_name_en")}
            error={!!errors.contact_persons?.["0"]?.last_name_en}
            hint={errors.contact_persons?.["0"]?.last_name_en?.message}
            placeholder="Enter last name in English"
            icon={<User className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            {...register("contact_persons.0.email")}
            error={!!errors.contact_persons?.[0]?.email}
            hint={errors.contact_persons?.[0]?.email?.message}
            placeholder="Enter your email"
            icon={<Mail className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Phone</Label>
          <Input
            type="tel"
            {...register("contact_persons.0.mobile")}
            error={!!errors.contact_persons?.[0]?.mobile}
            hint={errors.contact_persons?.[0]?.mobile?.message}
            placeholder="Enter phone number"
            icon={<Phone className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Designation</Label>
          <Input
            {...register("contact_persons.0.designation")}
            error={!!errors.contact_persons?.[0]?.designation}
            hint={errors.contact_persons?.[0]?.designation?.message}
            placeholder="Enter designation"
            icon={<Briefcase className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Department</Label>
          <Input
            {...register("contact_persons.0.department")}
            error={!!errors.contact_persons?.[0]?.department}
            hint={errors.contact_persons?.[0]?.department?.message}
            placeholder="Enter department"
            icon={<Building className="w-4 h-4" />}
          />
        </div>

        <div className="space-y-2">
          <Label>Social Media</Label>
          <Input
            {...register("contact_persons.0.social_media")}
            error={!!errors.contact_persons?.[0]?.social_media}
            hint={errors.contact_persons?.[0]?.social_media?.message}
            placeholder="Enter social media handle"
            icon={<Facebook className="w-4 h-4" />}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPersonTab;
