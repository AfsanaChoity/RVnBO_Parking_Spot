import { Link } from "react-router";
import AuthPageWrapper from "../Shared/AuthPageWrapper";
import TealButton from "../common/TealButton";
import MintButton from "../common/MintButton";
import logo from "/logo.png"
import AuthHeaderImage from "../Shared/AuthHeaderImage";
import CenterParagraph from "../common/CenterParagraph";
import AuthCloseButton from "../Shared/AuthCloseButton";

export default function RoleSelectionPage() {
    return (
        <>
            <AuthPageWrapper text={"Welcome To "} icon={<AuthHeaderImage img={logo} />}>
            
                <AuthCloseButton />
                
                <div className='text-[#468F9D] font-semibold text-4xl flex justify-center mb-6'>
                    <h1 >RvNBo</h1>
                </div>
               

               <div className="mb-10">
                 <CenterParagraph
                    text="Choose your role to continue. Select whether you want to be Traveler or Land Owner.">

                </CenterParagraph>
               </div>

                <div className='flex flex-col gap-4'>
                    <Link to="/auth/signup" onClick={() => localStorage.setItem("userRole", "traveler")}>
                        <TealButton text="Traveler"></TealButton>
                    </Link>

                    <Link to="/auth/signup" onClick={() => localStorage.setItem("userRole", "landowner")}>
                       <MintButton text="Land Owner"></MintButton>
                    </Link>
                </div>


            </AuthPageWrapper>

        </>
    )
}
