import { useEffect, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { JwtPayload, jwtDecode } from "jwt-decode";

import { retrieveTickets, deleteTicket } from "../api/ticketAPI";
import ErrorPage from "./ErrorPage";
import Swimlane from "../components/Swimlane";
import { TicketData } from "../interfaces/TicketData";
import { ApiMessage } from "../interfaces/ApiMessage";

import auth from "../utils/auth";

const boardStates = ["Todo", "In Progress", "Done"];

const DashboardPage = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");

  const checkLogin = () => {
    const isLoggedIn = auth.loggedIn();

    if (isLoggedIn) {
      try {
        const token = auth.getToken();
        const decoded = jwtDecode<JwtPayload>(token);
        if (decoded && typeof decoded === "object" && "username" in decoded) {
          setUsername(decoded.username as string);
        }
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }
  };

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      setTickets(data);
    } catch (err) {
      console.error("Failed to retrieve tickets:", err);
      setError(true);
    }
  };

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      fetchTickets();
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    const handleAuthChange = () => {
      checkLogin();
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  useEffect(() => {
    if (auth.loggedIn()) {
      fetchTickets();
    }
  }, []);

  if (error) {
    return <ErrorPage />;
  }

  if (!auth.loggedIn()) {
    return <ErrorPage />;
  }

  return (
    <div className="board">
      <div className="welcome-message">
        <h2>Welcome, {username}!</h2>
      </div>
      <div className="board-display">
        {boardStates.map((status) => {
          const filteredTickets = tickets.filter(
            (ticket) => ticket.status === status
          );
          return (
            <Swimlane
              title={status}
              key={status}
              tickets={filteredTickets}
              deleteTicket={deleteIndvTicket}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DashboardPage;
