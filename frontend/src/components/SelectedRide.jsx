import { CreditCardIcon, LocateIcon, MapPinIcon, XIcon } from "lucide-react";
import PropTypes from "prop-types";

SelectedRide.propTypes = {
  createRide: PropTypes.func.isRequired,
  dropoff: PropTypes.string.isRequired,
  pickup: PropTypes.string.isRequired,
  selectedRideRef: PropTypes.object,
  setVehiclePanel: PropTypes.func.isRequired,
  setSelectedRidePanel: PropTypes.func.isRequired,
};

export default function SelectedRide({
  setSelectedRidePanel,
  setVehiclePanel,
  selectedRideRef,
  createRide,
  pickup,
  dropoff,
}) {
  return (
    <div
      className="fixed bottom-0 bg-white px-3 py-8 w-full translate-y-full"
      ref={selectedRideRef}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">
          IITR Campus E-Rickshaw
        </h2>

        <XIcon
          size={20}
          onClick={() => {
            setSelectedRidePanel(false);
            setVehiclePanel(true);
          }}
        />
      </div>

      <div className="flex flex-col justify-between items-center gap-4 px-4">
       <img
  className="h-28 w-28 object-contain"
  src="https://tse4.mm.bing.net/th/id/OIP.7g5em8XobwcOaB8cHN-opwHaGK?pid=Api&P=0&h=180"
  alt="E-Rickshaw"
/>

        <div className="w-full h-[1px] bg-gray-300 mx-auto" />

        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <MapPinIcon size={20} />
            <div>
              <h3 className="text-lg font-semibold">Pickup</h3>
              <h4 className="text-sm text-gray-500">{pickup}</h4>
            </div>
          </div>

          <div className="w-[88%] h-[1px] bg-gray-300 mx-auto" />

          <div className="flex items-center gap-2">
            <LocateIcon size={20} />
            <div>
              <h3 className="text-lg font-semibold">Destination</h3>
              <h4 className="text-sm text-gray-500">{dropoff}</h4>
            </div>
          </div>

          <div className="w-[88%] h-[1px] bg-gray-300 mx-auto" />

          <div className="flex items-center gap-2">
            <CreditCardIcon size={20} />
            <div>
              <h3 className="text-lg font-semibold">₹10</h3>
              <h4 className="text-sm text-gray-500">
                Fixed Campus Fare
              </h4>
            </div>
          </div>
        </div>

        <button
          className="bg-green-600 text-white px-4 py-3 rounded-md w-full font-semibold"
          onClick={createRide}
        >
          Book E-Rickshaw
        </button>
      </div>
    </div>
  );
}