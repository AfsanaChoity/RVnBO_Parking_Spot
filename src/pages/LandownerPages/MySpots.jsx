import { Plus } from 'lucide-react'
import { useState } from 'react'
import HeadingSmall from '../../components/common/HeadingSmall';
import MySpotTable from '../../components/Landowner/MySpotTable';
import { Button } from 'antd';
import { useCreateStripeAccountMutation, useGetSpotListQuery } from '../../redux/api/landownerApi';
import LoadingComponent from '../../components/common/LoadingComponent';
import AddSpot from '../../components/Landowner/Modals/AddSpot';
import toast from 'react-hot-toast';

export default function MySpots() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);

  const{ data, error, isLoading} = useGetSpotListQuery();

  const [createStripeAccount, {data: accountData, isLoading: isCreating, isError }] = useCreateStripeAccountMutation();


  const handleCreateStripeAccount = () => {
    createStripeAccount()
      .unwrap()
      .then((res) => {
        
        if (res?.url) {
          window.location.href = res
            .url;
        }
      })
      .catch((err) => {
        toast.error("Error creating Stripe account. Please try again.");
        
      });

  };


  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5); 
  };



  if (isLoading) {
      return <div><LoadingComponent /></div>;
    }
  
    
    if (error) {
      return <div>Error fetching spots.</div>;
    }
  
    const spotsToShow = data?.lands?.slice(0, visibleCount);
  
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">

        <HeadingSmall text="My Spots"></HeadingSmall>
         <div className='flex flex-col md:flex-row gap-4'>
          <button

          onClick={handleCreateStripeAccount}
          disabled={isCreating}
          className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors duration-200 text-gray-700 font-medium cursor-pointer"
        >
          
          <span>{isCreating ? "Creating..." : "Create Stripe Account"}</span>
        </button>


        <button

          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors duration-200 text-gray-700 font-medium cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Spot</span>
        </button>
         </div>
      </div>

      {/* Listing Table */}
     <div>
        <MySpotTable spots={spotsToShow} /> 
      </div>

       {/* Show more Button */}
      {data && data?.lands?.length > visibleCount && (
        <div className='text-center mt-10'>
          <Button color="cyan" variant="outlined" onClick={handleShowMore}>
            Show More
          </Button>
        </div>
      )}

      {/* Add Listing Modal */}
      <div>
        <AddSpot isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      </div>
    </div>
  )
}
