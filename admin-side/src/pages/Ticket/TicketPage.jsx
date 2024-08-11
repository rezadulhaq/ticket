import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTicket, fetchTicket } from '../../stores/actionCreator';
import { toast } from 'react-toastify';
import AddTicket from './AddTicket';
import EditTicket from './EditTicket';

export default function TicketPage() {
  const dispatch = useDispatch();
  const { Tickets } = useSelector(state => state.Tickets);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchTicket());
  }, [dispatch]);

  const handleEdit = (id) => {
    console.log(`Edit ticket with id: ${id}`);
    // Implement your edit logic here
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTicket(id));
      toast.success('Ticket deleted successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete ticket.');
    }
  };

  // Filter tickets based on search term
  const filteredTickets = Tickets.filter(ticket =>
    ticket.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full lg:ml-12 ml-0 mt-20 lg:mt-0">
      <Header />
      <div className='lg:p-10 bg-slate-100 h-full relative'>
        <div className='flex justify-between mb-4'>
          <AddTicket />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full md:w-1/3"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  TNo
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Quantity Ticket
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Total Ticket
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Ticket Price
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
                    {ticket.quantity}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {ticket.TicketPrices.map(el => (
                      <div key={el.id} className='flex'>
                        - {el.totalTicket}
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                    {ticket.TicketPrices.map(el => (
                      <div key={el.id} className='flex'>
                        - Rp.{el.price}
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                    <EditTicket id={ticket.id} />
                    <button
                      onClick={() => handleDelete(ticket.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
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
