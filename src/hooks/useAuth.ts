type AuthData = {
  email: string;
  role: string;
  access: string;
  refresh: string;
};

export const useAuth = () => {
  const stored = localStorage.getItem("authData");

  let isAuthenticated = false;
  let user: Partial<AuthData> = {};
  let token: string | null = null;

  if (stored) {
    try {
      const parsed: AuthData = JSON.parse(stored);
      token = parsed.access;
      if (token) {
        isAuthenticated = true;
        user = {
          email: parsed.email,
          role: parsed.role
        };
      }
    } catch (err) {
      console.error("Failed to parse authData", err);
    }
  }
  return { isAuthenticated, token, user };
};
