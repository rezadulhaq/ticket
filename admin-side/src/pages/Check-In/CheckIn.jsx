import { useState } from "react";
import QrScanner from "qr-scanner";
import { FaUserCircle, FaQrcode, FaStop } from "react-icons/fa";

let stopScan = false;
let hasilScan = "";

function CheckIn() {
  const [btnScan, setBtnScan] = useState(true);

  const scanNow = async (isScan) => {
    setBtnScan(isScan);
    if (isScan) stopScan = true;
    if (btnScan === false) return;
    stopScan = false;
    await new Promise(r => setTimeout(r, 100));
    const videoElement = document.getElementById('scanView');
    const scanner = new QrScanner(
      videoElement,
      result => {
        hasilScan = result.data;
        setBtnScan(true);
        stopScan = true;
      },
      {
        onDecodeError: error => {
          console.error(error);
        },
        maxScansPerSecond: 1,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        returnDetailedScanResult: true
      }
    );
    await scanner.start();
    while (stopScan === false) await new Promise(r => setTimeout(r, 100));
    scanner.stop();
    scanner.destroy();
  };

  return (
    <div className="relative h-screen w-full ml-[50px]">
      <header className="bg-blue-500 p-4 flex items-center w-full">
        <div className="flex items-center w-full">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-2">
            <FaUserCircle className="text-white text-3xl" />
          </div>
          <h1 className="text-white text-xl">Halo</h1>
        </div>
      </header>
      <main className="pt-16 flex flex-col items-start justify-start h-full">
        {!btnScan && (
          <video
            id="scanView"
            className="w-full h-full border-dotted border-4 border-gray-300"
          ></video>
        )}
        {btnScan && (
          <div className="p-4">
            <h2 className="text-xl">Hasil Scan:</h2>
            <p className="mt-2 text-lg">{hasilScan}</p>
          </div>
        )}
      </main>
      <button
        onClick={() => scanNow(!btnScan)}
        className={`fixed bottom-4 right-4 p-4 rounded-full ${btnScan ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'} transition-colors flex items-center justify-center`}
      >
        {btnScan ? <FaQrcode className="text-2xl" /> : <FaStop className="text-2xl" />}
      </button>
    </div>
  );
}

export default CheckIn;
