import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../../stores/actionCreator';
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
export default function OrderList() {
  const dispatch = useDispatch();
  const { Orders } = useSelector(state => state.Orders);
console.log(Orders);

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
                  Name
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Line Id
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Phone Number
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  High School
                </th>
                {/* <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Scan
                </th> */}
                <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                  Created At
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
                      {ticket.fullName}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                      {ticket.email}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                      {ticket.lineId}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                      {ticket.phoneNumber}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                      {ticket.highSchool}
                    </td>
                    {/* <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
  {ticket.hasAttended ? (
    <FaCheck className="text-green-500" />
  ) : (
    <FaTimes className="text-red-500" />
  )}
</td> */}
                    <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                      {new Date(ticket.createdAt).toLocaleDateString()}
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
