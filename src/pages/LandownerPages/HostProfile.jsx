import { useState, useRef } from "react";
import { Tabs, Input } from "antd";
import "../../styles/HostProfile.css";
import { FaEye, FaEyeSlash, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import TealButton from "../../components/common/TealButton";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { FaCamera } from "react-icons/fa";
import { useChangeHostPasswordMutation, useUpdateHostProfileMutation } from "../../redux/api/landownerApi";
import { useGetUserQuery } from "../../redux/api/authApi";
import LoadingComponent from "../../components/common/LoadingComponent";
import { toast } from "react-hot-toast";

const { TabPane } = Tabs;
const { Password } = Input;

const passwordFields = [
  { label: "Current Password", name: "currentPassword", type: "password", placeholder: "**********" },
  { label: "New Password", name: "newPassword", type: "password", placeholder: "**********" },
  { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "**********" },
];

const tabs = [
  { key: "1", label: "Edit Profile" },
  { key: "2", label: "Change Password" },
];

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 24,
  height: 24,
  border: `2px solid ${theme.palette.background.paper}`,
  background: "#468F9D",
  color: "#fff",
  cursor: "pointer",
}));

// US phone validation (NANP)
function isValidUSPhone(input) {
  if (!input) return false;
  const digits = String(input).replace(/\D/g, "");
  const ten = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (ten.length !== 10) return false;
  const area = ten.slice(0, 3);
  const exch = ten.slice(3, 6);
  if (/[01]/.test(area[0]) || /[01]/.test(exch[0])) return false;
  return true;
}

