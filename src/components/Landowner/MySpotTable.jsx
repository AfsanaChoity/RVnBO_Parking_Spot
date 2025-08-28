import { useState } from "react";
import { Edit, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import EditSpot from "./Modals/EditSpot";
import DeleteSpot from "./Modals/DeleteSpot";
import { useDeleteSpotMutation } from "../../redux/api/landownerApi";
import toast from "react-hot-toast";

export default function MySpotTable({ spots }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);


  const [deleteSpot, { isLoading: isDeleting }] = useDeleteSpotMutation();

  if (spots.length === 0)
    return <div className="text-center font-semibold py-10"><h1>No Spot Found</h1></div>

  const handleDeleteSpot = async () => {
    if (!selectedSpot?._id) return;

    try {
      await deleteSpot(selectedSpot._id).unwrap();
      setDeleteModalOpen(false);
      setSelectedSpot(null);
    } catch (err) {
      toast.error("Delete failed");
    }
  };




  const handleView = (id) => {
    console.log("View listing:", id);
  };



  const getStatusBadge = (isAvailable) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";

    if (isAvailable) {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else {
      return `${baseClasses} bg-gray-200 text-gray-800`;
    }
  };



  return (
    <div>
      {/* Table Container - Horizontally Scrollable on Mobile */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          {/* Table Header */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Serial No</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">Spot Name</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 whitespace-nowrap">Price</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 whitespace-nowrap">Status</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 whitespace-nowrap">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {spots.map((spot, index) => (
              <tr
                key={spot.id}
                className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-blue-50" : "bg-white"}`}
              >
                <td className="px-6 py-4 text-sm text-gray-900 font-medium whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{spot.spot}</td>
                <td className="px-6 py-4 text-center text-sm text-gray-900 font-medium whitespace-nowrap">{spot.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={getStatusBadge(spot.isAvailable)}>
                    {spot.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="flex items-center gap-2 justify-center">
                    <button
                      onClick={() => {
                        setSelectedSpot(spot);
                        setIsEditModalOpen(true);
                      }}

                      className="p-1.5 cursor-pointer text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedSpot(spot);  
                        setDeleteModalOpen(true); 
                      }}
                      className="p-1.5 cursor-pointer text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <Link to={`/details/${spot?._id}`}
                      
                      className="p-1.5 cursor-pointer text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Scroll Indicator for Mobile */}
      <div className="md:hidden text-center mt-2 text-xs text-gray-500">
        Swipe left to see more columns →
      </div>


      {/* Edit Listing Modal */}
      <div>
        <EditSpot
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          spot={selectedSpot}
        />
      </div>

      {/* Delete Modal */}
      <DeleteSpot
        isOpen={deleteModalOpen}
        onConfirm={handleDeleteSpot}
        onCancel={() => setDeleteModalOpen(false)}
      />

    </div>
  );
}
