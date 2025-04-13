export default function Loader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        {/* <p className="mt-3 text-gray-600">Loading customer data...</p> */}
      </div>
    </div>
  );
}
