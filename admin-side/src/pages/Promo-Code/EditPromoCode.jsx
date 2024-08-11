import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchCateogry, fetchPromo } from '../../stores/actionCreator';

export default function EditPromo({ id, promo }) {
  const dispatch =useDispatch()
  const [formData, setFormData] = useState({
    name: '',
  });
const BASE_URL = 'http://localhost:3000'
  useEffect(() => {
    if (promo) {
      setFormData({ name: promo.name });
    }
  }, [promo]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/admin/promo-codes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'access_token': localStorage.getItem('access_token'),
        },
        body: JSON.stringify(formData),
      });

      const responseJSON = await response.json();

      if (!response.ok) {
        throw new Error(responseJSON.message || 'Something went wrong');
      }
      dispatch(fetchPromo())
      document.getElementById(`edit_promo_${id}`).close();
      toast.success('promo updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update promo.');
    }
  };

  return (
    <div>
      <button
        className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        onClick={() => document.getElementById(`edit_promo_${id}`).showModal()}
      >
        Edit
      </button>
      <dialog id={`edit_promo_${id}`} className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById(`edit_promo_${id}`).close()}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg">Edit promo</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">promo :</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered input-info"
              />
            </div>
            <button
              type="submit"
              className="btn bg-[rgb(0,124,195)] text-white hover:bg-white hover:text-[rgb(0,124,195)] hover:border-[rgb(0,124,195)] border-2 w-full mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
