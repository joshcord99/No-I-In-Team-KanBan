import { TicketData } from "../interfaces/TicketData";
import { ApiMessage } from "../interfaces/ApiMessage";
import Auth from "../utils/auth";

const retrieveTickets = async () => {
  try {
    const response = await fetch("/api/tickets/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to retrieve tickets");
    }

    return data;
  } catch (err) {
    console.error("Error from data retrieval: ", err);
    return [];
  }
};

const retrieveTicket = async (id: number | null): Promise<TicketData> => {
  try {
    const response = await fetch(`/api/tickets/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not fetch ticket");
    }
    return data;
  } catch (err) {
    console.error("Error from data retrieval: ", err);
    return Promise.reject("Could not fetch singular ticket");
  }
};

const createTicket = async (body: TicketData) => {
  try {
    const response = await fetch("/api/tickets/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create ticket");
    }

    return data;
  } catch (err) {
    console.error("Error from Ticket Creation: ", err);
    return Promise.reject("Could not create ticket");
  }
};

const updateTicket = async (
  ticketId: number,
  body: TicketData
): Promise<TicketData> => {
  try {
    const response = await fetch(`/api/tickets/${ticketId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update ticket");
    }

    return data;
  } catch (err) {
    console.error("Update did not work", err);
    return Promise.reject("Update did not work");
  }
};

const deleteTicket = async (ticketId: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(`/api/tickets/${ticketId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete ticket");
    }

    return data;
  } catch (err) {
    console.error("Error in deleting ticket", err);
    return Promise.reject("Could not delete ticket");
  }
};

export {
  createTicket,
  deleteTicket,
  retrieveTickets,
  retrieveTicket,
  updateTicket,
};
