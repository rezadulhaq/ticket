import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCateogry, fetchTicket } from '../../stores/actionCreator';
import { useNavigate } from 'react-router-dom';

export default function EditTicket({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState({
    name: '',
    quantity: '',
  });
  const [ticketPrices, setTicketPrices] = useState([{ price: '', totalTicket: '', CategoryId: '', isDeleted: false, color: '' }]);
  const [loading, setLoading] = useState(false);
  const { categoryTickets } = useSelector(state => state.categoryTickets);

  useEffect(() => {
    dispatch(fetchCateogry());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      // Fetch ticket data if an ID is present
      const fetchTicketData = async () => {
        try {
          const response = await axios.get(`https://backend.fexbfebui.id/admin/tickets/${id}`);
          
          const { data } = response;
          console.log(data);
          setTicketData({
            name: data.name,
            quantity: data.quantity,
          });
          setTicketPrices(data.TicketPrices); // Ensure ticketPrices is always an array
        } catch (error) {
          console.error('Failed to fetch ticket data', error);
          toast.error('Failed to load ticket data.');
        }
      };

      fetchTicketData();
    }
  }, [id]);

  const handleTicketDataChange = (e) => {
    const { name, value } = e.target;
    setTicketData({
      ...ticketData,
      [name]: value,
    });
  };

  const handleTicketPriceChange = (index, e) => {
    const { name, value } = e.target;
    const newTicketPrices = [...ticketPrices];
    newTicketPrices[index] = { ...newTicketPrices[index], [name]: value };
    setTicketPrices(newTicketPrices);
  };

  const handleCategoryChange = (index, value) => {
    const newTicketPrices = [...ticketPrices];
    newTicketPrices[index] = { ...newTicketPrices[index], CategoryId: value };
    setTicketPrices(newTicketPrices);
  };

  const handleAddTicketPrice = () => {
    setTicketPrices([...ticketPrices, { price: '', totalTicket: '', CategoryId: '', isDeleted: false, color: '' }]);
  };

  const handleRemoveTicketPrice = (index) => {
    const newTicketPrices = [...ticketPrices];
    newTicketPrices[index].isDeleted = true; // Mark as deleted
    setTicketPrices(newTicketPrices);
  };

  // const BASE_URL = 'http://localhost:3000';
  const BASE_URL = 'https://backend.fexbfebui.id'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const filteredTicketPrices = ticketPrices.filter(price => !price.isDeleted);
  
      // Update ticket details
      if (id) {
        // Update the ticket itself
        await axios.put(`${BASE_URL}/admin/tickets/${id}`, {
          name: ticketData.name,
          quantity: ticketData.quantity
        });
  
        // Update each ticket price individually
        await Promise.all(filteredTicketPrices.map(ticketPrice => 
          axios.put(`${BASE_URL}/admin/ticket-prices/${ticketPrice.id}`, ticketPrice)
        ));
        
        toast.success('Ticket and prices updated successfully!');
      } else {
        // Create new ticket
        await axios.post(`${BASE_URL}/admin/tickets`, {
          ...ticketData,
          ticketPrices: filteredTicketPrices
        });
        toast.success('Ticket and prices added successfully!');
      }
      dispatch(fetchTicket())
      document.getElementById(`Edit_Ticket_${id}`).close();
    } catch (error) {
      console.error('Failed to save ticket data', error);
      toast.error('Failed to save ticket data.');
    } finally {
      setLoading(false);
    }
  };
  
console.log(ticketPrices);

  return (
    <div>
      <button
        className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
        onClick={() => document.getElementById(`Edit_Ticket_${id}`).showModal()}
      >
         <span>Edit</span>
      </button>

      <dialog id={`Edit_Ticket_${id}`} className="modal">
        <div className="modal-box p-6 relative">
          <h2 className="text-xl font-bold mb-4">{id ? 'Edit Ticket' : 'Add New Ticket'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Ticket Name
              </label>
              <input
                type="text"
                name="name"
                value={ticketData.name}
                onChange={handleTicketDataChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={ticketData.quantity}
                onChange={handleTicketDataChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            {ticketPrices?.map((ticketPrice, index) => (
              <div key={index} className="mb-4 border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold">Tiket Price {index + 1}</h3>
                  {/* <button
                    type="button"
                    onClick={() => handleRemoveTicketPrice(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button> */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      TiketPrice
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={ticketPrice.price}
                      onChange={(e) => handleTicketPriceChange(index, e)}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Total Ticket
                    </label>
                    <input
                      type="number"
                      name="totalTicket"
                      value={ticketPrice.totalTicket}
                      onChange={(e) => handleTicketPriceChange(index, e)}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div className="flex-1">
    <label className="block text-gray-700 text-sm font-bold mb-2">
        Color
    </label>
    <select
        name="color"
        value={ticketPrice.color}
        onChange={(e) => handleTicketPriceChange(index, e)}
        className="input input-bordered w-full"
        required
    >
       <option value="">Select a Color</option>
        <option value='bg-[#8EDB8C]'>Green</option>
        <option value='bg-[#A82E9F]'>Purple</option>
        <option value='bg-[#1070D1]'>Blue</option>
        <option value='bg-[#F4CD5C]'>Yellow</option>
    </select>
</div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Category
                    </label>
                    <select
                      value={ticketPrice.CategoryId}
                      onChange={(e) => handleCategoryChange(index, e.target.value)}
                      className="select select-bordered w-full"
                      required
                    >
                      <option value="">Select Category</option>
                      {categoryTickets?.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Color
                    </label>
                    <input
                      type="text"
                      name="color"
                      value={ticketPrice.color}
                      onChange={(e) => handleTicketPriceChange(index, e)}
                      className="input input-bordered w-full"
                    />
                  </div> */}
                </div>
              </div>
            ))}

            {/* <button
              type="button"
              onClick={handleAddTicketPrice}
              className="btn bg-green-500 text-white hover:bg-green-700 flex items-center space-x-2"
            >
              <FaPlus /> <span>Add Ticket Price</span>
            </button> */}

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => document.getElementById(`Edit_Ticket_${id}`).close()}
                className="btn bg-gray-500 text-white"
              >
                <FaTimes /> Close
              </button>
              <button
                type="submit"
                className={`btn btn-primary ml-2 ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                <FaSave /> {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
