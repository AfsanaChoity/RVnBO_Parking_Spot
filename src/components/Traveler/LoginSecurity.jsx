import { useState } from "react";
import TealButton from "../common/TealButton";
import HeadingSmall from "../common/HeadingSmall";
import InputPassword from "../common/InputPassword";
import toast from "react-hot-toast";
import { useChangePasswordMutation } from "../../redux/api/travelerApi";
import MintButton from "../common/MintButton";

export default function LoginSecurity() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  // ≥ 8 characters
  const isStrongEnough = (pwd) => /^.{8,}$/.test(pwd);

  const handleSave = () => {
    // ✅ use currentPassword here
    const { currentPassword, newPassword, confirmPassword } = formData;

    // Client-side validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    if (!isStrongEnough(newPassword)) {
      toast.error("New password must be at least 8 characters.");
      return;
    }

    // ✅ send exactly what backend expects
    changePassword({ currentPassword, newPassword, confirmPassword })
      .unwrap()
      .then(() => {
        toast.success("Password changed successfully.");
        setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.data?.message || err?.error || "Failed to change password.");
      });
  };

  const handleReset = () => {
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleConfirmKeyDown = (e) => {
    if (e.key === "Enter" && !isLoading) handleSave();
  };

  return (
    <div className="px-4 md:px-0">
      {/* Heading */}
      <div>
        <HeadingSmall text="Change Password" />
      </div>

      {/* Password fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pb-18">
        <InputPassword
          value={formData.currentPassword}                 
          onChange={handleInputChange("currentPassword")}   
          label="Current Password"
          placeholder="Current password"
        />
        <InputPassword
          value={formData.newPassword}
          onChange={handleInputChange("newPassword")}
          label="New Password"
          placeholder="New password"
        />
        <InputPassword
          value={formData.confirmPassword}
          onChange={handleInputChange("confirmPassword")}
          onKeyDown={handleConfirmKeyDown}
          label="Confirm Password"
          placeholder="Confirm password"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-8 justify-center pb-4">
        <div className="max-w-3xs">
          <TealButton
            text={isLoading ? "Saving..." : "Save"}
            onClick={handleSave}
          />
        </div>

        <div className="max-w-3xs">
          <MintButton
            text="Reset"
            onClick={handleReset}
          />
        </div>
      </div>
    </div>
  );
}
