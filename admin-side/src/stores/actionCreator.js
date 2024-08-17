import { toast } from "react-toastify";
import { ADD_PROMO, DELETE_CATEGORY, DELETE_PROMO, DELETE_TICKETS, EDIT_CATEGORY, LOGIN_ADMIN, POST_CATEGORY, READ_CATEGORY_TICKET, READ_ORDER, READ_PROMO, READ_TICKETS, READ_USERS, REGISTER_ADMIN } from "./actionType";

// const BASE_URL = 'http://localhost:3000'
const BASE_URL = 'https://backend.fexbfebui.id'
export const actionGenerator = (type,payload) => {
    return {
        type,
        payload
    }
}
export const fetchTicket = () => {
    return async (dispatch) => {
      try {
        const response = await fetch(BASE_URL + "/admin/tickets", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
        });
        const responseJSON = await response.json();
        dispatch(actionGenerator(READ_TICKETS, responseJSON));
        // console.log(response);
      } catch (error) {
        console.log(error, "<<<<<<<<<");
      }
    };
  };
  export const fetchUsers = () => {
    return async (dispatch) => {
      try {
        const response = await fetch(BASE_URL + "/admin/users", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
        });
        const responseJSON = await response.json();
        dispatch(actionGenerator(READ_USERS, responseJSON));
        // console.log(response);
      } catch (error) {
        console.log(error, "<<<<<<<<<");
      }
    };
  };
  export const fetchCateogry = () => {
    return async (dispatch) => {
      try {
        const response = await fetch(BASE_URL + "/admin/categories", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
        });
        const responseJSON = await response.json();
        dispatch(actionGenerator(READ_CATEGORY_TICKET, responseJSON));
        // console.log(response);
      } catch (error) {
        console.log(error, "<<<<<<<<<");
      }
    };
  };
  export const fetchOrder = () => {
    return async (dispatch) => {
      try {
        const response = await fetch(BASE_URL + "/admin/order-details", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
        });
        const responseJSON = await response.json();
        dispatch(actionGenerator(READ_ORDER, responseJSON));
        // console.log(response);
      } catch (error) {
        console.log(error, "<<<<<<<<<");
      }
    };
  };
  export const fetchPromo = () => {
    return async (dispatch) => {
      try {
        const response = await fetch(BASE_URL + "/admin/promo-codes", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
        });
        const responseJSON = await response.json();
        dispatch(actionGenerator(READ_PROMO, responseJSON));
        // console.log(response);
      } catch (error) {
        console.log(error, "<<<<<<<<<");
      }
    };
  };
  export const postCategory = (data) => {
    console.log(data);
    return async (dispatch) => {
      try {
        const response = await fetch(BASE_URL + "/admin/categories", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
          body : JSON.stringify(data)
        });
        const responseJSON = await response.json();
        dispatch(fetchCateogry(),actionGenerator(POST_CATEGORY, responseJSON));
       toast.success(responseJSON.message)
      } catch (error) {
        console.log(error, "<<<<<<<<<");
        throw(error)
      }
    };
  };
  export const deleteCategory = (id) => {
    // console.log(id,'id');
    return async (dispact) => {
      try {
       const data = await fetch(BASE_URL + `/admin/categories/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),

          },
        });
        const responseJSON = await data.json();
        dispact(fetchCateogry(),actionGenerator(DELETE_CATEGORY));
        toast.success(responseJSON.message)
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
  };
  export const updateCategory = (id, data) => {
    console.log(id);
    console.log(data);
    return async (dispact) => {
      try {
        const response = await fetch(BASE_URL + `/admin/categories/${id}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
          body: JSON.stringify(data.name),
        });
        const responseJSON = await response.json();
        dispact(fetchCateogry(), actionGenerator(EDIT_CATEGORY));
        toast.success(responseJSON.message)
      } catch (error) {
        console.log(error);
      }
    };
  };
  export const deleteTicket = (id) => {
    // console.log(id,'id');
    return async (dispact) => {
      try {
       const data = await fetch(BASE_URL + `/admin/tickets/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),

          },
        });
        const responseJSON = await data.json();
        dispact(fetchTicket(),actionGenerator(DELETE_TICKETS));
        toast.success(responseJSON.message)
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
  };
  export const postAdmin = (formData) => {
    console.log(formData);
    return async (dispatch) => {
      try {
        const response = await fetch(BASE_URL + "/admin/register", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
          body : JSON.stringify(formData)
        });
        const responseJSON = await response.json();
        dispatch(actionGenerator(REGISTER_ADMIN, responseJSON));
       toast.success(responseJSON.message)
      } catch (error) {
        console.log(error, "<<<<<<<<<");
        throw(error)
      }
    };
  };
  export const loginAdmin = (formData) => {
    console.log(formData);
    return async (dispatch) => {
      try {
        const response = await fetch(BASE_URL + "/admin/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
           
          },
          body : JSON.stringify(formData)
        });
        const responseJSON = await response.json();
        console.log(responseJSON.accessToken);
        
        localStorage.setItem("access_token", responseJSON.accessToken);
        dispatch(actionGenerator(LOGIN_ADMIN, responseJSON));
       toast.success(responseJSON.message)
      } catch (error) {
        console.log(error, "<<<<<<<<<");
        throw(error)
      }
    };
  };
  export const postPromo = (data) => {
    console.log(data);
    return async (dispatch) => {
      try {
        const response = await fetch(BASE_URL + "/admin/promo-codes", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
          body : JSON.stringify(data)
        });
        const responseJSON = await response.json();
        dispatch(fetchPromo(),actionGenerator(ADD_PROMO, responseJSON));
       toast.success(responseJSON.message)
      } catch (error) {
        console.log(error, "<<<<<<<<<");
        throw(error)
      }
    };
  };
  export const deletePromo = (id) => {
    // console.log(id,'id');
    return async (dispact) => {
      try {
       const data = await fetch(BASE_URL + `/admin/promo-codes/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),

          },
        });
        const responseJSON = await data.json();
        dispact(fetchPromo(),actionGenerator(DELETE_PROMO));
        toast.success(responseJSON.message)
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
  };