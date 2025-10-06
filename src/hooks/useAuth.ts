type AuthData = {
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  phone: string;
  access: string;
  refresh: string;
  joined_at: string;
  organization_name: string;
  category: string;
  dob: string;
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
          role: parsed.role, 
          first_name: parsed.first_name,
          last_name: parsed.last_name,
          phone: parsed.phone, 
          joined_at: parsed.joined_at,
          category: parsed.category,
          organization_name: parsed.organization_name,
          dob: parsed.dob
        };
      }
    } catch (err) {
      console.error("Failed to parse authData", err);
    }
  }
  return { isAuthenticated, token, user };
};
