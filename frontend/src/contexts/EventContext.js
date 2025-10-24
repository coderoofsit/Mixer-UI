import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../services/apiService";

const EventContext = createContext();

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
  });

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchEvents = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.get('/api/v1/events', {
        params: {
          page,
        },
      });

      if (response.data.success) {
        setEvents(response.data.data.events);
        setPagination(response.data.data.pagination);
      } else {
        setError("Failed to fetch events");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch events");
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshEvents = () => {
    fetchEvents(pagination.current);
  };

  const value = {
    events,
    loading,
    error,
    pagination,
    fetchEvents,
    refreshEvents,
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};
