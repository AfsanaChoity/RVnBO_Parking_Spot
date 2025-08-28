
import toast from 'react-hot-toast';
import Heading from '../../components/common/Heading'
import SubHeading from '../../components/common/SubHeading'
import { useGetPrivacyPolicyQuery } from '../../redux/api/userApi'
import { useEffect } from 'react';
import LoadingComponent from '../../components/common/LoadingComponent';

export default function PrivacyPolicy() {
    const { data, error, isLoading, isError } = useGetPrivacyPolicyQuery();
    
    
    useEffect(() => {
    const id = "privacy-error";
    if (isError) {
      toast.error(error?.data?.message || "Failed to load Privacy Policy", { id });
    } else {
      toast.dismiss(id);
    }
  }, [isError, error]);

  if(isLoading) {
    return <div> <LoadingComponent/> </div>
  }

  return (
    <div className='px-4'>
        {/* Header */}
        <div className='my-10'>
            <Heading text= "Privacy Policy"/>
        </div>

        {/* Text */}
        <div className='mb-20'>
            <SubHeading text={data?.data?.text}/>
        </div>
    </div>
  )
}
