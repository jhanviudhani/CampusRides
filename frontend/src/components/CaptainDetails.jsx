import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
            {captain?.fullName?.firstName?.[0] || "C"}
          </div>

          <h4 className="text-lg font-medium capitalize">
            {captain
              ? `${captain?.fullName?.firstName} ${captain?.fullName?.lastName}`
              : "Captain"}
          </h4>
        </div>

        <div>
<h4 className="text-xl font-semibold">
  ₹{captain?.earnings || 0}
</h4>          <p className="text-sm text-gray-600">Total Earnings</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-8 bg-gray-100 p-4 rounded-xl">

  <div className="text-center">
    <h5 className="text-lg font-semibold">
      {captain?.completedRides || 0}
    </h5>
    <p className="text-sm text-gray-600">Completed Rides</p>
  </div>

  <div className="text-center">
    <h5 className="text-lg font-semibold capitalize">
      {captain?.vehicle?.vehicleType || "E-Rickshaw"}
    </h5>
    <p className="text-sm text-gray-600">Vehicle</p>
  </div>

  <div className="text-center">
    <h5 className="text-lg font-semibold">
      ⭐ {captain?.rating || 0}
    </h5>
    <p className="text-sm text-gray-600">Rating</p>
  </div>
</div>
   </div>
  );
};

export default CaptainDetails;