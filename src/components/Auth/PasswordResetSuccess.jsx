import { Link } from 'react-router'
import AuthPageWrapper from '../Shared/AuthPageWrapper'
import AuthHeaderIcon from '../Shared/AuthHeaderIcon'
import { CheckCircle } from '@mui/icons-material'
import CenterParagraph from '../common/CenterParagraph'
import TealButton from '../common/TealButton'

export default function PasswordResetSuccess() {
  return (
    <div>
      <AuthPageWrapper text={"Password Reset Successful "} icon={<AuthHeaderIcon icon={CheckCircle} />}>
               
               <div className='mb-16'>
                 <CenterParagraph
                    text="Your password has been successfully reset.Click below to login in magically.">

                </CenterParagraph>

               </div>
                <Link to="/auth/login">
                    <TealButton text="Continue"></TealButton>
                </Link>

            </AuthPageWrapper>
    </div>
  )
}
