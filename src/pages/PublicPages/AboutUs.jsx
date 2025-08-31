
import toast from 'react-hot-toast';
import Heading from '../../components/common/Heading'
import SubHeading from '../../components/common/SubHeading'
import { useGetAboutUsQuery } from '../../redux/api/userApi'
import { useEffect } from 'react';
import LoadingComponent from '../../components/common/LoadingComponent';

export default function AboutUs() {
  const { data, error, isLoading, isError } = useGetAboutUsQuery();
  const content = data?.data?.text;

  useEffect(() => {
    const id = "about-us-error";
    if (isError) {
      toast.error(error?.data?.message || "Failed to load About Us", { id });
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
        <Heading text="About Us" />
      </div>

      {/* Text */}
      <div className='mb-20'>
        <div
          dangerouslySetInnerHTML={{
            __html: content || 'No about available.',
          }}
          className="text-justify mt-5"
        ></div>
      </div>
    </div>
  )
}
