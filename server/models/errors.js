class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

const statusCodes = {
    // ✅ Success
    OK: 200,                      // Successful GET/UPDATE
    CREATED: 201,                 // New user/post/session created
    NO_CONTENT: 204,              // Successfully deleted, nothing to return

    // 🔁 Redirects (rarely used in API)
    NOT_MODIFIED: 304,

    // ❌ Client Errors
    BAD_REQUEST: 400,             // Invalid input, missing fields, malformed body
    UNAUTHORIZED: 401,           // Missing or invalid JWT
    FORBIDDEN: 403,              // Valid JWT, but trying to access another user's data
    NOT_FOUND: 404,              // User/post/session not found

    // 💥 Server Errors
    INTERNAL_SERVER_ERROR: 500,  // Catch-all for unexpected backend issues
    SERVICE_UNAVAILABLE: 503,    // External service (e.g. Supabase) failed
};

module.exports = {
    CustomError,
    statusCodes,
};
