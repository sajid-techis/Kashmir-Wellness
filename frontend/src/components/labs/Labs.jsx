import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLabsThunk } from "../../features/labs/labSlice";
import { FidgetSpinner } from "react-loader-spinner";
import SearchBar from "../common/SearchBar";

const Labs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.lab.status);
  const labs = useSelector((state) => state.lab.labs);
  const error = useSelector((state) => state.lab.error);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getLabsThunk());
  }, [dispatch]);

  const handleLabClick = (id) => {
    navigate(`/labs/${id}`);
  };

  const filteredLabs = labs.filter(
    (lab) =>
      lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lab.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lab.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lab.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-blue-900">
      <div className="sticky top-0 left-0 right-0 z-20 bg-white p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-xl md:text-3xl font-bold text-primary">Browse Labs</h2>
        <div className="relative w-full lg:w-1/2">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>
      {status === "Pending" && (
        <div className="flex justify-center py-8">
          <FidgetSpinner visible={true} height="80" width="80" ariaLabel="fidget-spinner-loading" />
        </div>
      )}
      {status === "Failed" && (
        <p className="text-center text-red-500">Error: {error}</p>
      )}
      {status === "Success" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 overflow-y-auto px-4 pt-4 pb-20">
          {filteredLabs.map((lab) => (
            <div
              key={lab._id}
              className="relative flex flex-col gap-2 bg-gradient-to-b from-green-700 to-blue-800 rounded-lg shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
              onClick={() => handleLabClick(lab._id)}
            >
              {lab.imageUrl && (
                <img
                  src={lab.imageUrl}
                  alt={lab.name}
                  className="w-full h-40 object-cover rounded-t-lg lg:h-60"
                />
              )}
              <div className="flex-1 p-4 text-gray-100">
                <h3 className="text-lg font-semibold">{lab.name}</h3>
                <p className="text-sm">{lab.address}, {lab.city}, {lab.state}</p>
                <p className="text-sm">
                  <span className="font-bold">Contact: </span> {lab.contactNumber}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Labs;
