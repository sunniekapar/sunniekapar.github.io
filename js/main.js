const pdfEmbed = document.querySelector(".pdf-embed");
const contentButtons = Array.from(document.querySelectorAll(".content-btn"));
contentButtons.forEach(element => {
    element.addEventListener("click", () => {
        changePdf(element.id);
    });
});

function changePdf(pdfName) {
    if(`pdfs/${pdfName}.pdf#page=1&zoom=95` != pdfEmbed.getAttribute("src"))
        pdfEmbed.setAttribute("src", `pdfs/${pdfName}.pdf#page=1&zoom=95`);
}