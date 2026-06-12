import { User2Icon } from "lucide-react";
import { XIcon } from "lucide-react";
import PropTypes from "prop-types";

ChooseRides.propTypes = {
  fare: PropTypes.object,
  setVehicleType: PropTypes.func.isRequired,
  vehiclePanelRef: PropTypes.object,
  setVehiclePanel: PropTypes.func.isRequired,
  setSelectedRidePanel: PropTypes.func.isRequired,
};

export default function ChooseRides({
  vehiclePanelRef,
  setVehiclePanel,
  setVehicleType,
  setSelectedRidePanel,
}) {
  const vehicles = [
    {
      name: "IITR Campus E-Rickshaw",
      vehicleType: "erickshaw",
      price: 10,
      capacity: 4,
      image:
        "https://cdn-icons-png.flaticon.com/512/2972/2972185.png",
      distance: "Available",
      description: "Campus Transport Service",
    },
  ];

  return (
    <div
      className="fixed z-10 bottom-0 bg-white px-3 py-8 w-full translate-y-full"
      ref={vehiclePanelRef}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">
          Choose E-Rickshaw
        </h2>

        <XIcon
          size={20}
          onClick={() => {
            setVehiclePanel(false);
          }}
        />
      </div>

      {vehicles.map((vehicle, index) => (
        <div
          className="flex items-center justify-between p-3 mb-2 rounded-2xl bg-gray-200 w-full border-2 active:border-black cursor-pointer"
          key={index}
          onClick={() => {
            setVehiclePanel(false);
            setSelectedRidePanel(true);
            setVehicleType(vehicle.vehicleType);
          }}
        >
<img
  className="h-16 w-16 object-contain"
  src="https://tse4.mm.bing.net/th/id/OIP.7g5em8XobwcOaB8cHN-opwHaGK?pid=Api&P=0&h=180"
  alt="E-Rickshaw"
/>
          <div className="w-1/2">
            <h3 className="flex gap-2 items-center">
              <p className="text-lg font-semibold">
                {vehicle.name}
              </p>

              <p className="text-green-600 font-medium">
  Available Now
</p>
            </h3>

            <h4>{vehicle.distance}</h4>

            <p>{vehicle.description}</p>
          </div>

          <h2 className="text-2xl font-semibold">
            ₹10
          </h2>
        </div>
      ))}
    </div>
  );
}