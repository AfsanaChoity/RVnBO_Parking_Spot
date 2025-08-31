
import toast from 'react-hot-toast';
import Heading from '../../components/common/Heading'
import SubHeading from '../../components/common/SubHeading'
import { useGetTermsConditionsQuery } from '../../redux/api/userApi'
import { useEffect } from 'react';
import LoadingComponent from '../../components/common/LoadingComponent';

export default function TermsConditions() {
  const { data, error, isLoading, isError } = useGetTermsConditionsQuery();
  const content = data?.data?.text;


  useEffect(() => {
    const id = "terms-error";
    if (isError) {
      toast.error(error?.data?.message || "Failed to load Terms & Conditions", { id });
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
        <Heading text="Terms & Conditions" />
      </div>

      {/* Text */}
      <div className='mb-20'>
        <div
          dangerouslySetInnerHTML={{
            __html: content || 'No Terms & Conditions available.',
          }}
          className="text-justify mt-5"
        ></div>
      </div>
    </div>
  )
}
