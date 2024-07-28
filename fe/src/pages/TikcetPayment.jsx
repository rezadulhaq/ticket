import React, { useState, useCallback, useEffect, useRef } from "react";
import { AiOutlineUser } from "react-icons/ai";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const TicketPage = () => {
    const location = useLocation();
    const selectedTickets = location.state?.selectedTickets || [];
    const filteredTickets = Object.values(
        selectedTickets.reduce((acc, obj) => {
            if (!acc[obj.id]) {
                acc[obj.id] = obj;
            }
            return acc;
        }, {})
    );

    const [activeSection, setActiveSection] = useState(1);
    const formDataRefs = useRef(
        selectedTickets.map((item) => ({
            TicketPriceId: item.id,
            fullName: "",
            idLine: "",
            phoneNumber: "",
            email: "",
            highSchool: "",
        }))
    );

    const [totalTicket, setTotalTicket] = useState(0);
    const [ticket, setTicket] = useState([]);
    const [allTicket, setAllTicket] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let dataTicket = [];
        let countTicket = 0;
        selectedTickets.forEach((el) => {
            let data = el.data;
            data.quantity = el.quantity;
            dataTicket.push(data);
            countTicket += el.quantity * el.data.Ticket.quantity;
        });

        setTotalTicket(countTicket);
        setAllTicket(formTicket(dataTicket));
    }, [selectedTickets, location]);

    function formTicket(allTicket) {
        let arr = [];
        allTicket.forEach((el) => {
            let countTicket = el.Ticket.quantity * el.quantity;
            for (let index = 0; index < countTicket; index++) {
                let obj = {
                    name: el.Ticket.name,
                    type: el.Ticket.id,
                };
                arr.push(obj);
            }
        });
        return arr;
    }

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    const getSubTotal = () => {
        let price = 0;
        filteredTickets.forEach((ticket) => {
            price += ticket.quantity * ticket.data.price;
        });
        return price;
    };

    const getTotal = () => {
        return getSubTotal() - selectedTickets.length * 2500;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            userId: localStorage.getItem("UserId"),
            orderDetails: formDataRefs.current.map((item, index) => ({
                TicketPriceId: item.TicketPriceId,
                lineId: item.idLine,
                fullName: item.fullName,
                email: item.email,
                phoneNumber: item.phoneNumber,
                highSchool: item.highSchool,
            })),
        };

        console.log({ formDataRefs, payload });
        try {
            const response = await axios.post(
                "http://localhost:3000/order/",
                payload
            );
            console.log("Order created successfully:", response.data);
            navigate("/payment");
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    const BuyerForm = ({ ticket, ticketIndex, formDataRef }) => {
        const [showForm, setShowForm] = useState(false);

        const toggleForm = () => {
            setShowForm((prev) => !prev);
        };

        return (
            <div className="w-full bg-[rgb(21,44,103)] text-white rounded-lg shadow-md mb-4">
                <div className="bg-gradient-custom px-10 py-1 mb-2 rounded-t-lg flex justify-between items-center">
                    <h2 className="text-2xl font-bold flex items-center">
                        <AiOutlineUser className="mr-2" />
                        Buyer Info
                    </h2>
                    <p>{ticket.ticket.name}</p>
                    <button
                        className="text-lg text-blue-600 font-semibold focus:outline-none"
                        onClick={toggleForm}
                    >
                        {showForm ? "Hide Form" : "Show Form"}
                    </button>
                </div>
                {showForm && (
                    <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-10 py-6">
                        <div className="col-span-1">
                            <label
                                htmlFor={`name-${ticketIndex}`}
                                className="block"
                            >
                                Name
                            </label>
                            <input
                                id={`name-${ticketIndex}`}
                                name="fullName"
                                type="text"
                                defaultValue={
                                    formDataRef.current[ticketIndex].fullName ||
                                    ""
                                }
                                onChange={(e) =>
                                    (formDataRef.current[ticketIndex].fullName =
                                        e.target.value)
                                }
                                className="w-full px-4 py-2 border rounded"
                                style={{
                                    color: "black",
                                    backgroundColor: "white",
                                }}
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label
                                htmlFor={`idLine-${ticketIndex}`}
                                className="block"
                            >
                                ID Line
                            </label>
                            <input
                                id={`idLine-${ticketIndex}`}
                                name="idLine"
                                type="text"
                                defaultValue={
                                    formDataRef.current[ticketIndex].idLine ||
                                    ""
                                }
                                onChange={(e) =>
                                    (formDataRef.current[ticketIndex].idLine =
                                        e.target.value)
                                }
                                className="w-full px-4 py-2 border rounded"
                                style={{
                                    color: "black",
                                    backgroundColor: "white",
                                }}
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label
                                htmlFor={`phone-${ticketIndex}`}
                                className="block"
                            >
                                Phone Number
                            </label>
                            <input
                                id={`phone-${ticketIndex}`}
                                name="phoneNumber"
                                type="text"
                                defaultValue={
                                    formDataRef.current[ticketIndex]
                                        .phoneNumber || ""
                                }
                                onChange={(e) =>
                                    (formDataRef.current[
                                        ticketIndex
                                    ].phoneNumber = e.target.value)
                                }
                                className="w-full px-4 py-2 border rounded"
                                style={{
                                    color: "black",
                                    backgroundColor: "white",
                                }}
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label
                                htmlFor={`email-${ticketIndex}`}
                                className="block"
                            >
                                Email
                            </label>
                            <input
                                id={`email-${ticketIndex}`}
                                name="email"
                                type="email"
                                defaultValue={
                                    formDataRef.current[ticketIndex].email || ""
                                }
                                onChange={(e) =>
                                    (formDataRef.current[ticketIndex].email =
                                        e.target.value)
                                }
                                className="w-full px-4 py-2 border rounded"
                                style={{
                                    color: "black",
                                    backgroundColor: "white",
                                }}
                                required
                            />
                        </div>
                        <div className="col-span-1">
                            <label
                                htmlFor={`highschool-${ticketIndex}`}
                                className="block"
                            >
                                Highschool
                            </label>
                            <input
                                id={`highschool-${ticketIndex}`}
                                name="highSchool"
                                type="text"
                                defaultValue={
                                    formDataRef.current[ticketIndex]
                                        .highSchool || ""
                                }
                                onChange={(e) =>
                                    (formDataRef.current[
                                        ticketIndex
                                    ].highSchool = e.target.value)
                                }
                                className="w-full px-4 py-2 border rounded"
                                style={{
                                    color: "black",
                                    backgroundColor: "white",
                                }}
                                required
                            />
                        </div>
                    </form>
                )}
            </div>
        );
    };

    return (
        <div className="backround-ticket p-4 sm:p-8">
            <div className="max-w-5xl mx-auto rounded-lg">
                {/* Header Section */}
                <div className="relative text-center mb-10">
                    <div
                        className="absolute inset-0 flex items-center justify-center z-0"
                        style={{
                            backgroundImage:
                                "url('https://ik.imagekit.io/x6p94nrv0m/scroll-01%202.png?updatedAt=1720551838052')",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            height: "120px",
                        }}
                    ></div>
                    <h1 className="relative text-3xl sm:text-[50px] font-bold pt-10 text-black font-custom z-10">
                        Tickets
                    </h1>
                </div>

                {/* Ticket Details Section */}
                <div className="pb-5 bg-blue-950 rounded-lg text-white shadow-md">
                    <div className="p-5">
                        <h2 className="text-2xl font-bold flex items-center">
                            <AiOutlineUser className="mr-2" />
                            Ticket Info
                        </h2>
                    </div>
                    <div className="mb-4 mt-2 ml-4 sm:ml-10 mr-4 sm:mr-10">
                        {filteredTickets.map((ticket, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center border-b border-gray-300 py-2"
                            >
                                <div className="w-2/3">
                                    {ticket.data.Ticket.name}
                                </div>
                                <div className="w-1/6 text-center">
                                    {ticket.quantity}
                                </div>
                                <div className="w-1/6 text-right">
                                    {rupiah(
                                        ticket.quantity * ticket.data.price
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-10 ml-4 sm:ml-10">
                        <div className="w-full sm:w-auto">
                            <label
                                htmlFor="referral-code"
                                className="block mb-3 font-semibold"
                            >
                                Bundling ( FExB + TROFI)
                            </label>
                            <input
                                placeholder="Referral code"
                                id="referral-code"
                                type="text"
                                className="text-black placeholder:font-semibold rounded-[20px] p-2 w-full sm:w-auto"
                            />
                        </div>
                        <button className="bg-gradient-custom px-8 text-lg py-1.5 rounded-full font-bold shadow-lg mt-4 sm:mt-8">
                            Apply
                        </button>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row justify-center items-center">
                        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-[80px] mt-16">
                            <div className="flex flex-col items-center">
                                <h3 className="mb-2 text-xl font-bold">
                                    SUBTOTAL
                                </h3>
                                <button className="bg-gradient-custom px-14 text-lg py-3 rounded-full font-bold shadow-lg">
                                    {rupiah(getSubTotal())}
                                </button>
                            </div>
                            <div className="flex flex-col items-center">
                                <h3 className="mb-2 text-xl font-bold">
                                    DISCOUNT
                                </h3>
                                <button className="bg-gradient-custom px-14 text-lg py-3 rounded-full font-bold shadow-lg">
                                    {/* referal code akan sama mendapatkan discount 2.500, jd gajadi hanya 100 orang pertama  */}
                                    {rupiah(selectedTickets.length * 2500)}
                                </button>
                            </div>
                            <div className="flex flex-col items-center">
                                <h3 className="mb-2 text-xl font-bold">
                                    TOTAL
                                </h3>
                                <button className="bg-gradient-custom px-14 text-lg py-3 rounded-full font-bold shadow-lg">
                                    {rupiah(getTotal())}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="bg-gray-200 text-black rounded-lg shadow-md mb-8 p-6">
                    <h2 className="text-2xl font-bold mb-4">Summary</h2>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal:</span>
                        <span>{rupiah(getSubTotal())}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Discount:</span>
                        <span>-{rupiah(selectedTickets.length * 2500)}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>{rupiah(getTotal())}</span>
                    </div>
                </div>

                {/* Buyer Information Section */}
                {selectedTickets.map((ticket, index) => (
                    <BuyerForm
                        key={index}
                        ticket={ticket}
                        ticketIndex={index}
                        formDataRef={formDataRefs}
                        // onFormDataChange={handleBuyerFormChange}
                    />
                ))}

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        className="bg-gradient-custom px-14 text-lg py-3 rounded-full font-bold shadow-lg"
                        onClick={handleSubmit}
                    >
                        Continue Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TicketPage;
