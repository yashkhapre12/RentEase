import axios from "axios";

// Create Axios instances for each microservice

// Auth Service (Port 8112)
export const authApi = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// CRUD Service (Port 8113) - Handles Properties, Areas, Chats
export const crudApi = axios.create({
    baseURL: import.meta.env.VITE_CRUD_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Transaction Service (Port 9114) - Handles Shortlisting
export const transactionApi = axios.create({
    baseURL: import.meta.env.VITE_TRANSACTION_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
