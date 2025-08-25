import { Plus } from 'lucide-react'
import { useState } from 'react'
import HeadingSmall from '../../components/common/HeadingSmall';
import MySpotTable from '../../components/Landowner/MySpotTable';
import { Button } from 'antd';

export default function MySpots() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddNewListing = () => {
    console.log("Add new listing clicked")
  }
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">

        <HeadingSmall text="My Spots"></HeadingSmall>
        <button

          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors duration-200 text-gray-700 font-medium cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Listing</span>
        </button>
      </div>

      {/* Listing Table */}
      <div>
        <MySpotTable></MySpotTable>
      </div>

      {/* Show more Button */}
      <div className='text-center mt-10'>
        <Button color="cyan" variant="outlined">
          Show More
        </Button>
      </div>

      {/* Add Listing Modal */}
      <div>
        {/* <AddListingModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} /> */}
      </div>
    </div>
  )
}
