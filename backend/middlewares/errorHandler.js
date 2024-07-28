function handleError(error, req, res, next) {
    let msg = "Internal Server Error";
    let status = 500;

    // Mengidentifikasi kesalahan berdasarkan jenisnya
    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400;
            msg = error.errors[0]?.message || "Validation error";
            break;
        case "EmailRequired":
            status = 400;
            msg = "Email required";
            break;
        case "PasswordRequired":
            status = 400;
            msg = "Password required";
            break;
        case "createImagesFailed":
            status = 400;
            msg = "Failed to create images";
            break;
        case "InvalidCredentials":
            status = 401;
            msg = "Invalid username, email, or password";
            break;
        case "Unauthenticated":
        case "JsonWebTokenError":
            status = 401;
            msg = "Authentication required";
            break;
        case "Forbidden":
            status = 403;
            msg = "Access denied";
            break;
        case "errorNotFound":
            status = 404;
            msg = "Resource not found";
            break;
        default:
            msg = error.message || msg;
            break;
    }

    if (process.env.NODE_ENV === "development") {
        console.error(error.stack);
    }

    res.status(status).json({
        message: msg,
        ...(process.env.NODE_ENV === "development" && { error: error.stack }),
    });
}

module.exports = handleError;
