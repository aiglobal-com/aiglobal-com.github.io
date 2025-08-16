document.addEventListener("DOMContentLoaded", function() {
    // Show the loading spinner and hide it after 3 seconds
    const loadingSpinner = document.getElementById("loadingSpinner");
    const mainContainer = document.getElementById("mainContainer");
    const body = document.body; // The body element for listening to clicks

    if (loadingSpinner) {
        // Set a timeout to hide the spinner after 3 seconds
        setTimeout(function() {
            loadingSpinner.style.display = "none";  // Hide the loading spinner
            if (mainContainer) {
                mainContainer.style.opacity = 1;  // Show the main content
            }

        }, 3000); // Hides after 3 seconds
    }
    


    // Handle sidebar menu clicks and show respective content
    const leftPanelItems = document.querySelectorAll(".left-panel li");
    
    leftPanelItems.forEach(item => {
        item.addEventListener("click", function() {
            // Remove the active class from all menu items
            leftPanelItems.forEach(i => i.classList.remove("active"));
            
            // Add the active class to the clicked item
            this.classList.add("active");

            // Hide all content sections
            const contentSections = document.querySelectorAll(".right-panel .content");
            contentSections.forEach(content => {
                content.style.display = "none";
            });

            // Show the corresponding content based on the <li> clicked
            const contentId = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            const activeContent = document.getElementById(contentId);
            if (activeContent) {
                activeContent.style.display = "block";
            }
        });
    });



    // Automatically click on "Settings" or "Wallet Address" after the page loads
    setTimeout(function() {
        // Or automatically click on the "Wallet Address" item
        const walletItem = document.querySelector("li[onclick*='choice1']");
        if (walletItem) {
            walletItem.click(); // by default click the "Dashborad" menu item
        }
    }, 500);  // Adjust the timeout as needed for when you want the automatic click to happen
});








function selectChoice1() {
    // Or automatically click on the "Wallet Address" item
    const walletItem = document.querySelector("li[onclick*='choice1']");
    if (walletItem) {
        walletItem.click(); // Programmatically click the "Settings" menu item
    }
};

function selectChoice2() {
    // Or automatically click on the "Wallet Address" item
    const walletItem = document.querySelector("li[onclick*='choice2']");
    if (walletItem) {
        walletItem.click(); // Programmatically click the "Wallet Address" menu item
    }
};
function selectChoice3() {
    // Or automatically click on the "Wallet Address" item
    const walletItem = document.querySelector("li[onclick*='choice3']");
    if (walletItem) {
        walletItem.click(); // Programmatically click the "Settings" menu item
    }
};

function selectChoice4() {
    // Or automatically click on the "Wallet Address" item
    const walletItem = document.querySelector("li[onclick*='choice4']");
    if (walletItem) {
        walletItem.click(); // Programmatically click the "Wallet Address" menu item
    }
};
function selectChoice5() {
    // Or automatically click on the "Wallet Address" item
    const walletItem = document.querySelector("li[onclick*='choice5']");
    if (walletItem) {
        walletItem.click(); // Programmatically click the "Settings" menu item
    }
};

function selectChoice6() {
    // Or automatically click on the "Wallet Address" item
    const walletItem = document.querySelector("li[onclick*='choice6']");
    if (walletItem) {
        walletItem.click(); // Programmatically click the "Wallet Address" menu item
    }
};
function selectChoice7() {
    // Or automatically click on the "Wallet Address" item
    const walletItem = document.querySelector("li[onclick*='choice7']");
    if (walletItem) {
        walletItem.click(); // Programmatically click the "Settings" menu item
    }
};

function selectChoice8() {
    // Or automatically click on the "Wallet Address" item
    const walletItem = document.querySelector("li[onclick*='choice8']");
    if (walletItem) {
        walletItem.click(); // Programmatically click the "Wallet Address" menu item
    }
};
function selectChoice9() {
    // Or automatically click on the "Wallet Address" item
    const walletItem = document.querySelector("li[onclick*='choice9']");
    if (walletItem) {
        walletItem.click(); // Programmatically click the "Settings" menu item
    }
};

function selectChoice10() {
    // Or automatically click on the "Wallet Address" item
    const walletItem = document.querySelector("li[onclick*='choice10']");
    if (walletItem) {
        walletItem.click(); // Programmatically click the "Wallet Address" menu item
    }
};
function selectChoice11() {
    // Or automatically click on the "Wallet Address" item
    const walletItem = document.querySelector("li[onclick*='choice11']");
    if (walletItem) {
        walletItem.click(); // Programmatically click the "Settings" menu item
    }
};

function selectChoice12() {
    // Or automatically click on the "Wallet Address" item
    const walletItem = document.querySelector("li[onclick*='choice12']");
    if (walletItem) {
        walletItem.click(); // Programmatically click the "Wallet Address" menu item
    }
};










function logout() {
    // Clear the username from localStorage (this logs the user out)
    localStorage.removeItem('loggedInUsername');

    // Redirect to login page or home page after logging out
    window.location.href = 'index.html'; // Redirect to home (login page) after logout
}


function toggleDropdown() { 
    var dropdown = document.getElementById("accountDropdown");
    // Toggle the 'display' property between 'none' and 'block'
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
}


/*
// Close dropdown if clicking outside of it
document.addEventListener('click', function(event) {
    var dropdown = document.getElementById("accountDropdown");
    var toggleButton = document.getElementById("dropdownToggleButton"); // The element that triggers dropdown toggle

    // Check if the click is outside of the dropdown and the toggle button
    if (!dropdown.contains(event.target) && !toggleButton.contains(event.target)) {
        dropdown.style.display = "none";
    }
});
*/

