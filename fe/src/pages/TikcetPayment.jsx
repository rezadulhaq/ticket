import React, { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TicketPage = () => {
    const [activeSection, setActiveSection] = useState(1);
    const [selectedTickets, setSelectedTickets] = useState([]);
    const [buyerInfos, setBuyerInfos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedTickets =
            JSON.parse(localStorage.getItem("selectedTickets")) || [];
        setSelectedTickets(storedTickets);
    }, []);

    const handleSectionToggle = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    const handleBuyerFormSubmit = (ticketId, formData) => {
        const updatedBuyerInfos = [...buyerInfos];
        updatedBuyerInfos[ticketId - 1] = formData;
        setBuyerInfos(updatedBuyerInfos);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            userId: 1, // Ganti dengan userID yang sesuai
            orderDetails: buyerInfos.map((buyerInfo, index) => ({
                TicketPriceId: selectedTickets[index].id,
                OrderId: 1, // Ganti dengan orderID yang sesuai
                lineId: buyerInfo.idLine,
                fullName: buyerInfo.name,
                email: buyerInfo.email,
                phoneNumber: buyerInfo.phone,
                highSchool: buyerInfo.highschool,
            })),
        };

        try {
            const response = await axios.post("url_ke_server_anda", payload);
            console.log("Order created successfully:", response.data);

            navigate("/payment");
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    const BuyerForm = ({ ticket }) => {
        const [showForm, setShowForm] = useState(true);

        const toggleForm = () => {
            setShowForm(!showForm);
        };

        const handleFormSubmit = (e) => {
            e.preventDefault();
            const formData = {
                idLine: e.target[`ticket_${ticket.id}_id-line`].value,
                name: e.target[`ticket_${ticket.id}_name`].value,
                email: e.target[`ticket_${ticket.id}_email`].value,
                phone: e.target[`ticket_${ticket.id}_phone`].value,
                highschool: e.target[`ticket_${ticket.id}_highschool`].value,
            };
            handleBuyerFormSubmit(ticket.id, formData);
        };

        return (
            <div className="w-full bg-[rgb(21,44,103)] text-white rounded-lg shadow-md mb-4">
                <div className="bg-gradient-custom px-10 py-1 mb-2 rounded-t-lg flex justify-between items-center">
                    <h2 className="text-2xl font-bold flex items-center">
                        <AiOutlineUser className="mr-2" />
                        Buyer Info - Ticket {ticket.id}
                    </h2>
                    <button
                        className="text-lg text-blue-600 font-semibold focus:outline-none"
                        onClick={toggleForm}
                    >
                        {showForm ? "Hide Form" : "Show Form"}
                    </button>
                </div>
                {showForm && (
                    <form className="px-10 py-6" onSubmit={handleFormSubmit}>
                        <input
                            type="hidden"
                            name={`ticket_${ticket.id}_quantity`}
                            value={ticket.quantity}
                        />
                        <div className="mb-4">
                            <label
                                htmlFor={`ticket_${ticket.id}_name`}
                                className="block"
                            >
                                Name
                            </label>
                            <input
                                id={`ticket_${ticket.id}_name`}
                                type="text"
                                className="w-full px-4 py-2 border rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor={`ticket_${ticket.id}_id-line`}
                                className="block"
                            >
                                ID Line
                            </label>
                            <input
                                id={`ticket_${ticket.id}_id-line`}
                                type="text"
                                className="w-full px-4 py-2 border rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor={`ticket_${ticket.id}_phone`}
                                className="block"
                            >
                                Phone Number
                            </label>
                            <input
                                id={`ticket_${ticket.id}_phone`}
                                type="text"
                                className="w-full px-4 py-2 border rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor={`ticket_${ticket.id}_email`}
                                className="block"
                            >
                                Email
                            </label>
                            <input
                                id={`ticket_${ticket.id}_email`}
                                type="email"
                                className="w-full px-4 py-2 border rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor={`ticket_${ticket.id}_highschool`}
                                className="block"
                            >
                                Highschool
                            </label>
                            <input
                                id={`ticket_${ticket.id}_highschool`}
                                type="text"
                                className="w-full px-4 py-2 border rounded"
                                required
                            />
                        </div>
                        {/* <button
                            type="submit"
                            className="bg-gradient-custom px-8 text-lg py-1.5 rounded-full font-bold shadow-lg mt-4"
                        >
                            Submit
                        </button> */}
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
                <div className="pb-5 bg-blue-950 rounded-lg mb-8 w-full bg-cover text-white">
                    <div className="bg-gradient-custom px-10 py-1 mb-2 rounded-t-lg">
                        <h2 className="text-2xl font-bold flex items-center">
                            <AiOutlineUser className="mr-2" />
                            Ticket Info
                        </h2>
                    </div>
                    <div className="mb-4 mt-2 ml-4 sm:ml-10 mr-4 sm:mr-10 flex flex-col gap-5 font-semibold">
                        {selectedTickets.map((ticket) => (
                            <div
                                key={ticket.id}
                                className="flex justify-between"
                            >
                                <span className="flex-1">{`Ticket ${ticket.id} - Quantity: ${ticket.quantity}`}</span>
                                <span className="flex-1 text-center">
                                    {ticket.quantity}
                                </span>
                                <span className="flex-1 text-right">{`Price: ${
                                    ticket.quantity * 50000
                                }`}</span>
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
                                    470.000
                                </button>
                            </div>
                            <div className="flex flex-col items-center">
                                <h3 className="mb-2 text-xl font-bold">
                                    DISCOUNT
                                </h3>
                                <button className="bg-gradient-custom px-14 text-lg py-3 rounded-full font-bold shadow-lg">
                                    (25.000)
                                </button>
                            </div>
                            <div className="flex flex-col items-center">
                                <h3 className="mb-2 text-xl font-bold">
                                    TOTAL
                                </h3>
                                <button className="bg-gradient-custom px-14 text-lg py-3 rounded-full font-bold shadow-lg">
                                    445.000
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Buyer Info Section */}
                <div className="relative text-center mb-12">
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
                    <h1 className="relative text-3xl sm:text-[40px] pt-10 font-custom font-bold text-black z-10">
                        Buyer Info
                    </h1>
                </div>

                {/* Buyer Forms */}
                <div className="mx-auto p-4 flex flex-wrap gap-4">
                    {selectedTickets.map((ticket) => (
                        <BuyerForm key={ticket.id} ticket={ticket} />
                    ))}
                </div>

                {/* Form Payment Method Section */}
                <div className="w-full lg:w-1/3 bg-[rgb(21,44,103)] text-white rounded-lg shadow-md sticky top-0 ml-4">
                    <div className="bg-gradient-custom py-1.5 rounded-t-lg">
                        <h2 className="text-2xl font-bold text-center text-white">
                            Payment Method
                        </h2>
                    </div>
                    <form className="px-6 pt-5">
                        <div className="mb-4">
                            <input
                                type="radio"
                                id="virtual-accounts"
                                name="payment-method"
                                value="virtual-accounts"
                            />
                            <label htmlFor="virtual-accounts" className="ml-2">
                                Virtual Accounts
                            </label>
                        </div>
                        <div className="mb-4">
                            <input
                                type="radio"
                                id="credit-debit"
                                name="payment-method"
                                value="credit-debit"
                            />
                            <label htmlFor="credit-debit" className="ml-2">
                                Credit/Debit Card
                            </label>
                        </div>
                        <div className="mb-4">
                            <input
                                type="radio"
                                id="e-wallets"
                                name="payment-method"
                                value="e-wallets"
                            />
                            <label htmlFor="e-wallets" className="ml-2">
                                E-Wallets
                            </label>
                        </div>
                        <div className="mb-4">
                            <input
                                type="radio"
                                id="qris"
                                name="payment-method"
                                value="qris"
                            />
                            <label htmlFor="qris" className="ml-2">
                                QRIS
                            </label>
                        </div>
                        <div className="mb-4">
                            <input
                                type="radio"
                                id="direct-debit"
                                name="payment-method"
                                value="direct-debit"
                            />
                            <label htmlFor="direct-debit" className="ml-2">
                                Direct Debit
                            </label>
                        </div>
                        <div className="mb-4">
                            <input
                                type="radio"
                                id="paylater"
                                name="payment-method"
                                value="paylater"
                            />
                            <label htmlFor="paylater" className="ml-2">
                                Paylater
                            </label>
                        </div>
                    </form>
                </div>

                {/* Continue Payment Button */}
                <div className="mt-8 flex justify-end mr-4 sm:mr-16">
                    <button
                        onClick={handleSubmit}
                        className="bg-gradient-custom font-bold font-customText text-lg sm:text-2xl rounded-[20px] text-white py-2 px-7"
                    >
                        Continue Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TicketPage;
