import { MdEdit } from "react-icons/md";
import { User } from "lucide-react";

const ContactDetailsCard = ({ contactData }) => {
  return (
    <div className="w-1/2 border rounded-sm bg-card flex flex-col h-fit">
      <div className="px-4 py-4 border-b bg-muted flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <User className="size-4" />
          Contact Details
        </h3>
        <div className="flex items-center gap-2">
          <button className="text-slate-500 hover:text-foreground transition-colors">
            <MdEdit className="size-4" />
          </button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {/* Name and Email */}
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Name</p>
            <p className="text-sm font-medium text-foreground">
              {contactData.name || "-"}
            </p>
          </div>
          <div className="px-4 py-2.5">
            <p className="text-xs text-muted-foreground mb-0.5">Email</p>
            <p className="text-sm font-medium text-foreground">
              {contactData.email || "-"}
            </p>
          </div>
        </div>
        {/* Contact No */}
        <div className="px-4 py-2.5">
          <p className="text-xs text-muted-foreground mb-0.5">Contact No</p>
          <p className="text-sm font-medium text-foreground">
            {contactData.contactNo || "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsCard;
