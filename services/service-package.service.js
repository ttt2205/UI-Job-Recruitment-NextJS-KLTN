import axiosClient from "./axiosClient";

const API_BASE = process.env.NEXT_PUBLIC_API_BACKEND_SUBSCRIPTION || "/api/v1";

// ==================== EMPLOYER SUBSCRIPTION APIs ====================

// Get all employer packages (Public)
export const getEmployerPackages = async () => {
    try {
        const res = await axiosClient.get(`${API_BASE}/employer/subscriptions/packages`);
        return res;
    } catch (error) {
        console.error("Error fetching employer packages:", error);
        throw error;
    }
};

// Get employer package by ID (Public)
export const getEmployerPackageById = async (packageId) => {
    try {
        const res = await axiosClient.get(`${API_BASE}/employer/subscriptions/packages/${packageId}`);
        return res;
    } catch (error) {
        console.error(`Error fetching employer package ${packageId}:`, error);
        throw error;
    }
};

// Create employer package (Admin only)
export const createEmployerPackage = async (data) => {
    try {
        const res = await axiosClient.post(`${API_BASE}/employer/subscriptions/packages`, data);
        return res;
    } catch (error) {
        console.error("Error creating employer package:", error);
        throw error;
    }
};

// Purchase employer package
export const purchaseEmployerPackage = async (packageId) => {
    try {
        const res = await axiosClient.post(`${API_BASE}/employer/subscriptions/purchase`, {
            packageId
        });
        return res;
    } catch (error) {
        console.error("Error purchasing employer package:", error);
        throw error;
    }
};

// Get active employer subscription
export const getActiveEmployerSubscription = async () => {
    try {
        const res = await axiosClient.get(`${API_BASE}/employer/subscriptions/active`);
        return res;
    } catch (error) {
        console.error("Error fetching active subscription:", error);
        throw error;
    }
};

// Get employer subscription history
export const getEmployerSubscriptionHistory = async () => {
    try {
        const res = await axiosClient.get(`${API_BASE}/employer/subscriptions/history`);
        return res;
    } catch (error) {
        console.error("Error fetching subscription history:", error);
        throw error;
    }
};

// Check employer usage status
export const checkEmployerUsage = async () => {
    try {
        const res = await axiosClient.get(`${API_BASE}/employer/subscriptions/usage`);
        return res;
    } catch (error) {
        console.error("Error checking usage:", error);
        throw error;
    }
};

// Calculate upgrade cost for employer
export const calculateEmployerUpgrade = async (newPackageId) => {
    try {
        const res = await axiosClient.post(`${API_BASE}/employer/subscriptions/calculate-upgrade`, {
            newPackageId
        });
        return res;
    } catch (error) {
        console.error("Error calculating upgrade:", error);
        throw error;
    }
};

// Upgrade employer subscription
export const upgradeEmployerSubscription = async (newPackageId) => {
    try {
        const res = await axiosClient.post(`${API_BASE}/employer/subscriptions/upgrade`, {
            newPackageId
        });
        return res;
    } catch (error) {
        console.error("Error upgrading subscription:", error);
        throw error;
    }
};

// Create add-on package (Admin only)
export const createEmployerAddOn = async (data) => {
    try {
        const res = await axiosClient.post(`${API_BASE}/employer/subscriptions/addons`, data);
        return res;
    } catch (error) {
        console.error("Error creating add-on:", error);
        throw error;
    }
};

// Purchase add-on
export const purchaseEmployerAddOn = async (addOnId) => {
    try {
        const res = await axiosClient.post(`${API_BASE}/employer/subscriptions/addons/${addOnId}/purchase`);
        return res;
    } catch (error) {
        console.error("Error purchasing add-on:", error);
        throw error;
    }
};

// ==================== CANDIDATE SUBSCRIPTION APIs ====================

// Get all candidate packages (Public)
export const getCandidatePackages = async () => {
    try {
        const res = await axiosClient.get(`${API_BASE}/candidate/subscriptions/packages`);
        return res;
    } catch (error) {
        console.error("Error fetching candidate packages:", error);
        throw error;
    }
};

