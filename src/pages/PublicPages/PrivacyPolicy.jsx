
import toast from 'react-hot-toast';
import Heading from '../../components/common/Heading'
import { useGetPrivacyPolicyQuery } from '../../redux/api/userApi'
import { useEffect } from 'react';
import LoadingComponent from '../../components/common/LoadingComponent';

export default function PrivacyPolicy() {
  const { data, error, isLoading, isError } = useGetPrivacyPolicyQuery();

  const content = data?.data?.text

  useEffect(() => {
    const id = "privacy-error";
    if (isError) {
      toast.error(error?.data?.message || "Failed to load Privacy Policy", { id });
    } else {
      toast.dismiss(id);
    }
  }, [isError, error]);

  if (isLoading) {
    return <div> <LoadingComponent /> </div>
  }

  return (
    <div className='px-4'>
      {/* Header */}
      <div className='my-10'>
        <Heading text="Privacy Policy" />
      </div>

      {/* Text */}
      <div className='mb-20'>
        
        <div
          dangerouslySetInnerHTML={{
            __html: content || 'No privacy policy available.',
          }}
          className="text-justify mt-5"
        ></div>
      </div>
    </div>
  )
}
