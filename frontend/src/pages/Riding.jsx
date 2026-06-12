import { CheckIcon, LocateIcon, CreditCardIcon, HomeIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";
// Riding Page
export default function Riding() {
  const location = useLocation();
  // Retrieve ride data from location state
  const { ride } = location.state || {}; // Retrieve ride data
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
const [showRating, setShowRating] = useState(false);
const [rating, setRating] = useState(0);

useEffect(() => {
  socket.on("ride-ended", (data) => {
    console.log("RIDE ENDED RECEIVED");
    console.log(data);

    setShowRating(true);
  });

  return () => {
    socket.off("ride-ended");
  };
}, [socket]);
console.log("Submitting rating:", rating);
console.log("Ride ID:", ride?._id);

async function submitRating() {
  try {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/submit-rating`,
      {
        rideId: ride._id,
        rating,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    navigate("/home");
  } catch (err) {
    console.log(err);
  }
}
  // When the ride is ended, navigate to the home page
 

  // Return the Riding component
  return (
    <div className="h-screen">
      {showRating && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-80">
      <h2 className="text-xl font-bold text-center mb-4">
        Rate Your Ride
      </h2>

      <div className="flex justify-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="text-3xl"
          >
            {star <= rating ? "⭐" : "☆"}
          </button>
        ))}
      </div>

      <button
        onClick={submitRating}
        className="w-full bg-black text-white py-2 rounded"
      >
        Submit Rating
      </button>
    </div>
  </div>
)}
      <HomeIcon
        size={40}
        className="absolute top-5 left-5 bg-white rounded-full p-2"
        onClick={() => navigate("/home")}
      />
      <div className="h-1/2">
        <LiveTracking />
      </div>
      <div className="h-1/2 bg-white p-5 flex flex-col gap-10">
        <div className="flex justify-between items-center px-4">
          <img
            className="h-24 relative"
           src="https://tse4.mm.bing.net/th/id/OIP.7g5em8XobwcOaB8cHN-opwHaGK?pid=Api&P=0&h=180"
            alt={"car"}
          />
          <div className="flex flex-col gap-2 items-end">
            <h2 className="text-lg font-semibold text-gray-500">
              {ride?.captainId?.fullName.firstName}{" "}
              {ride?.captainId?.fullName.lastName}
            </h2>
            <h3 className="text-xl font-bold">
              {ride?.captainId?.vehicle.plateNumber}
            </h3>
            <h4 className="text-sm text-gray-500">
              {ride?.captainId?.vehicle.color}
            </h4>
            <h3 className="text-sm text-green-500 flex gap-2 font-semibold items-center">
              <CheckIcon size={20} />
              Verified
            </h3>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-300 mx-auto" />
        <div className="w-full flex flex-col gap-3 px-4">
          <div className="flex items-center gap-2">
            <LocateIcon size={20} />
            <div>
              <h3 className="text-lg font-semibold">Destination</h3>
              <h4 className="text-sm text-gray-500">{ride?.destination}</h4>
            </div>
          </div>
          <div className="w-[88%] h-[1px] bg-gray-300 mx-auto" />
          <div className="flex items-center gap-2">
            <CreditCardIcon size={20} />
            <div>
              <h3 className="text-lg font-semibold">₹{ride?.fare}</h3>
              <h4 className="text-sm text-gray-500">Cash</h4>
            </div>
          </div>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-md w-full">
          Reached Destination
        </button>
      </div>
    </div>
  );
}
