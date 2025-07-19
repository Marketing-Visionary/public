// Add a log to see if the script file itself is loading at all.
console.log("faq-accordion.js loaded.");

window.addEventListener("load", function() {
    // Log when the main function starts.
    console.log("Window loaded. Initializing FAQ script...");

    var allQuestions = document.getElementsByClassName("am-faq-accordion-question");
    
    // Log how many question elements were found.
    console.log("Found " + allQuestions.length + " FAQ question elements.");

    if (allQuestions.length === 0) {
        console.warn("Warning: No elements with class 'am-faq-accordion-question' were found.");
        return; // Exit if there's nothing to do.
    }

    for (var i = 0; i < allQuestions.length; i++) {
        allQuestions[i].addEventListener("click", function() {
            // 'this' is the clicked question element.
            var clickedQuestion = this;
            console.log("Clicked question:", clickedQuestion.textContent.trim());
            
            // --- NEW LOGIC: Close all other panels first ---
            for (var j = 0; j < allQuestions.length; j++) {
                // If this is not the question that was just clicked...
                if (allQuestions[j] !== clickedQuestion) {
                    allQuestions[j].classList.remove("active");
                    let panelToClose = findNextPanel(allQuestions[j]);
                    if (panelToClose) {
                        panelToClose.style.maxHeight = "0px";
                    }
                }
            }

            // --- TOGGLE LOGIC for the clicked panel ---
            clickedQuestion.classList.toggle("active");
            let panelToToggle = findNextPanel(clickedQuestion);

            if (panelToToggle) {
                console.log("SUCCESS: Found answer panel:", panelToToggle);
                if (panelToToggle.style.maxHeight && panelToToggle.style.maxHeight !== "0px") {
                    console.log("Closing panel.");
                    panelToToggle.style.maxHeight = "0px";
                } else {
                    console.log("Opening panel.");
                    panelToToggle.style.maxHeight = (panelToToggle.scrollHeight + 20) + "px";
                }
            } else {
                console.error("FAILURE: Could not find an answer panel for the clicked question.");
            }
        });
    }
});

/**
 * Helper function to find the next sibling element with the correct class.
 * This keeps the code cleaner.
 * @param {HTMLElement} startElement - The element to start searching from.
 * @returns {HTMLElement|null} The found panel or null.
 */
function findNextPanel(startElement) {
    let currentElement = startElement;
    for (let i = 0; i < 5 && currentElement; i++) {
        let sibling = currentElement.nextElementSibling;
        while (sibling) {
            if (sibling.classList.contains("am-faq-accordion-answer")) {
                return sibling;
            }
            sibling = sibling.nextElementSibling;
        }
        currentElement = currentElement.parentElement;
    }
    return null;
}
