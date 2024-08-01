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
    <div className="w-[95%] mx-auto my-20">
      <div className="fixed top-14 left-0 right-0 z-20 bg-primary p-4 flex  justify-between items-center w-full">
        <h2 className="text-3xl font-bold text-white">Browse Labs</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
      {status === "Pending" && (
        <FidgetSpinner
          visible={true}
          height="80"
          width="80"
          ariaLabel="fidget-spinner-loading"
          wrapperStyle={{}}
          wrapperClass="fidget-spinner-wrapper"
        />
      )}
      {status === "Failed" && (
        <p className="text-center text-red-500">Error: {error}</p>
      )}
      {status === "Success" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-40">
          {filteredLabs.map((lab) => (
            <div
              key={lab._id}
              className="bg-white text-primary border flex flex-col gap-2 rounded-lg shadow-md pb-4 cursor-pointer"
              onClick={() => handleLabClick(lab._id)}
            >
              {lab.imageUrl && (
                <img
                  src={lab.imageUrl}
                  alt={lab.name}
                  className="w-full h-60 object-cover rounded-t-lg "
                />
              )}
              <h3 className="text-lg font-bold px-3">{lab.name}</h3>
              <div>
                <p className="text-sm px-3">
                  {lab.address}, {lab.city}, {lab.state}
                </p>
              </div>
              <p className="text-sm px-3">
                {" "}
                <span className="font-bold">Contact: </span> {lab.contactNumber}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Labs;
