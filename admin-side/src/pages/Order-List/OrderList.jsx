import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../../stores/actionCreator';

export default function OrderList() {
  const dispatch = useDispatch();
  const { Orders } = useSelector(state => state.Orders);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  const handleEdit = (id) => {
    // Logic for editing a ticket
  };

  const handleDelete = (id) => {
    // Logic for deleting a ticket
  };

  return (
    <div className="flex flex-col w-full lg:ml-12 ml-0 mt-20 lg:mt-0">
      <Header />
      <div className='lg:p-10 bg-slate-100 h-full relative'>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Ticket ID
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Title
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Created At
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {Orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-700">
                    No data available
                  </td>
                </tr>
              ) : (
                Orders.map((ticket) => (
                  <tr key={ticket.id}>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                      {ticket.id}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                      {ticket.title}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                      {ticket.status}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                      <button
                        onClick={() => handleEdit(ticket.id)}
                        className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(ticket.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
