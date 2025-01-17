export function formatLongDate(date) {
    // Format the created_on date
    const createdDate = new Date(date);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    return createdDate.toLocaleString(undefined, options);
}

export function formatShortDate(rawDate) {
    // Parse the date string into a JavaScript Date object
    const date = new Date(rawDate.replace(" ", "T"));

    // Format the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Return the reformatted date and time string with seconds
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
