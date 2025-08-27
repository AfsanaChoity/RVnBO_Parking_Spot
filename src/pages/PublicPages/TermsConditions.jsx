
import toast from 'react-hot-toast';
import Heading from '../../components/common/Heading'
import SubHeading from '../../components/common/SubHeading'
import { useGetTermsConditionsQuery } from '../../redux/api/userApi'
import { useEffect } from 'react';
import LoadingComponent from '../../components/common/LoadingComponent';

export default function PrivacyPolicy() {
    const { data, error, isLoading, isError } = useGetTermsConditionsQuery();
    
    
    useEffect(() => {
    const id = "terms-error";
    if (isError) {
      toast.error(error?.data?.message || "Failed to load Terms & Conditions", { id });
    } else {
      toast.dismiss(id);
    }
  }, [isError, error]);

  if(isLoading) {
    return <div> <LoadingComponent/> </div>
  }

  return (
    <div>
        {/* Header */}
        <div className='my-10'>
            <Heading text= "Terms & Conditions"/>
        </div>

        {/* Text */}
        <div className='mb-20'>
            <SubHeading text={data?.data?.text}/>
        </div>
    </div>
  )
}