export default function HostProfile() {
  const [activeTab, setActiveTab] = useState("1");
  const [imageDataUrl, setImageDataUrl] = useState(null); // base64 preview + payload

  const [updateHostProfile, { isLoading: isUpdatingProfile }] = useUpdateHostProfileMutation();
  const [changeHostPassword, { isLoading: isChangingPassword }] = useChangeHostPasswordMutation();

  const { data: userData, error: userError, isLoading: isUserLoading } = useGetUserQuery();
  const user = userData?.user;

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

 

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTabChange = (key) => setActiveTab(key);
  const handlePrevious = () => {
    const currentIndex = tabs.findIndex((tab) => tab.key === activeTab);
    if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1].key);
  };
  const handleNext = () => {
    const currentIndex = tabs.findIndex((tab) => tab.key === activeTab);
    if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1].key);
  };

  const currentTabIndex = tabs.findIndex((tab) => tab.key === activeTab);
  const currentTabLabel = tabs[currentTabIndex]?.label;

  // ---------- Image upload ----------
  const fileInputRef = useRef(null);
  const openPicker = () => fileInputRef.current?.click();

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Please choose a JPG, PNG, or WEBP image.");
      event.target.value = "";
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image is too large. Max size is 2MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImageDataUrl(e.target.result); // base64 Data URL for preview & backend
    };
    reader.readAsDataURL(file);
  };

  const avatarSrc = imageDataUrl || user?.image || undefined;

  // ---------- Save Profile ----------
  const handleProfileSave = async () => {
    const name = formData.name?.trim();
    const contact = formData.contact?.trim();
    const address = formData.address?.trim();

    // allow saving only the image (no other fields)
    if (!name && !contact && !address && !imageDataUrl) {
      toast.error("Please fill at least one field before saving.");
      return;
    }

    if (contact && !isValidUSPhone(contact)) {
      toast.error("Please enter valid phone number.");
      return;
    }

    // Build payload only with provided fields to satisfy your backend
    const payload = {
      ...(name ? { name } : {}),
      ...(contact ? { phoneNumber: contact } : {}), // map contact -> phoneNumber (your backend)
      ...(address ? { address } : {}),
      ...(imageDataUrl ? { image: imageDataUrl } : {}),
    };

    try {
      await updateHostProfile(payload).unwrap();
      toast.success("Profile updated successfully.");
      // Clear preview & file input so same file can be chosen again later
      setImageDataUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      const errMsg = err?.data?.message || err?.error || "Failed to update profile.";
      toast.error(errMsg);
    }
  };

  // ---------- Change Password ----------
  const handlePasswordSave = async () => {
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    if (currentPassword === newPassword) {
      toast.error("New password must be different from current password.");
      return;
    }

    try {
      await changeHostPassword({ currentPassword, newPassword, confirmPassword }).unwrap();
      toast.success("Password updated successfully.");
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      const errMsg = err?.data?.message || err?.error || "Failed to change password.";
      toast.error(errMsg);
    }
  };

  if (isUserLoading) return <div><LoadingComponent /></div>;
  if (userError) return <div className="text-red-600">Failed to load user.</div>;

  return (
    <>
      <div className="rounded-[8px] bg-white shadow-lg p-3 sm:p-6">
        {/* Avatar and name */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <SmallAvatar onClick={openPicker} title="Change photo">
                  <FaCamera size={12} />
                </SmallAvatar>
              }
            >
              <Avatar alt="User" src={avatarSrc} sx={{ width: 80, height: 80 }} />
            </Badge>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <h2 className="mt-2 text-[20px] sm:text-[30px] font-[Inter] font-medium">
            {user?.name || "Mr. Admin"}
          </h2>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="block sm:hidden mt-4 mb-6">
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
            <button
              onClick={handlePrevious}
              disabled={currentTabIndex === 0}
              className={`p-2 rounded-full transition-colors ${
                currentTabIndex === 0
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-[#468F9D] hover:bg-[#468F9D] hover:text-white"
              }`}
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>

            <div className="text-center">
              <h3 className="text-[16px] font-[Inter] font-medium text-[#468F9D]">
                {currentTabLabel}
              </h3>
            </div>

            <button
              onClick={handleNext}
              disabled={currentTabIndex === tabs.length - 1}
              className={`p-2 rounded-full transition-colors ${
                currentTabIndex === tabs.length - 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-[#468F9D] hover:bg-[#468F9D] hover:text-white"
              }`}
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden sm:block">
          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            centered
            className="mt-4 custom-tabs"
            tabBarStyle={{ borderBottom: "none" }}
          >
            <TabPane tab="Edit Profile" key="1" />
            <TabPane tab="Change Password" key="2" />
          </Tabs>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {/* Edit Profile */}
          {activeTab === "1" && (
            <div>
              <h3 className="text-center text-[18px] sm:text-[24px] font-[Inter] font-medium mb-6 hidden sm:block">
                Edit Your Profile
              </h3>
              <div className="space-y-4 max-w-xl mx-auto font-[Inter] font-normal text-[#333333]">
                <div>
                  <label>Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isUpdatingProfile}
                    className="custom-placeholder"
                    style={{ borderColor: "#468F9D", padding: "10px 16px", borderRadius: "6px" }}
                  />
                </div>

                <div>
                  <label>Contact no</label>
                  <Input
                    name="contact"
                    placeholder="e.g.,+1 (415) 555-0100"
                    value={formData.contact}
                    onChange={handleChange}
                    disabled={isUpdatingProfile}
                    className="custom-placeholder"
                    style={{ borderColor: "#468F9D", padding: "10px 16px", borderRadius: "6px" }}
                  />
                </div>

                <div>
                  <label>Address</label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={isUpdatingProfile}
                    className="custom-placeholder"
                    style={{ borderColor: "#468F9D", padding: "10px 16px", borderRadius: "6px" }}
                  />
                </div>

                <div className="flex justify-center text-center pt-4">
                  <TealButton
                    text={isUpdatingProfile ? "Saving..." : "Save Change"}
                    disabled={isUpdatingProfile}
                    onClick={handleProfileSave}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Change Password */}
          {activeTab === "2" && (
            <div>
              <h3 className="text-center text-[18px] sm:text-[24px] font-[Inter] font-medium mb-6 hidden sm:block">
                Change Password
              </h3>
              <div className="space-y-4 max-w-xl mx-auto font-[Inter] font-normal text-[#333333]">
                {passwordFields.map((field) => (
                  <div key={field.name} className="space-y-1">
                    <label>{field.label}</label>
                    <Password
                      className="custom-placeholder"
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      disabled={isChangingPassword}
                      iconRender={(visible) =>
                        visible ? (
                          <a><FaEye className="text-gray-500" /></a>
                        ) : (
                          <a><FaEyeSlash className="text-gray-500" /></a>
                        )
                      }
                      style={{ borderColor: "#468F9D", padding: "10px 16px", borderRadius: "6px" }}
                    />
                  </div>
                ))}
                <div className="flex justify-center text-center pt-16">
                  <TealButton
                    text={isChangingPassword ? "Saving..." : "Save Change"}
                    disabled={isChangingPassword}
                    onClick={handlePasswordSave}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
