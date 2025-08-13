import { Link } from "react-router";
import CenterParagraph from "../common/CenterParagraph";
import InputPassword from "../common/InputPassword";
import AuthHeaderIcon from "../Shared/AuthHeaderIcon";
import AuthPageWrapper from "../Shared/AuthPageWrapper";
import TealButton from "../common/TealButton";
import BackToLogin from "../Shared/BackToLogin";

export default function ResetPassword() {
  return (
    <>
        <AuthPageWrapper text={"Set New Password"} icon={<AuthHeaderIcon />}>
        
        <div className="mb-12">
            <CenterParagraph text={"Your new password must be different from previously used passwords."}></CenterParagraph>
        </div>

        <InputPassword label='New Password'></InputPassword>
        <InputPassword label='Confirm Password'></InputPassword>
        <Link to="/auth/reset/success">
        <TealButton text={"Reset Password"}></TealButton>
        </Link>
        <BackToLogin></BackToLogin>
        </AuthPageWrapper>

    </>
  )
}
