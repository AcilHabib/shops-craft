interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  adress: {
    state: string;
    city: string;
    address: string;
    appartment: string;
    zipCode: string;
    // country: string;
  };
}

export async function addCustomer(customerData: CustomerData) {
  try {
    const payload = {
      firstName: customerData.firstName,
      lastName: customerData.lastName,
      email: customerData.email,
      phone: customerData.phone,
      password: customerData.password,
      adress: {
        state: customerData.adress.state || "",
        city: customerData.adress.city || "",
        address: customerData.adress.address || "",
        appartment: customerData.adress.appartment || "",
        zipCode: customerData.adress.zipCode || "",
        // country: customerData.adress.country || "",
      },
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to add customer");

    return result;
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error;
  }
}

export async function getCustomers() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customer`);
    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Failed to fetch customers");

    return result.customers;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
}
