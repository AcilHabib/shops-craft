interface User {
  fullName: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  message: string;
  user: { id: string; email: string };
}

export const createUser = async (user: User): Promise<CreateUserResponse> => {
  // Optional input validation:
  if (!user.fullName || !user.email || !user.password) {
    throw new Error("All fields (fullName, email, password) are required");
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: user.fullName,
          email: user.email,
          password: user.password,
        }),
      }
    );

    if (!res.ok) {
      const errBody = await res.json().catch(() => null);
      throw new Error(errBody?.error || "Cannot create user");
    }

    const data: CreateUserResponse = await res.json();

    if (!data.user?.email) {
      throw new Error("Invalid response from server");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      // Rethrow so the caller can handle/display it
      throw new Error(`createUser failed: ${error.message}`);
    }
    throw new Error("Unknown error in createUser");
  }
};

export async function login(email: string, password: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }

    return data;
  } catch (error: any) {
    console.error("Login error:", error.message);
    throw error;
  }
}