// Get candidate package by ID (Public)
export const getCandidatePackageById = async (packageId) => {
    try {
        const res = await axiosClient.get(`${API_BASE}/candidate/subscriptions/packages/${packageId}`);
        return res;
    } catch (error) {
        console.error(`Error fetching candidate package ${packageId}:`, error);
        throw error;
    }
};

// Create candidate package (Admin only)
export const createCandidatePackage = async (data) => {
    try {
        const res = await axiosClient.post(`${API_BASE}/candidate/subscriptions/packages`, data);
        return res;
    } catch (error) {
        console.error("Error creating candidate package:", error);
        throw error;
    }
};

// Purchase candidate package
export const purchaseCandidatePackage = async (packageId) => {
    try {
        const res = await axiosClient.post(`${API_BASE}/candidate/subscriptions/purchase`, {
            packageId
        });
        return res;
    } catch (error) {
        console.error("Error purchasing candidate package:", error);
        throw error;
    }
};

// Get active candidate subscription
export const getActiveCandidateSubscription = async () => {
    try {
        const res = await axiosClient.get(`${API_BASE}/candidate/subscriptions/active`);
        return res;
    } catch (error) {
        console.error("Error fetching active subscription:", error);
        throw error;
    }
};

// Get candidate subscription history
export const getCandidateSubscriptionHistory = async () => {
    try {
        const res = await axiosClient.get(`${API_BASE}/candidate/subscriptions/history`);
        return res;
    } catch (error) {
        console.error("Error fetching subscription history:", error);
        throw error;
    }
};

// Check candidate usage status
export const checkCandidateUsage = async () => {
    try {
        const res = await axiosClient.get(`${API_BASE}/candidate/subscriptions/usage`);
        return res;
    } catch (error) {
        console.error("Error checking usage:", error);
        throw error;
    }
};

// Check if can view other candidates
export const checkCanViewOthers = async () => {
    try {
        const res = await axiosClient.get(`${API_BASE}/candidate/subscriptions/can-view-others`);
        return res;
    } catch (error) {
        console.error("Error checking view permission:", error);
        throw error;
    }
};

// Calculate upgrade cost for candidate
export const calculateCandidateUpgrade = async (newPackageId) => {
    try {
        const res = await axiosClient.post(`${API_BASE}/candidate/subscriptions/calculate-upgrade`, {
            newPackageId
        });
        return res;
    } catch (error) {
        console.error("Error calculating upgrade:", error);
        throw error;
    }
};

// Upgrade candidate subscription
export const upgradeCandidateSubscription = async (newPackageId) => {
    try {
        const res = await axiosClient.post(`${API_BASE}/candidate/subscriptions/upgrade`, {
            newPackageId
        });
        return res;
    } catch (error) {
        console.error("Error upgrading subscription:", error);
        throw error;
    }
};

// ==================== ADMIN APIs (for management) ====================

// Get all employer add-ons (for admin display)
export const getEmployerAddOns = async () => {
    try {
        // This endpoint might not exist in the doc, so we'll handle it gracefully
        const res = await axiosClient.get(`${API_BASE}/employer/subscriptions/addons`);
        return res;
    } catch (error) {
        console.error("Error fetching add-ons:", error);
        return { results: [], data: [] }; // Return empty array if endpoint doesn't exist
    }
};

// Update employer package (might need to be added to backend)
export const updateEmployerPackage = async (packageId, data) => {
    try {
        const res = await axiosClient.put(`${API_BASE}/employer/subscriptions/packages/${packageId}`, data);
        return res;
    } catch (error) {
        console.error(`Error updating employer package ${packageId}:`, error);
        throw error;
    }
};

// Update candidate package (might need to be added to backend)
export const updateCandidatePackage = async (packageId, data) => {
    try {
        const res = await axiosClient.put(`${API_BASE}/candidate/subscriptions/packages/${packageId}`, data);
        return res;
    } catch (error) {
        console.error(`Error updating candidate package ${packageId}:`, error);
        throw error;
    }
};

// Update add-on (might need to be added to backend)
export const updateEmployerAddOn = async (addOnId, data) => {
    try {
        const res = await axiosClient.put(`${API_BASE}/employer/subscriptions/addons/${addOnId}`, data);
        return res;
    } catch (error) {
        console.error(`Error updating add-on ${addOnId}:`, error);
        throw error;
    }
};