// api.js
const API_BASE_URL = 'http://localhost/custom-sites/gipl_backend/api.php'; // Replace with your actual domain

export const fetchCompanyData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}?action=company_data`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching company data:', error);
    return null;
  }
};

export const fetchServices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}?action=services`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

export const fetchServiceRoles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}?action=service_roles`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching service roles:', error);
    return [];
  }
};