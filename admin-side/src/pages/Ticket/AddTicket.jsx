import React, { useEffect, useState } from 'react';
import axios from 'axios'; // For making HTTP requests
import { toast } from 'react-toastify'; // For showing notifications
import { FaPlus, FaTrash, FaSave, FaTimes } from 'react-icons/fa'; // Import icons
import { useDispatch, useSelector } from 'react-redux';
import { fetchCateogry, fetchTicket } from '../../stores/actionCreator';

export default function AddTicket() {
  const dispatch = useDispatch();
  const [ticketData, setTicketData] = useState({
    name: '',
    quantity: '',
    // Add other ticket fields as needed
  });
  const [ticketPrices, setTicketPrices] = useState([{ price: '', totalTicket: '', CategoryId: '', isDeleted: false ,color : ''}]);
  const [loading, setLoading] = useState(false);
  const { categoryTickets } = useSelector(state => state.categoryTickets);

  useEffect(() => {
    dispatch(fetchCateogry());
  }, [dispatch]);

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

  const handleAddTicketPrice = () => {
    setTicketPrices([...ticketPrices, { price: '', totalTicket: '', CategoryId: '', isDeleted: false,color: '' }]);
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
      // Filter out the items marked as deleted
      const filteredTicketPrices = ticketPrices.filter(price => !price.isDeleted);

      await axios.post(BASE_URL + '/admin/tickets', { ticketData, ticketPrices: filteredTicketPrices });
      toast.success('Ticket and prices added successfully!');
      setTicketData({
        name: '',
        quantity: '',
        // Reset other ticket fields
      });
      setTicketPrices([{ price: '', totalTicket: '', CategoryId: '', isDeleted: false }]);
      dispatch(fetchTicket())
      document.getElementById('add_ticket_modal').close();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add ticket.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="btn bg-blue-500 text-white hover:bg-blue-700 flex items-center space-x-2"
        onClick={() => document.getElementById('add_ticket_modal').showModal()}
      >
     <span>Add Ticket</span>
      </button>

      <dialog id="add_ticket_modal" className="modal">
        <div className="modal-box p-6 relative">
          <h2 className="text-xl font-bold mb-4">Add New Ticket</h2>
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
                Jumlah Ticket PerPack
              </label>
              <input
                name="quantity"
                value={ticketData.quantity}
                onChange={handleTicketDataChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            {ticketPrices.map((price, index) => (
              !price.isDeleted && (
                <div key={index} className="mb-4">
                  <div className="flex space-x-2 items-center">
                    <div className='flex flex-col'>
                      <h1 className='font-bold'>Ticket Price {index + 1}</h1>
                      <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={price.price}
                          onChange={(e) => handleTicketPriceChange(index, e)}
                          className="input input-bordered w-full"
                          required
                        />
                      </div>

                      <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Total Ticket
                        </label>
                        <input
                          type="text"
                          name="totalTicket"
                          value={price.totalTicket}
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
        value={price.color}
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
                      <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Category
                        </label>
                        <select
                          name="CategoryId"
                          value={price.CategoryId}
                          onChange={(e) => handleTicketPriceChange(index, e)}
                          className="select select-bordered w-full"
                          required
                        >
                          <option value="">Select a Category</option>
                          {categoryTickets.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveTicketPrice(index)}
                      className="btn bg-red-500 text-white hover:bg-red-700 flex items-center justify-center"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )
            ))}

            <button
              type="button"
              onClick={handleAddTicketPrice}
              className="btn bg-green-500 text-white hover:bg-green-700 flex items-center space-x-2"
            >
              <FaPlus /> <span>Add Another Price</span>
            </button>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => document.getElementById('add_ticket_modal').close()}
                className="btn bg-gray-500 text-white hover:bg-gray-700 flex items-center space-x-2"
              >
                <FaTimes /> <span>Cancel</span>
              </button>
              <button
                type="submit"
                className="btn bg-blue-500 text-white hover:bg-blue-700 flex items-center space-x-2"
                disabled={loading}
              >
                {loading ? <span>Loading...</span> : <><FaSave /> <span>Save</span></>}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
