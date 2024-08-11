import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, deletePromo, fetchCateogry, fetchPromo, fetchTicket } from '../../stores/actionCreator';
import AddPromoCode from './AddPromoCode';
import EditPromo from './EditPromoCode';
// import AddCategory from './AddCategory';
// import EditCategory from './EditCategory';

export default function TicketCategory() {
  const dispatch = useDispatch();
  const { Promos } = useSelector(state => state.Promos);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchPromo());
  }, [dispatch]);

  const handleEdit = (id) => {
    console.log(`Edit ticket with id: ${id}`);
    // Implement your edit logic here
  };

  async function handleDelete(id) {
    try {
      await dispatch(deletePromo(id))
      // toast.success('/succses')
    } catch (error) {
      console.log(error);
      
    }
  }

  // Filter tickets based on the search term
  const filteredTickets = Promos.filter(ticket =>
    ticket.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full lg:ml-12 ml-0 mt-20 lg:mt-0">
      <Header />
      <div className="lg:p-10 bg-slate-100 h-full relative">
        {/* Search Bar */}
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search Promo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full lg:w-1/3"
          />
          <AddPromoCode/>
          {/* <AddCategory/> */}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  No
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Title
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket, i) => (
                <tr key={ticket.id}>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {i + 1}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {ticket.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
  <div className="flex space-x-2">
    {/* <EditCategory id ={ticket.id} category={ticket} /> */}
    <EditPromo id={ticket.id} promo={ticket}/>
    <button
      onClick={() => handleDelete(ticket.id)}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
    >
      Delete
    </button>
  </div>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
