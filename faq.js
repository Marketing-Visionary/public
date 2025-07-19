document.addEventListener("load", function() {
    var acc = document.getElementsByClassName("am-faq-accordion-question");

    for (var i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
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
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = (panel.scrollHeight + 20) + "px";
                }
            }
        });
    }
});
