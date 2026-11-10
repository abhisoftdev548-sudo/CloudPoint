
/**
 * Centralized logger for the entire CloudPoint backend.
 * Each log level has its own color and timestamp.
 */

// Define terminal colors in one place.
const colors = {
    reset: "\x1b[0m",   // Reset terminal color.
    red: "\x1b[31m",    // Red for errors.
    green: "\x1b[32m",  // Green for successful operations.
    yellow: "\x1b[33m", // Yellow for warnings.
    blue: "\x1b[34m",   // Blue for information.
    cyan: "\x1b[36m",   // Cyan for debugging.
    gray: "\x1b[90m",   // Gray for timestamps.
};

// Return the current time in a readable format.
const getTimestamp = (): string => {
    return new Date().toLocaleTimeString();
};

// Print a message with its label, color and timestamp.
const printLog = (
    level: string,
    color: string,
    message: string
): void => {
    const timestamp = getTimestamp();

    console.log(
        `${color}[${level}]${colors.reset} ` +
        `${colors.gray}[${timestamp}]${colors.reset} ` +
        `${message}`
    );
};

// Export reusable logging methods.
export const logger = {

    // Print successful operations in green.
    success: (message: string): void => {
        printLog("SUCCESS", colors.green, message);
    },

    // Print general information in blue.
    info: (message: string): void => {
        printLog("INFO", colors.blue, message);
    },

    // Print warnings in yellow.
    warn: (message: string): void => {
        printLog("WARNING", colors.yellow, message);
    },

    // Print errors in red.
    error: (message: string): void => {
        printLog("ERROR", colors.red, message);
    },

    // Print debugging information in cyan.
    debug: (message: string): void => {
        printLog("DEBUG", colors.cyan, message);
    },
};
