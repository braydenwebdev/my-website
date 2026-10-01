panelsToggle = document.querySelectorAll(".panel-toggle");

panelsToggle.forEach((panelToggle) => {
    const panel = document.getElementById(panelToggle.dataset.panelId);
    panel.addEventListener("scroll", (e) => {
        e.target.querySelector(".panel-toggle").style.top = `${e.target.scrollTop + 20}px`;
        e.target.querySelector(".panel-toggle").style.right = `${e.target.scrollLeft * -1 + 20}px`;
        e.target.querySelector(".copy-code").style.top = `${e.target.scrollTop + 20}px`;
        e.target.querySelector(".copy-code").style.right = `${e.target.scrollLeft * -1 + 20}px`;
    });

    panelToggle.addEventListener("click", (e) => {
        e.preventDefault();
        panel.classList.toggle("slide-in");
    });
});

const navMainMenuToggle = document.querySelector(".nav-main-menu-toggle");

/**
 * Toggles the main menu on and off
 * when the user clicks the main menu toggle button.
 * @param {object} e - The event object
 * @param {string} ariaControls - The aria-controls attribute value
 * @param {string} ariaExpanded - The aria-expanded attribute value
 * @param {string} ariaLabel - The aria-label attribute value
 * @param {string} hidden - The hidden attribute value
 * @returns {void}
 */
navMainMenuToggle.addEventListener("click", (e) => {
    e.preventDefault();
    const ariaControls = navMainMenuToggle.getAttribute("aria-controls");
    if (navMainMenuToggle.getAttribute("aria-expanded") === "false") {
        navMainMenuToggle.setAttribute("aria-expanded", "true");
        navMainMenuToggle.setAttribute("aria-label", "Close menu");
        navMainMenuToggle.parentElement.querySelector(`#${ariaControls}`).toggleAttribute("hidden");
    } else {
        navMainMenuToggle.setAttribute("aria-expanded", "false");
        navMainMenuToggle.setAttribute("aria-label", "Open menu");
        navMainMenuToggle.parentElement.querySelector(`#${ariaControls}`).toggleAttribute("hidden");
    }
});

/**
 * Copy code to clipboard
 * @param {string} text - The text to copy to clipboard
 * @returns {Promise<void>}
 */
const btnCopyCode = document.querySelectorAll(".zbtn-copy-code");
btnCopyCode.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const code = e.target.parentElement.querySelector("code").innerText;
        copyToClipboard(code.replace(/\u00a0/g, " ").trim());
        e.target.innerText = "Copied!";
        setTimeout(() => {
            e.target.innerText = "Copy";
        }, 2000);
    });
});
const copyToClipboard = async (text) => {
    navigator.clipboard.writeText(text);
};

// Scan for code snippets and append buttons
const htmlButton = '<button class="copy-code" aria-label="Copy to clipboard">Copy</button>';

const snippets = document.querySelectorAll("pre > code");

snippets.forEach((snippet) => {
    const parent = snippet.parentNode;
    codeHeight = snippet.clientHeight;
    parent.insertAdjacentHTML("beforebegin", htmlButton);
});

// Replace tooltip message when mouse leaves button
// and prevent page refresh after click button

const copyCodeButtons = document.querySelectorAll(".copy-code");

copyCodeButtons.forEach((button) => {
    button.addEventListener("mouseenter", (e) => {
        e.target.textContent = "Copy me...?";
        e.target.blur();
    });

    button.addEventListener("mouseleave", (e) => {
        setTimeout(() => {
            e.target.innerText = "Copy";
        }, 1000);
        e.target.blur();
    });

    button.addEventListener("click", (e) => {
        const code = e.target.nextElementSibling.innerText;
        copyToClipboard(code.replace(/\u00a0/g, " ").trim());
        e.target.innerText = "Copied!";
        setTimeout(() => {
            e.target.innerText = "Copy";
        }, 2000);
    });
});
