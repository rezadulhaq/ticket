import React from 'react'

export default function Invoice() {
  return (
    <div className="sm:bg-desktopInvoice bg-mobileInvoice p-8 w-full h-auto bg-center bg-repeat bg-cover sm:p-8">
        <div className="relative text-center mb-10">
          <div
            className="absolute inset-0 flex items-center justify-center z-0"
            style={{
              backgroundImage: "url('https://ik.imagekit.io/x6p94nrv0m/scroll-01%202.png?updatedAt=1720551838052')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: '100px'
            }}
          ></div>
          <h1 className="relative text-3xl sm:text-[45px] font-bold pt-8 text-black font-custom z-10">
            Tickets
          </h1>
        </div>
        <div className='flex flex-col items-center'>
  <div className="p-3 px-6   rounded-lg bg-[#D4AD81] h-auto max-w-full sm:max-w-[1000px] w-full">
    <div className='bg-white rounded-xl flex flex-col justify-center  p-7'>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <p>Name :</p>
          <p>Asal Sekolah :</p>
          <p>Email - No. Hp :</p>
        </div>
        <div>
          <p>Order / (tiket) Number :</p>
          <p>Order Date :</p>
          <p>Payment Method :</p>
        </div>
      </div>
      <div className='bg-[#162C67] p-4 rounded-lg'>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full border-2 border-gray-300">
            <thead className="bg-[#DDE7F8]">
              <tr>
                <th className="px-4 py-2 border border-gray-300">Jenis Tiket</th>
                <th className="px-4 py-2 border border-gray-300">Quantity</th>
                <th className="px-4 py-2 border border-gray-300">Price</th>
              </tr>
            </thead>
            <tbody className='text-white'>
              <tr className='bg-[#5375C2]'>
                <td className="px-4 py-2 border border-gray-300">Sample Ticket</td>
                <td className="px-4 py-2 border border-gray-300">1</td>
                <td className="px-4 py-2 border border-gray-300">$10</td>
              </tr>
              <tr className='bg-[#5375C2]'>
                <td className="px-4 py-2 border border-gray-300">Sample Ticket</td>
                <td className="px-4 py-2 border border-gray-300">1</td>
                <td className="px-4 py-2 border border-gray-300">$10</td>
              </tr>
              <tr className='bg-[#5375C2]'>
                <td className="px-4 py-2 border border-gray-300">Sample Ticket</td>
                <td className="px-4 py-2 border border-gray-300">1</td>
                <td className="px-4 py-2 border border-gray-300">$10</td>
              </tr>
              <tr className='bg-[#DDE7F8] text-black'>
                <td className="px-4 py-2 border border-gray-300 font-bold">Total</td>
                <td className="px-4 py-2 border border-gray-300 font-bold"></td>
                <td className="px-4 py-2 border border-gray-300 font-bold">$10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div className="text-center mt-3">
    <h2 className="text-2xl sm:text-3xl font-bold font-custom">See you on FEXB 2025, Dreamers!</h2>
    <p className="text-sm sm:text-base text-[#3944A1] mt-2 font-customText">Jika belum mendapat invoice dalam waktu 1 x 24 jam atau mengalami kendala dalam pemesan tiket, silakan hubungi OA @fexbfebui</p>
  </div>
</div>

    </div>
  )
}
