import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTshirt, FaCalendarAlt } from "react-icons/fa";
import Navbar from "./components/Navbar";
import logo from "../../assets/rishihood-logo.webp";
import config from "../../config";
import { FiSearch } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";

function WashermanDashboard() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [washermanData, setWashermanData] = useState(null);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editingCount, setEditingCount] = useState("");
  const [saving, setSaving] = useState(false);

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
      const response = await fetch(`${config.API_BASE_URL}/api/orders/all/`);
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
      const response = await fetch(`${config.API_BASE_URL}/api/orders/${orderId}/status/`, {
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

  const startEdit = (orderId, currentCount) => {
    setEditingOrderId(orderId);
    setEditingCount(String(currentCount ?? ''));
  };

  const cancelEdit = () => {
    setEditingOrderId(null);
    setEditingCount("");
  };

  const saveEdit = async () => {
    if (!editingOrderId) return;
    const parsed = parseInt(editingCount, 10);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      setError("Please enter a valid positive number of clothes");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${config.API_BASE_URL}/api/orders/${editingOrderId}/count/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number_of_clothes: parsed })
      });
      if (res.ok) {
        cancelEdit();
        fetchOrders();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update count");
      }
    } catch (e) {
      setError("Network error while updating count");
      console.error(e);
    } finally {
      setSaving(false);
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
    <div className="min-h-screen bg-[#faf6f3]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 font-['Playfair_Display']">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-900">
          Orders
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-6 w-full bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-800 text-center font-medium">{error}</p>
          </div>
        )}

        {/* Tabs + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {/* Tabs */}
          <div className="flex flex-wrap border rounded-xl overflow-hidden bg-white shadow-sm">
            {["all", "pending", "inprogress", "complete"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 font-medium text-sm sm:text-base capitalize transition-colors ${selectedTab === tab
                  ? "bg-[#a30c34] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab === "inprogress" ? "In Progress" : tab}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search Bag Number"
                className="w-full border rounded-xl pl-10 pr-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#a30c34] outline-none shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a30c34] mx-auto mb-4"></div>
            <p className="text-gray-500 text-lg">Loading orders...</p>
          </div>
        )}

        {/* Order Cards */}
        {!loading && (
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-xl shadow-sm border">
                <p className="text-gray-500 text-lg">No orders found.</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col sm:flex-row justify-between gap-4 bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition"
                >
                  {/* Order Info */}
                  <div className="space-y-2">
                    <p className="font-semibold text-lg">
                      Bag No:{" "}
                      <span className="text-[#a30c34]">{order.bag_no}</span>
                    </p>
                    <div className="text-gray-700 flex items-center gap-2 text-sm sm:text-base">
                      <FaTshirt className="text-gray-500" />
                      <span>Clothes:</span>
                      <span className="font-medium">{order.number_of_clothes}</span>
                    </div>
                    <p className="text-gray-700 flex items-center gap-2 text-sm sm:text-base">
                      <FaCalendarAlt className="text-gray-500" /> Date:{" "}
                      <span className="text-[#a30c34]">
                        {formatDate(order.submission_date)}
                      </span>
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    {order.status === "pending" && (
                      <>
                        {editingOrderId === order.id ? (
                          <div className="flex items-center gap-2">
                            <button
                              className="px-2 py-1 bg-gray-100 rounded-md border hover:bg-gray-200"
                              onClick={() => setEditingCount((c) => String(Math.max(1, (parseInt(c || '0', 10) || 0) - 1)))}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={editingCount}
                              onChange={(e) => setEditingCount(e.target.value)}
                              className="w-20 text-center border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#a30c34]"
                            />
                            <button
                              className="px-2 py-1 bg-gray-100 rounded-md border hover:bg-gray-200"
                              onClick={() => setEditingCount((c) => String((parseInt(c || '0', 10) || 0) + 1))}
                            >
                              +
                            </button>
                            <button
                              className="px-3 py-1 bg-[#a30c34] text-white rounded-md hover:bg-[#8b092d] disabled:bg-gray-400"
                              onClick={saveEdit}
                              disabled={saving}
                            >
                              {saving ? 'Saving...' : 'Save'}
                            </button>
                            <button
                              className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                              onClick={cancelEdit}
                              type="button"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm sm:text-base transition"
                            onClick={() => startEdit(order.id, order.number_of_clothes)}
                            type="button"
                          >
                            Edit Count
                          </button>
                        )}
                        <button
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm sm:text-base transition"
                          onClick={() => handleReceived(order.id)}
                        >
                          Mark as Received
                        </button>
                      </>
                    )}
                    {order.status === "inprogress" && (
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base transition"
                        onClick={() => handleReady(order.id)}
                      >
                        Mark as Ready
                      </button>
                    )}
                    {order.status === "complete" && (
                      <span className="flex items-center gap-1 text-green-700 font-semibold text-sm sm:text-base">
                        <AiOutlineCheckCircle className="w-4 h-4" />
                        Ready for Pickup
                      </span>
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
