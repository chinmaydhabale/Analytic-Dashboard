import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_HOSTNAME;

axios.defaults.withCredentials = true;

export const getSalesOverTime = async () => {
    return axios.get(`${API_BASE_URL}/sales-over-time`);
};

export const getSGROverTime = async () => {
    return axios.get(`${API_BASE_URL}/total-growth-over-time`);
};

export const getNewCustomers = async () => {
    return axios.get(`${API_BASE_URL}/new-customers`);
};

export const getRepeatCustomers = async () => {
    return axios.get(`${API_BASE_URL}/repeat-customers`);
};

export const getGeographicalDistribution = async () => {
    return axios.get(`${API_BASE_URL}/geographical-distribution`);
};

export const getCLVByCohorts = async () => {
    return axios.get(`${API_BASE_URL}/clv-by-cohorts`);
};
