// Add a log to see if the script file itself is loading at all.
console.log("faq-accordion.js loaded.");

window.addEventListener("load", function() {
    // Log when the main function starts.
    console.log("Window loaded. Initializing FAQ script...");

    var acc = document.getElementsByClassName("am-faq-accordion-question");
    
    // Log how many question elements were found. This is a critical step.
    console.log("Found " + acc.length + " FAQ question elements.");

    if (acc.length === 0) {
        console.warn("Warning: No elements with class 'am-faq-accordion-question' were found. The script will not attach any click events.");
    }

    for (var i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            // Log which question was clicked.
            console.log("Clicked question:", this.textContent.trim());
            
            this.classList.toggle("active");

            let currentElement = this; 
            let panel = null;

            for (let j = 0; j < 5 && currentElement; j++) {
                let sibling = currentElement.nextElementSibling;
                while (sibling) {
                    if (sibling.classList.contains("am-faq-accordion-answer")) {
                        panel = sibling;
                        break; 
                    }
                    sibling = sibling.nextElementSibling;
                }
                if (panel) break; 
                currentElement = currentElement.parentElement;
            }

            if (panel) {
                console.log("SUCCESS: Found answer panel:", panel);
                if (panel.style.maxHeight) {
                    console.log("Closing panel.");
                    // --- CHANGE HERE: Explicitly set to 0px instead of null ---
                    panel.style.maxHeight = "0px";
                } else {
                    console.log("Opening panel.");
                    panel.style.maxHeight = (panel.scrollHeight + 20) + "px";
                }
            } else {
                // If the panel isn't found, this is a major issue.
                console.error("FAILURE: Could not find an answer panel for the clicked question.");
            }
        });
    }
});
