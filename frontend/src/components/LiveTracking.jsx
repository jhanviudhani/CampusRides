const LiveTracking = () => {
  return (
    <div className="h-full w-full relative">
      <img
        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1"
        alt="Campus"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold mb-4">
          IITR Campus Ride
        </h1>

        <p className="text-lg">
          E-Rickshaw Transportation System
        </p>

        <div className="mt-6 bg-white text-black px-6 py-3 rounded-xl shadow-lg">
          Fixed Fare ₹10
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;