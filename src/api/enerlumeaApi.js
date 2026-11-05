const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/$/, "");

async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        Accept: "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error("Could not reach the API. Start the Spring Boot server and try again.");
  }

  if (response.status === 204) return null;

  const contentType = response.headers.get("content-type") || "";
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(body?.detail || body?.message || `Request failed (${response.status}).`);
  }

  if (!contentType.includes("application/json")) {
    throw new Error("The API returned an unexpected response. Check its URL and proxy configuration.");
  }

  return body;
}

function jsonBody(data) {
  return JSON.stringify(data);
}

export const listEnergyRecords = () => request("/energy-records");
export const createEnergyRecord = (record) => request("/energy-records", {
  method: "POST",
  body: jsonBody(record),
});
export const updateEnergyRecord = (id, record) => request(`/energy-records/${id}`, {
  method: "PUT",
  body: jsonBody(record),
});
export const deleteEnergyRecord = (id) => request(`/energy-records/${id}`, {
  method: "DELETE",
});

export const listAppliances = () => request("/appliances");
export const createAppliance = (appliance) => request("/appliances", {
  method: "POST",
  body: jsonBody(appliance),
});
export const updateAppliance = (id, appliance) => request(`/appliances/${id}`, {
  method: "PUT",
  body: jsonBody(appliance),
});
export const deleteAppliance = (id) => request(`/appliances/${id}`, {
  method: "DELETE",
});

export const submitContactMessage = (message) => request("/contact-messages", {
  method: "POST",
  body: jsonBody(message),
});
