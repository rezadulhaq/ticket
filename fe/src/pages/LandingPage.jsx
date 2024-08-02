import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Navbar from "../components/Navbar";

export default function LandingPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [activeGallery, setActiveGallery] = useState(0); // State untuk galeri aktif
  const Logo = [
    'https://ik.imagekit.io/x6p94nrv0m/Suport/L%20logo%20AQUA.png?updatedAt=1722093909210',
    'https://ik.imagekit.io/x6p94nrv0m/Suport/LOGO%20S.png?updatedAt=1722093908635',
    'https://ik.imagekit.io/x6p94nrv0m/Suport/UKURAN%20S.PNG?updatedAt=1722093908290',
    'https://ik.imagekit.io/x6p94nrv0m/Suport/S.png?updatedAt=1722093908118',
    'https://ik.imagekit.io/x6p94nrv0m/Suport/S%20(1).JPG?updatedAt=1722093908079',
    'https://ik.imagekit.io/x6p94nrv0m/Suport/Ukuran%20L.png.jpg?updatedAt=1722093908067',
    'https://ik.imagekit.io/x6p94nrv0m/Suport/REVISI%20S.PNG?updatedAt=1722093907723',
    'https://ik.imagekit.io/x6p94nrv0m/Suport/image.png?updatedAt=1722095471022'

  ]
  const photos = [
    'https://ik.imagekit.io/x6p94nrv0m/UNTUK%20WEBSITE/DSC_0869.JPG?updatedAt=1722091190765',
    'https://ik.imagekit.io/x6p94nrv0m/UNTUK%20WEBSITE/DSC_0960.JPG?updatedAt=1722091190672',
    'https://ik.imagekit.io/x6p94nrv0m/UNTUK%20WEBSITE/DSC_0833.JPG?updatedAt=1722091189876',
    'https://ik.imagekit.io/x6p94nrv0m/UNTUK%20WEBSITE/DSC_0859.JPG?updatedAt=1722091187884',
    'https://ik.imagekit.io/x6p94nrv0m/UNTUK%20WEBSITE/DSC_0841.JPG?updatedAt=1722091186187',
    'https://ik.imagekit.io/x6p94nrv0m/UNTUK%20WEBSITE/IMG_5755.JPG?updatedAt=1722091179814',
    'https://ik.imagekit.io/x6p94nrv0m/UNTUK%20WEBSITE/_DSC1068.JPG?updatedAt=1722091174209'
  ];

  const photos1 = [
    'https://ik.imagekit.io/x6p94nrv0m/UNTUK%20WEBSITE/IMG_3842.JPG?updatedAt=1722091164717',
    'https://ik.imagekit.io/x6p94nrv0m/UNTUK%20WEBSITE/IMG_3770.JPG?updatedAt=1722091164267',
    'https://ik.imagekit.io/x6p94nrv0m/UNTUK%20WEBSITE/DSC_0830.JPG?updatedAt=1722091158459',
    'https://ik.imagekit.io/x6p94nrv0m/UNTUK%20WEBSITE/DSC00260.JPG?updatedAt=1722091157478',
    'https://ik.imagekit.io/x6p94nrv0m/UNTUK%20WEBSITE/DSC00267.JPG?updatedAt=1722091156876',
    'https://ik.imagekit.io/x6p94nrv0m/UNTUK%20WEBSITE/DSC00211.JPG?updatedAt=1722091156686',
    'https://ik.imagekit.io/x6p94nrv0m/UNTUK%20WEBSITE/DSC00252.JPG?updatedAt=1722091156021'
  ];

  const photos2 = [
    'https://ik.imagekit.io/x6p94nrv0m/UNTUK%20WEBSITE/DSC_0768.JPG?updatedAt=1722091154425',
    'https://ik.imagekit.io/x6p94nrv0m/UNTUK%20WEBSITE/DSC_0772.JPG?updatedAt=1722091153932',
    'https://ik.imagekit.io/x6p94nrv0m/UNTUK%20WEBSITE/DSC_0815.JPG?updatedAt=1722091153423',
    'https://ik.imagekit.io/x6p94nrv0m/UNTUK%20WEBSITE/DSC_0743.JPG?updatedAt=1722091153313',
    'https://ik.imagekit.io/x6p94nrv0m/UNTUK%20WEBSITE/DSC_0757.JPG?updatedAt=1722091152449',
    'https://ik.imagekit.io/x6p94nrv0m/UNTUK%20WEBSITE/27B25DBC-4DDC-447D-BB21-DF8FBBB646C6-39192-00000D998407490D.jpg?updatedAt=1722091098932'
  ];

  const handleNext = () => {
    if (activeGallery === 0 && currentIndex < photos.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else if (activeGallery === 1 && currentIndex1 < photos1.length - 1) {
      setCurrentIndex1(prevIndex => prevIndex + 1);
    } else if (activeGallery === 2 && currentIndex2 < photos2.length - 1) {
      setCurrentIndex2(prevIndex => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (activeGallery === 0 && currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    } else if (activeGallery === 1 && currentIndex1 > 0) {
      setCurrentIndex1(prevIndex => prevIndex - 1);
    } else if (activeGallery === 2 && currentIndex2 > 0) {
      setCurrentIndex2(prevIndex => prevIndex - 1);
    }
  };

  return (
    <div className="bg-mobile sm:bg-desktop h-full sm:h-auto bg-cover bg-repeat bg-center sm:pb-10 pb-5">
      <Navbar/>
      <div className="flex flex-col">
        <div className="flex flex-col h-full text-white max-w-[250px] sm:max-w-xl">
          <div className="justify-start items-start sm:pl-10 pl-0 sm:pt-12 pt-4">
            <div>
              <img className="sm:w-[400px] w-[110px] ml-12" src="https://ik.imagekit.io/x6p94nrv0m/Suport/website%20fexb%202024_page-0001.jpg?updatedAt=1722096324082" alt="" />
              <p className="max-w-full sm:max-w-xl sm:text-lg text-xs mb-6 text-justify break-words px-4">
                FEXB 2025 is an annual open house event that includes a try out simulation for UTBK and SIMAK UI as well as a faculty exhibition with fun rides, with the goal of providing a stimulating and enjoyable experience for all participants as they prepare for their future education. Furthermore, FEXB 2025 will feature an interactive discussion show and activities that will offer participants a taste of how college will function, allowing them to begin their dream with us.
              </p>
            </div>
            <div className="flex justify-start items-start sm:ml-20 ml-4">
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
          <div className="bg-white sm:p-2 p-1 rounded-lg shadow-md sm:w-2/5 w-full sm:h-[250px] h-[200px]  mb-4 flex flex-col justify-end text-center text-black mx-auto">
  <h2 className="text-lg font-bold">After movie</h2>
  <div className="relative w-full h-full">
    <video className="absolute inset-0 w-full h-full object-cover" controls>
      <source src="" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</div>

<div className="flex flex-col sm:flex-row justify-center w-full mb-4 px-4 sm:px-20 space-y-4 sm:space-y-0 sm:space-x-4 text-black">
  <div className="bg-white sm:p-2 p-1 rounded-lg shadow-md w-full sm:w-1/3">
    <h2 className="text-lg font-bold mb-2 text-center">Gallery 1</h2>
    <div className="relative">
      <img src={photos[currentIndex]} alt="Gallery 1" className="w-full h-[175px] object-cover rounded-lg" />
      <div className="absolute inset-0 flex justify-between items-center px-2">
        <button onClick={() => { setActiveGallery(0); handlePrevious(); }} className="bg-black text-white rounded-full p-2">
          <FiChevronLeft />
        </button>
        <button onClick={() => { setActiveGallery(0); handleNext(); }} className="bg-black text-white rounded-full p-2">
          <FiChevronRight />
        </button>
      </div>
    </div>
  </div>

  <div className="bg-white sm:p-2 p-1 rounded-lg shadow-md w-full sm:w-1/3">
    <h2 className="text-lg font-bold mb-2 text-center">Gallery 2</h2>
    <div className="relative">
      <img src={photos1[currentIndex1]} alt="Gallery 2" className="w-full h-[175px] object-cover rounded-lg" />
      <div className="absolute inset-0 flex justify-between items-center px-2">
        <button onClick={() => { setActiveGallery(1); handlePrevious(); }} className="bg-black text-white rounded-full p-2">
          <FiChevronLeft />
        </button>
        <button onClick={() => { setActiveGallery(1); handleNext(); }} className="bg-black text-white rounded-full p-2">
          <FiChevronRight />
        </button>
      </div>
    </div>
  </div>

  <div className="bg-white sm:p-2 p-1 rounded-lg shadow-md w-full sm:w-1/3">
    <h2 className="text-lg font-bold mb-2 text-center">Gallery 3</h2>
    <div className="relative">
      <img src={photos2[currentIndex2]} alt="Gallery 3" className="w-full h-[175px] object-cover rounded-lg" />
      <div className="absolute inset-0 flex justify-between items-center px-2">
        <button onClick={() => { setActiveGallery(2); handlePrevious(); }} className="bg-black text-white rounded-full p-2">
          <FiChevronLeft />
        </button>
        <button onClick={() => { setActiveGallery(2); handleNext(); }} className="bg-black text-white rounded-full p-2">
          <FiChevronRight />
        </button>
      </div>
    </div>
  </div>
</div>
<div className="px-10">
<div className="p-4 sm:p-2 bg-gray-100 rounded-lg">
  <h2 className="text-2xl font-bold text-center mb-6">Supported By</h2>
  <div className="flex flex-wrap justify-center gap-4">
    {Logo.map((url, index) => (
      <div key={index} className="flex justify-center items-center p-2">
        <img
          src={url}
          alt={`Logo ${index + 1}`}
          className="w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] object-contain"
        />
      </div>
    ))}
  </div>
</div>
</div>


        </div>
      </div>
    </div>
  );
}
