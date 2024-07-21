import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className=" bg-mobile sm:bg-desktop h-screen sm:h-auto bg-cover bg-repeat  bg-center sm:pb-10 pb-5 ">
      <div className="flex flex-col">
      <div className="flex flex-col h-full text-white max-w-[250px] sm:max-w-xl">
        <div className=" justify-start items-start sm:pl-10 pl-0 sm:pt-12 pt-4">
          <div>
            <img className="sm:w-[500px] w-[110px] ml-12" src="https://ik.imagekit.io/x6p94nrv0m/Group%2066.png?updatedAt=1720116453393" alt="" />
            <p className="max-w-full sm:max-w-xl sm:text-lg text-xs mb-6 text-justify break-words px-4">
  FEXB 2025 is an annual open house event that includes a try out simulation for UTBK and SIMAK UI as well as a faculty exhibition with fun rides, with the goal of providing a stimulating and enjoyable experience for all participants as they prepare for their future education. Furthermore, FEXB 2025 will feature an interactive discussion show and activities that will offer participants a taste of how college will function, allowing them to begin their dream with us.
</p>


          </div>

          <div className="flex  justify-start items-start sm:ml-20 ml-4">
            <button onClick={() => navigate('/buyticket')} className="bg-gradient-custom sm:px-20 px-2 sm:text-lg sm:py-3 py-1.5 rounded-full font-bold shadow-lg">
              Get Your Ticket!
            </button>
          </div>
        </div>
        
      </div>
      <div className="flex flex-col justify-center items-center">
          <div className="sm:mt-20 mt-3 sm:w-[350px] w-36">
            <img src="https://ik.imagekit.io/x6p94nrv0m/Group%2076.png?updatedAt=1720458973043" alt="" className="w-full h-full" />
          </div>
          <div className="bg-white sm:p-4 p-1 rounded-lg shadow-md w-2/5 sm:h-[250px] h-16 mb-4 flex flex-col justify-end text-center text-black">
            <h2 className="text-lg font-bold">After movie</h2>
          </div>
          <div className="flex justify-center w-2/3 mb-4 space-x-4 text-black">
            <div className="bg-white sm:p-4 rounded-lg shadow-md sm:w-1/4 w-20 sm:h-[150px] h-20 text-center flex flex-col justify-end font-bold">
              <p>Photo</p>
            </div>
            <div className="bg-white sm:p-4 rounded-lg shadow-md sm:w-1/4 w-20 text-center flex flex-col justify-end font-bold">
              <p>Photo</p>
            </div>
            <div className="bg-white sm:p-4 rounded-lg shadow-md sm:w-1/4 w-20 text-center flex flex-col justify-end font-bold">
              <p>Photo</p>
            </div>
          </div>
          <div className="bg-white sm:pt-2 rounded-lg shadow-md w-2/3 sm:h-[80px] h-12 text-center text-black font-bold">
            <h2 className="text-lg font-bold">Supported by:</h2>
          </div>
        </div>
      </div>
      
    </div>
  );
}
