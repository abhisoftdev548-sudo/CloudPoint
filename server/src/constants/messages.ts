export const MESSAGES = {
  AUTH: {
    UNAUTHORIZED: "Unauthorized access",
    TOKEN_EXPIRED: "Your session has expired",
    INVALID_CREDENTIALS: "Invalid credentials",
  },

  SERVER: {
    INTERNAL_ERROR: "Internal server error",
    SERVICE_UNAVAILABLE: "Service unavailable",
  },

  VPS: {
    CREATED: "VPS created successfully",
    FETCHED: "VPS fetched successfully",
    DELETED: "VPS deleted successfully",
  },
} as const;
