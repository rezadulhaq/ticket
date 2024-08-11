import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postCategory } from '../../stores/actionCreator';
import { toast } from 'react-toastify';

export default function AddCategory() {
  const initialState = { name: '' };
  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();

  const handleAddChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(postCategory(data));
      setData(initialState); // Reset the form data
      document.getElementById('my_modal_3').close();
      // toast.success('Category added successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add category.');
    }
  };

  return (
    <div>
      <button
        className="btn bg-[#6EACDA] font-bold text-white hover:bg-white hover:text-[#6EACDA] hover:border-2 hover:border-[#6EACDA]"
        onClick={() => document.getElementById('my_modal_3').showModal()}
      >
        Add Category
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById('my_modal_3').close()}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg">Add New Category</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category :</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={handleAddChange}
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
