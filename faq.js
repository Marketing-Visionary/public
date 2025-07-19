document.addEventListener('DOMContentLoaded', function () {
    const detailsElements = document.querySelectorAll('.am-faq-item');

    detailsElements.forEach(details => {
        // Get the summary and content elements
        const summary = details.querySelector('.am-faq-question');
        const content = details.querySelector('.am-faq-answer-content');

        summary.addEventListener('click', (event) => {
            // Prevent the default open/close behavior so we can animate it
            event.preventDefault();

            // Close all other <details> elements
            detailsElements.forEach(otherDetails => {
                if (otherDetails !== details) {
                    otherDetails.removeAttribute('open');
                }
            });

            // Toggle the 'open' attribute on the clicked element
            if (details.hasAttribute('open')) {
                details.removeAttribute('open');
            } else {
                details.setAttribute('open', '');
            }
        });
    });
});
