// Initialize the tickets array and load from localStorage
let tickets = JSON.parse(localStorage.getItem('tickets')) || [];

// Function to change the ticket status by the username and ticket number
function changeTicketStatusByName(ticketIdentifier, newStatus) {
    const [username, ticketNumber] = ticketIdentifier.split('-');
    const ticket = tickets.find(t => t.username === username && t.ticketNumber === parseInt(ticketNumber));

    if (ticket) {
        ticket.status = newStatus;
        localStorage.setItem('tickets', JSON.stringify(tickets));
        loadTicketList();
    } else {
        console.log("Ticket not found.");
    }
}

// Function to convert file to base64
function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

// Create a ticket when the form is submitted
document.getElementById('ticketForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('ticketUsername').value;
    const loggedInUsername = getLoggedInUsername();

    // Check if the logged-in username matches the username in the ticket form
    if (username !== loggedInUsername) {
        alert("You cannot submit a ticket under a different username.");
        return;
    }

    const subject = document.getElementById('ticketSubject').value;
    const message = document.getElementById('ticketMessage').value;
    const screenshotFile = document.getElementById('ticketScreenshot').files[0];
    let screenshotBase64 = null;

    if (screenshotFile) {
        screenshotBase64 = await toBase64(screenshotFile);
    }

    // Determine the next ticket number for the logged-in user
    const userTickets = tickets.filter(ticket => ticket.username === loggedInUsername);
    const nextTicketNumber = userTickets.length > 0 ? Math.max(...userTickets.map(ticket => ticket.ticketNumber)) + 1 : 1;

    const newTicket = {
        ticketNumber: nextTicketNumber, // Use the next available ticket number for the user
        username,
        subject,
        message,
        status: 'Under Review', // Default status when the ticket is created
        screenshot: screenshotBase64
    };

    tickets.push(newTicket); // Save the new ticket
    localStorage.setItem('tickets', JSON.stringify(tickets)); // Update localStorage
    loadTicketList(); // Reload ticket list after adding the new ticket
});

// Function to display all tickets for the logged-in user
function loadTicketList() {
    const loggedInUsername = getLoggedInUsername();
    if (!loggedInUsername) {
        alert("You must be logged in to view your tickets.");
        return;
    }

    // Filter tickets to only show those for the logged-in user
    const ticketListContainer = document.getElementById('ticketList');
    ticketListContainer.innerHTML = '';

    const userTickets = tickets.filter(ticket => ticket.username === loggedInUsername);

    userTickets.forEach(ticket => {
        const ticketDiv = document.createElement('div');
        ticketDiv.className = `ticket ${ticket.status.toLowerCase().replace(' ', '-')}`;

        // Set the background color based on the status
        switch (ticket.status) {
            case 'Resolved':
                ticketDiv.style.backgroundColor = '#28a745'; // Green for Resolved
                break;
            case 'Under Review':
                ticketDiv.style.backgroundColor = '#ff9800'; // Orange for Under Review
                break;
            case 'Pending':
                ticketDiv.style.backgroundColor = '#f1c40f'; // Yellow for Pending
                break;
            default:
                ticketDiv.style.backgroundColor = '#e74c3c'; // Red for any default or unknown status
                break;
        }

        ticketDiv.innerHTML = `
            <p class="ticketmes"><strong>Ticket #${ticket.ticketNumber}</strong></p>
            <p class="ticketmes"><strong>Subject:</strong> ${ticket.subject}</p>
            <p class="ticketmes"><strong>Message:</strong> <br> ${ticket.message}</p>
            ${ticket.screenshot ? `<p class="ticketmes"><strong>Screenshot:</strong> <br><img src="${ticket.screenshot}" width="100px"></p>` : ''}
            <p class="ticketmes"><strong>Status:</strong> <span id="ticketStatus${ticket.ticketNumber}">${ticket.status}</span></p>
            <button class="delete-ticket" onclick="deleteTicket(${ticket.ticketNumber})">Delete Ticket</button>
        `;

        ticketListContainer.appendChild(ticketDiv);
    });
}

// Function to delete a ticket for the logged-in user
function deleteTicket(ticketNumber) {
    const loggedInUsername = getLoggedInUsername();

    // Filter tickets to remove the one with the specific ticketNumber for the logged-in user
    tickets = tickets.filter(t => t.ticketNumber !== ticketNumber || t.username !== loggedInUsername);
    localStorage.setItem('tickets', JSON.stringify(tickets));
    loadTicketList(); // Reload ticket list after deletion
}

// Function to check if the user is logged in
function getLoggedInUsername() {
    const loggedInUsername = localStorage.getItem('loggedInUsername');
    return loggedInUsername;
}

// Set the ticket username field to the logged-in username
window.onload = function() {
    const loggedInUsername = getLoggedInUsername();
    if (!loggedInUsername) {
        alert("You must log in first.");
        window.location.href = "login.html"; // Redirect to login if no user is logged in
        return;
    }

    document.getElementById('ticketUsername').value = loggedInUsername; // Set username in input field
    loadTicketList(); // Load the ticket list for the logged-in user

    // Display the general support reply with the logged-in username
    showGeneralSupportReply();
};

// Function to display the general support reply (only accessible by JavaScript)
function showGeneralSupportReply() {
    const loggedInUsername = getLoggedInUsername(); // Get the logged-in username

    if (!loggedInUsername) {
        alert("You must be logged in to view the support reply.");
        return;
    }

    // Create the support reply section
    const supportReplySection = document.createElement('div');
    supportReplySection.className = 'support-reply';

    // Define the general support reply content with the logged-in username
    const supportReplyText1 = `<span class='notificationrep' > Notification0:</span> <br>Mr. ${loggedInUsername}, No Replies for you.`;

    // Add the support reply content (text) directly to the section
    supportReplySection.innerHTML = `
        <p class="notificationpar" id="generalSupportReply">${supportReplyText1}</p>
    `;

    // Append the support reply section to the page
    document.getElementById('supportReplyContainer').appendChild(supportReplySection);
}

// Example to change ticket status (this is just an example, you can trigger this with a button or event)
changeTicketStatusByName("johnDoe-1", "Resolved");
changeTicketStatusByName("johnDoe-3", "Resolved");
changeTicketStatusByName("Khaledy-1", "Resolved");
changeTicketStatusByName("Khaledy-3", "Resolved");
