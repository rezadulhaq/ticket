import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Tickets = () => {
    const navigate = useNavigate();
    const [ticketTypes, setTicketTypes] = useState([]);
    const [ticketCounts, setTicketCounts] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/category");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setTicketTypes(data); 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleIncrease = (id) => {
        setTicketCounts((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    const handleDecrease = (id) => {
        setTicketCounts((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 0) - 1, 0),
        }));
    };

    return (
        <div className="sm:bg-desktopTicket bg-mobileTicket w-full h-auto bg-center bg-repeat bg-cover p-4 sm:p-8">
            <div className="max-w-4xl mx-auto flex flex-col">
                <div className="relative mb-8 text-center">
                    <div
                        className="absolute inset-0 flex items-center justify-center z-0"
                        style={{
                            backgroundImage:
                                "url('https://ik.imagekit.io/x6p94nrv0m/scroll-01%202.png?updatedAt=1720551838052')",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            height: "100px",
                        }}
                    ></div>
                    <h1 className="relative font-custom text-4xl pt-8 font-bold text-black z-12">
                        Tickets
                    </h1>
                </div>

                {ticketTypes.map((category) => (
                    <div className="mb-8 mt-10" key={category.id}>
                        <h2 className="text-2xl sm:text-[40px] font-bold mb-4 text-center font-custom text-white">
                            {category.name}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {category.TicketPrices.map((ticket) => (
                                <div
                                    className={`${ticket.color} py-4 rounded-lg text-black`}
                                    key={ticket.id}
                                >
                                    <h3 className="text-base sm:text-lg font-bold px-4 ">
                                        {ticket.Ticket.name}
                                    </h3>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="font-bold bg-white px-3 sm:px-5 rounded-r-full">
                                            {ticket.price.toLocaleString(
                                                "id-ID",
                                                {
                                                    style: "currency",
                                                    currency: "IDR",
                                                }
                                            )}
                                        </span>
                                        <div className="flex items-center pr-4">
                                            <button
                                                onClick={() =>
                                                    handleDecrease(ticket.id)
                                                }
                                                className="bg-white shadow-lg text-black py-1 px-2 sm:px-3 font-extrabold rounded-full"
                                            >
                                                -
                                            </button>
                                            <span className="mx-2">
                                                {ticketCounts[ticket.id] || 0}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    handleIncrease(ticket.id)
                                                }
                                                className="text-black bg-white font-extrabold py-1 px-2 sm:px-3 rounded-full"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate("/ticket-page")}
                        className="bg-gradient-custom sm:px-40 px-8 text-lg py-3 rounded-full font-bold shadow-lg text-white"
                    >
                        Buy Tickets
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tickets;
