import { useState } from "react";
import AuthPageWrapper from "../Shared/AuthPageWrapper";
import { Email } from "@mui/icons-material";
import CenterParagraph from "../common/CenterParagraph";
import { Link } from "react-router";
import TealButton from "../common/TealButton";
import AuthHeaderIcon from "../Shared/AuthHeaderIcon";


export default function VerificationPage({ to="/auth/login" }) {
    
    const [resendLoading, setResendLoading] = useState(false)
    const values = [' ', ' ', ' ', ' ', ' ', ' '];

    // This would typically come from props or route params
    const userEmail = "loremipsum@gmail.com"

    
    const handleResendEmail = () => {
        setResendLoading(true)

        // Simulate API call to resend email
        setTimeout(() => {
            console.log("Resend email to:", userEmail)
            setResendLoading(false)
            // You can show a success message here
        }, 2000)
    }
    return (
        <div>
            
            <AuthPageWrapper text="Check Your Email" icon={<AuthHeaderIcon icon={Email}/>}>
                {/* Email Icon */}

              
                {/* Subtitle */}
                <CenterParagraph text={"We sent a 5 digit code to"}>
                    <div className='text-center mt-1 mb-10 text-gray-600'>
                        <strong >{userEmail}</strong>
                    </div>
                </CenterParagraph>

                {/* Code box */}
                 <div className='flex gap-2 mb-[64px] justify-center'>
                    {values.map((val) => (
                        // <Box key={index} text={val}></Box>
                         <div className='border border-[#468F9D] rounded-xl  w-[47px] h-[49px] font-[Inter] text-[20px] flex justify-center items-center'>{val}</div>
                    ))}
                </div>

              <div className='mb-4'>
                 <Link to={to}><TealButton text="Verify" ></TealButton></Link>
              </div>

                {/* Rersend Email Link */}
                <div className='text-center text-xs '>
                    <p>
                        Didn't receive the code? <Link onClick={handleResendEmail} className='text-[#468F9D]'>Click to resend</Link>
                    </p>
                </div>

               


            </AuthPageWrapper>
        </div>
    )
}
