import { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { useUpdateSpotMutation } from "../../../redux/api/landownerApi";
import { Button } from "antd";

export default function EditSpot({ isOpen, onClose, spot }) {

    const [formData, setFormData] = useState({
        spotName: "",
        address: "",
        latitude: "",
        longitude: "",
        rvSizeLimit: "",
        slideOuts: "",
        amenities: {
            "Wi-Fi": false,
            Water: false,
            Electricity: false,
            "Sewage Hookups": false,
            Firepit: false,
        },
        rvTypes: {
            "Class A": false,
            "Class B": false,
            "Class C": false,
            "5th Wheel": false,
            "Towable": false,
        },
        siteTypes: {
            Boondocking: false,
            "RV Storage": false,
            "Full Hookups": false,
            "Some Hookups": false,
        },
        pricePerNight: "",
        overview: "",
        availability: true,
    });

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [updateSpot, { isLoading, error }] = useUpdateSpotMutation();

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // ---------- Handlers ----------
    const handleFieldChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNestedToggle = (group, key) => {
        setFormData(prev => ({
            ...prev,
            [group]: {
                ...prev[group],
                [key]: !prev[group][key],
            },
        }));
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files || []);
        if (!files.length) return;
        setUploadedFiles(prev => [...prev, ...files]);
    };

    const handleRemoveFile = (index) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const base64Images = uploadedFiles.length > 0
            ? await Promise.all(uploadedFiles.map(f => getBase64(f)))
            : spot.image;

        const spotData = {
            location: formData.address,
            gps_coordinates: {
                latitude: parseFloat(formData.latitude),
                longitude: parseFloat(formData.longitude),
            },
            spot: formData.spotName,
            image: base64Images,
            amenities: Object.entries(formData.amenities)
                .filter(([_, value]) => value)
                .map(([key]) => key),
            rv_type: Object.entries(formData.rvTypes)
                .filter(([_, value]) => value)
                .map(([key]) => key),
            max_slide: formData.slideOuts ? [`${formData.slideOuts}`] : [],
            site_types: Object.entries(formData.siteTypes)
                .filter(([_, value]) => value)
                .map(([key]) => key),
            site_length: formData.rvSizeLimit ? [`${formData.rvSizeLimit}`] : [],
            description: formData.overview,
            isAvailable: formData.availability,
            price: formData.pricePerNight,
        };

        try {
            if (!spot._id) {
                toast.error("Spot ID is missing.");
                return;
            }

            const updatedSpot = await updateSpot({ spotId: spot._id, data: spotData }).unwrap();

            toast.success("Spot updated successfully!");
            onClose?.(updatedSpot); // Pass updated spot back to the parent component

            // Reset form after success
            setFormData({
                spotName: "",
                address: "",
                latitude: "",
                longitude: "",
                rvSizeLimit: "",
                slideOuts: "",
                amenities: {
                    "Wi-Fi": false,
                    Water: false,
                    Electricity: false,
                    "Sewage Hookups": false,
                    Firepit: false,
                },
                rvTypes: {
                    "Class A": false,
                    "Class B": false,
                    "Class C": false,
                    "5th Wheel": false,
                    "Towable": false,
                },
                siteTypes: {
                    Boondocking: false,
                    "RV Storage": false,
                    "Full Hookups": false,
                    "Some Hookups": false,
                },
                pricePerNight: "",
                overview: "",
                availability: true,
            });
            setUploadedFiles([]);
        } catch (err) {
            toast.error(err?.data?.message || "Error updating spot");
        }
    };



    useEffect(() => {
        if (spot) {
            // Set initial values when opening the form
            setFormData({
                spotName: spot.spot,
                address: spot.location,
                latitude: spot.gps_coordinates.latitude,
                longitude: spot.gps_coordinates.longitude,
                rvSizeLimit: spot.site_length[0],
                slideOuts: spot.max_slide[0],
                amenities: {
                    "Wi-Fi": spot.amenities.includes("Wi-Fi"),
                    Water: spot.amenities.includes("Water"),
                    Electricity: spot.amenities.includes("Electricity"),
                    "Sewage Hookups": spot.amenities.includes("Sewage Hookups"),
                    Firepit: spot.amenities.includes("Firepit"),
                },
                rvTypes: {
                    "Class A": spot.rv_type.includes("Class A"),
                    "Class B": spot.rv_type.includes("Class B"),
                    "Class C": spot.rv_type.includes("Class C"),
                    "5th Wheel": spot.rv_type.includes("5th Wheel"),
                    Towable: spot.rv_type.includes("Towable"),
                },
                siteTypes: {
                    Boondocking: spot.site_types.includes("Boondocking"),
                    "RV Storage": spot.site_types.includes("RV Storage"),
                    "Full Hookups": spot.site_types.includes("Full Hookups"),
                    "Some Hookups": spot.site_types.includes("Some Hookups"),
                },
                pricePerNight: spot.price,
                overview: spot.description,
                availability: spot.isAvailable,
            });
        }
    }, [spot]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Modal */}
            <div className="relative mx-4 md:mx-0 bg-[#fff] border border-gray-200 rounded-lg shadow-xl max-w-xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between px-6 pb-0 pt-8">
                    <h2 className="text-xl font-semibold text-gray-900">Edit Your Spot</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Spot Name */}
                    <div>
                        <label className="block text-base font-semibold text-gray-800 mb-2">Spot Name</label>
                        <input
                            type="text"
                            value={formData.spotName}
                            onChange={(e) => handleFieldChange("spotName", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="e.g., Pine Creek RV Site"
                        />
                    </div>

                    {/* Full Address */}
                    <div>
                        <label className="block text-base font-semibold text-gray-800 mb-2">Full Address</label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => handleFieldChange("address", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="Street, City, State, ZIP"
                        />
                    </div>

                    {/* Latitude and Longitude */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <input
                                type="number"
                                step="any"
                                value={formData.latitude}
                                onChange={(e) => handleFieldChange("latitude", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="Latitude (North-South)"
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                step="any"
                                value={formData.longitude}
                                onChange={(e) => handleFieldChange("longitude", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="Longitude (East-West)"
                            />
                        </div>
                    </div>

                    {/* Upload Photos */}
                    <div>
                        <label className="block text-base font-semibold text-gray-800 mb-2">Upload Spot Photos</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-gray-400 transition-colors">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="hidden"
                                id="photo-upload"
                            />
                            <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                    <Upload className="w-6 h-6 text-gray-400" />
                                </div>
                                <span className="text-sm text-gray-700 font-medium">Add photos</span>
                                <span className="text-xs text-gray-500">JPG, PNG • up to 10 files</span>
                            </label>
                        </div>

                        {uploadedFiles.length > 0 && (
                            <div className="mt-3 space-y-2">
                                <div className="text-sm text-gray-700 font-medium">{uploadedFiles.length} file(s) selected</div>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    {uploadedFiles.map((f, i) => (
                                        <li key={i} className="flex items-center justify-between">
                                            <span className="truncate">{f.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile(i)}
                                                className="text-red-600 hover:underline"
                                            >
                                                remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* RV Length Limit */}
                    <div>
                        <label className="block text-base font-semibold text-gray-800 mb-2">RV Length Limit</label>
                        <select
                            value={formData.rvSizeLimit}
                            onChange={(e) => handleFieldChange("rvSizeLimit", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        >
                            <option value="">Select maximum length</option>
                            <option value="25 ft">25 ft</option>
                            <option value="35 ft">35 ft</option>
                            <option value="45 ft">45 ft</option>
                            <option value="45+ ft">45+ ft</option>
                        </select>
                    </div>

                    {/* Max Slide-outs */}
                    <div>
                        <label className="block text-base font-semibold text-gray-800 mb-2">Max Slide-outs</label>
                        <select
                            value={formData.slideOuts}
                            onChange={(e) => handleFieldChange("slideOuts", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        >
                            <option value="">Select maximum slide-outs</option>
                            <option value="0">0 Slide</option>
                            <option value="1">1 Slide</option>
                            <option value="2">2 Slides</option>
                            <option value="3+">3 Slides</option>
                            <option value="3+">3+ Slides</option>
                        </select>
                    </div>

                    {/* Amenities */}
                    <div>
                        <label className="block text-base font-semibold text-gray-800 mb-3">Amenities</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {Object.entries({
                                "Wi-Fi": "Wi-Fi",
                                "Water": "Water",
                                "Electricity": "Electricity",
                                "Sewage Hookups": "Sewage Hookups",
                                "Firepit": "Firepit",
                            }).map(([key, label]) => (
                                <label key={key} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.amenities[key]}
                                        onChange={() => handleNestedToggle("amenities", key)}
                                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-800">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Allowed RV Types */}
                    <div>
                        <label className="block text-base font-semibold text-gray-800 mb-3">Allowed RV Types</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {Object.entries({
                                "Class A": "Class A",
                                "Class B": "Class B",
                                "Class C": "Class C",
                                "5th Wheel": "5th Wheel",
                                "Towable": "Towable",
                            }).map(([key, label]) => (
                                <label key={key} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.rvTypes[key]}
                                        onChange={() => handleNestedToggle("rvTypes", key)}
                                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-800">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Site Types */}
                    <div>
                        <label className="block text-base font-semibold text-gray-800 mb-3">Site Type</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {Object.entries({
                                "Boondocking": "Boondocking",
                                "RV Storage": "RV Storage",
                                "Full Hookups": "Full Hookups",
                                "Some Hookups": "Some Hookups",
                            }).map(([key, label]) => (
                                <label key={key} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.siteTypes[key]}
                                        onChange={() => handleNestedToggle("siteTypes", key)}
                                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-800">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-base font-semibold text-gray-800 mb-2">Price per Night (USD)</label>
                        <input
                            type="number"
                            min="0"
                            step="1"
                            value={formData.pricePerNight}
                            onChange={(e) => handleFieldChange("pricePerNight", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="0"
                        />
                    </div>

                    {/* Overview */}
                    <div>
                        <label className="block text-base font-semibold text-gray-800 mb-2">Overview (optional)</label>
                        <textarea
                            value={formData.overview}
                            onChange={(e) => handleFieldChange("overview", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent min-h-36"
                            placeholder="Describe your spot (terrain, access, hookups, nearby attractions, house rules, etc.)"
                            rows={6}
                        />
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: "#468F9D", fontWeight: 600 }}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
