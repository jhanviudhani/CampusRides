/* eslint-disable react/prop-types */

import { Clock, CreditCard, LocateFixed, MapPin } from "lucide-react";

const RidePopUp = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
         <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
  {props?.ride?.userId?.fullName?.firstName?.[0] || "U"}
</div>
          <h2 className="text-lg font-medium">
           Passenger
          </h2>
        </div>
       <h5 className="text-lg font-semibold">
  New Request
</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center pl-3 pr-3">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <div>
              <h3 className="text-lg font-medium flex items-center gap-1">
                <MapPin size={20} className="mt-1"/>
                Pickup
              </h3>
              <p className="text-sm mt-1 text-gray-600">
                {props.ride?.rideDetails?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <div>
              <h3 className="text-lg font-medium flex items-center gap-1">
                <LocateFixed size={20} className="mt-1"/>
                Dropoff
              </h3>
              <p className="text-sm mt-1 text-gray-600">
                {props.ride?.rideDetails?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
  <div>
    <h3 className="text-lg font-medium flex items-center gap-1">
      <Clock size={20} className="mt-1" />
      Ride Type
    </h3>
    <p className="text-sm mt-1 text-gray-600">
      E-Rickshaw Ride
    </p>
  </div>
</div>
          <div className="flex items-center gap-5 p-3">
            <div>
              <h3 className="text-lg font-medium flex items-center gap-1">
                <CreditCard size={20} className="mt-1"/>
                Fare
              </h3>
              <p className="text-sm mt-1 text-gray-600">
                {" "}
                ₹{props.ride?.rideDetails?.fare}{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 w-full ">
          <button
            onClick={() => {
              props.setConfirmRidePopupPanel(true);
              props.confirmRide();
            }}
            className=" bg-green-600 w-full text-white font-semibold p-2 px-10 rounded-lg"
          >
            Accept
          </button>

          <button
            onClick={() => {
              props.setRidePopupPanel(false);
            }}
            className="mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg"
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
