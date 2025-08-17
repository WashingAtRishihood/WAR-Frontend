import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTshirt, FaCalendarAlt } from "react-icons/fa";
import Navbar from "./components/Navbar";
import logo from "../../assets/rishihood-logo.webp";

function WashermanDashboard() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [washermanData, setWashermanData] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    const washermanDataStr = localStorage.getItem('washermanData');
    
    if (!isLoggedIn || userType !== 'washerman' || !washermanDataStr) {
      navigate('/washerman/login');
      return;
    }

    try {
      const washerman = JSON.parse(washermanDataStr);
      setWashermanData(washerman);
      fetchOrders();
    } catch (error) {
      console.error('Error parsing washerman data:', error);
      navigate('/washerman/login');
    }
  }, [navigate]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/orders/all/');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        setError("Failed to fetch orders");
      }
    } catch (error) {
      setError("Network error while fetching orders");
      console.error('Orders fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/orders/${orderId}/status/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus
        })
      });

      if (response.ok) {
        // Refresh orders after successful update
        fetchOrders();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to update order status");
      }
    } catch (error) {
      setError("Network error while updating order status");
      console.error('Status update error:', error);
    }
  };

  const handleReceived = (orderId) => {
    handleStatusUpdate(orderId, 'inprogress');
  };

  const handleReady = (orderId) => {
    handleStatusUpdate(orderId, 'complete');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'inprogress':
        return 'text-orange-600 bg-orange-100';
      case 'complete':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'inprogress':
        return 'In Progress';
      case 'complete':
        return 'Completed';
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const filteredOrders = orders.filter((order) => {
    const matchesTab = selectedTab === "all" || 
                      (selectedTab === "pending" && order.status === "pending") ||
                      (selectedTab === "inprogress" && order.status === "inprogress") ||
                      (selectedTab === "complete" && order.status === "complete");
    const matchesSearch = order.bag_no.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (!washermanData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf6f3]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a30c34]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf6f3] pt-20">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 font-['Playfair_Display']">
        <h1 className="text-3xl font-bold text-center mb-6">Students Orders</h1>

        {/* Error Message */}
        {error && (
          <div className="mb-6 w-full bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-center font-medium">
              {error}
            </p>
          </div>
        )}

        {/* Tabs + Search */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex border rounded-lg overflow-hidden">
            <button
              className={`px-4 py-2 font-semibold ${selectedTab === "all" ? "bg-[#a30c34] text-white" : "bg-white"
                }`}
              onClick={() => setSelectedTab("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 font-semibold ${selectedTab === "pending" ? "bg-[#a30c34] text-white" : "bg-white"
                }`}
              onClick={() => setSelectedTab("pending")}
            >
              Pending
            </button>
            <button
              className={`px-4 py-2 font-semibold ${selectedTab === "inprogress" ? "bg-[#a30c34] text-white" : "bg-white"
                }`}
              onClick={() => setSelectedTab("inprogress")}
            >
              In Progress
            </button>
            <button
              className={`px-4 py-2 font-semibold ${selectedTab === "complete" ? "bg-[#a30c34] text-white" : "bg-white"
                }`}
              onClick={() => setSelectedTab("complete")}
            >
              Complete
            </button>
          </div>
          <input
            type="text"
            placeholder="🔍 Search Bag Number"
            className="flex-1 border rounded-lg px-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a30c34] mx-auto mb-4"></div>
            <p className="text-gray-500 text-lg">Loading orders...</p>
          </div>
        )}

        {/* Order Cards */}
        {!loading && (
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No orders found.</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex justify-between items-center bg-[#fff9f0] shadow-sm rounded-xl p-4 border transition-transform transform hover:scale-[1.02] hover:shadow-md"
                >
                  <div>
                    <p className="font-semibold text-lg">
                      Order #{order.id} - Bag No: <span className="text-red-700">{order.bag_no}</span>
                    </p>
                    <p className="text-gray-700 flex items-center gap-2">
                      <FaTshirt className="text-gray-500" /> Clothes: {order.number_of_clothes}
                    </p>
                    <p className="text-gray-700 flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-500" /> Date:{" "}
                      <span className="text-red-600">{formatDate(order.submission_date)}</span>
                    </p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    {order.status === 'pending' && (
                      <button
                        className="bg-green-600 text-white px-4 sm:px-4 py-1 sm:py-1 rounded-lg hover:bg-green-700 text-sm sm:text-base"
                        onClick={() => handleReceived(order.id)}
                      >
                        Mark as Received
                      </button>
                    )}
                    {order.status === 'inprogress' && (
                      <button
                        className="bg-blue-600 text-white px-3 sm:px-4 py-1 sm:py-1 rounded-lg hover:bg-blue-700 text-xs sm:text-base"
                        onClick={() => handleReady(order.id)}
                      >
                        Mark as Ready
                      </button>
                    )}
                    {order.status === 'complete' && (
                      <span className="text-green-700 font-semibold">Ready for Pickup</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default WashermanDashboard;
