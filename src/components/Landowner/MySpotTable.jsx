import { useState } from "react";
import { Edit, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function MySpotTable() {
  const [listings, setListings] = useState([
    { id: 1,  serialNo: "01", spotName: "Sunset Camp", dateRange: "July 2 – July 4", price: "$30", status: "Available" },
    { id: 2,  serialNo: "02", spotName: "Sunset Camp", dateRange: "July 2 – July 4", price: "$30", status: "Available" },
    { id: 3,  serialNo: "03", spotName: "Sunset Camp", dateRange: "July 2 – July 4", price: "$30", status: "Available" },
    { id: 4,  serialNo: "04", spotName: "Sunset Camp", dateRange: "July 2 – July 4", price: "$30", status: "Available" },
    { id: 5,  serialNo: "05", spotName: "Sunset Camp", dateRange: "July 2 – July 4", price: "$30", status: "Unavailable" },
    { id: 6,  serialNo: "06", spotName: "Sunset Camp", dateRange: "July 2 – July 4", price: "$30", status: "Available" },
    { id: 7,  serialNo: "07", spotName: "Sunset Camp", dateRange: "July 2 – July 4", price: "$30", status: "Available" },
    { id: 8,  serialNo: "08", spotName: "Sunset Camp", dateRange: "July 2 – July 4", price: "$30", status: "Unavailable" },
    { id: 9,  serialNo: "09", spotName: "Sunset Camp", dateRange: "July 2 – July 4", price: "$30", status: "Available" },
    { id: 10, serialNo: "10", spotName: "Sunset Camp", dateRange: "July 2 – July 4", price: "$30", status: "Available" },
    { id: 11, serialNo: "11", spotName: "Sunset Camp", dateRange: "July 2 – July 4", price: "$30", status: "Available" },
  ]);

  // Edit modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingListing, setEditingListing] = useState(null);

  // Delete modal state
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedIdToDelete, setSelectedIdToDelete] = useState(null);

  const handleEdit = (id) => {
    const selected = listings.find((item) => item.id === id);
    setEditingListing(selected);
    setIsModalVisible(true);
  };

  const handleDelete = (id) => {
    setSelectedIdToDelete(id);
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    setListings((prev) => prev.filter((item) => item.id !== selectedIdToDelete));
    setDeleteModalVisible(false);
    setSelectedIdToDelete(null);
  };

  const handleView = (id) => {
    console.log("View listing:", id);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingListing(null);
  };

  const handleModalSave = (values) => {
    // values = updated payload from EditListingModal
    setListings((prev) =>
      prev.map((item) =>
        item.id === editingListing.id ? { ...item, ...values } : item
      )
    );
    handleModalCancel();
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status.toLowerCase()) {
      case "available":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "unavailable":
        return `${baseClasses} bg-gray-200 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
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
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 whitespace-nowrap">Serial No</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 whitespace-nowrap">Spot Name</th>
              {/* <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 whitespace-nowrap">Date Range</th> */}
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 whitespace-nowrap">Price</th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-700 whitespace-nowrap">Status</th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-700 whitespace-nowrap">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {listings.map((listing, index) => (
              <tr
                key={listing.id}
                className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-blue-50" : "bg-white"}`}
              >
                <td className="px-6 py-4 text-sm text-gray-900 font-medium whitespace-nowrap">{listing.serialNo}</td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{listing.spotName}</td>
                {/* <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{listing.dateRange}</td> */}
                <td className="px-6 py-4 text-sm text-gray-900 font-medium whitespace-nowrap">{listing.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={getStatusBadge(listing.status)}>{listing.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(listing.id)}
                      className="p-1.5 cursor-pointer text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(listing.id)}
                      className="p-1.5 cursor-pointer text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <Link to="/landowner/details"
                      onClick={() => handleView(listing.id)}
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

      {/* Edit Modal (FIXED PROPS) */}
      {/* <EditListingModal
        isOpen={isModalVisible}
        onClose={handleModalCancel}
        initialData={editingListing || {}}   // pass current row data
        onSave={handleModalSave}             // receive updated payload
      />

      {/* Delete Modal 
      <DeleteModal
        isOpen={deleteModalVisible}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
      /> */}
    </div>
  );
}
