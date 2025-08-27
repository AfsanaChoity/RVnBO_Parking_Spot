
import { MapPin, Droplets, Flame, Zap, DollarSign, Wifi } from "lucide-react"
import { Link } from "react-router-dom"


const AMENITY_ICONS = {
  "Wi-Fi": <Wifi className="w-4 h-4 text-blue-500" />,
  Water: <Droplets className="w-4 h-4 text-blue-500" />,
  Electricity: <Zap className="w-4 h-4 text-yellow-500" />,
  "Sewage Hookups": <Droplets className="w-4 h-4 text-gray-500" />, 
  Firepit: <Flame className="w-4 h-4 text-orange-500" />,
};


export default function ExampleSpotsCard({ land }) {
  const { image, spot: spotName, location, amenities, price } = land;
  console.log(land)
  
  return (
     <div className=" rounded-lg shadow-md overflow-hidden border border-gray-200">
      {/* Image */}
      <div className="md:h-88 h-68 overflow-hidden">
        <img
          src={image[0]}
          alt={spotName}
          className="w-full h-full object-cover object-bottom-left "
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold flex text-gray-900 mb-3">{spotName}</h3>

        {/* Location */}
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">Location : {location}</span>
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-6 mb-4">
          {
            (amenities?.length === 0) ? (<p>No Amenities</p>) :
            amenities?.map((amenity, i) => (
            <div key={i} className="flex items-center gap-1">
              {AMENITY_ICONS[amenity]}
              <span className="text-sm text-gray-700">{amenity}</span>
            </div>
          ))
          }
          
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
            <DollarSign className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm text-gray-900">Price : ${price}</span>
        </div>

        {/* View Listing Button */}
        <Link to="/overview/my-listing" className="bg-[#468F9D] text-white cursor-pointer py-2 px-4 rounded-md text-sm font-medium hover:bg-teal-700 transition-colors">
          View Details
        </Link>
      </div>
    </div>
  )
}
