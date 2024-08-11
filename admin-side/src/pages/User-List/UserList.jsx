import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTicket, fetchUsers } from '../../stores/actionCreator';

export default function UserList() {
  const dispatch = useDispatch()
  const {Users} = useSelector(state => state.Users)
  console.log(Users);
  
  useEffect(() => {
    dispatch(fetchUsers())
  },[])
  const [tickets, setTickets] = useState([
    { id: 1, title: 'Ticket 1', status: 'Open', createdAt: '2024-08-01' },
    { id: 2, title: 'Ticket 2', status: 'In Progress', createdAt: '2024-08-02' },
    { id: 3, title: 'Ticket 3', status: 'Closed', createdAt: '2024-08-03' },
  ]);

  const handleEdit = (id) => {
    console.log(`Edit ticket with id: ${id}`);
    // Implement your edit logic here
  };

  const handleDelete = (id) => {
    console.log(`Delete ticket with id: ${id}`);
    setTickets(tickets.filter((ticket) => ticket.id !== id));
  };

  return (
    <div className=" flex flex-col w-full lg:ml-12 ml-0 mt-20 lg:mt-0">
      <Header/>
      <div className='lg:p-10  bg-slate-100 h-full relative'>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                No
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                Username
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                Phone Number
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-200 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Users.map((ticket,i) => (
              <tr key={ticket.id}>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                  {i + 1}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                  {ticket.userName}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                  {ticket.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                  {ticket?.phoneNumber}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                  <button
                    onClick={() => handleEdit(ticket.id)}
                    className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Details
                  </button>
                -
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
