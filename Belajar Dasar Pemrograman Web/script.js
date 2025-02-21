document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("nav ul li a");
    
    navLinks.forEach(link => {
        link.addEventListener("mouseover", () => {
            link.style.color = "#FFD700";
        });
        
        link.addEventListener("mouseout", () => {
            link.style.color = "white";
        });
    });

    const articles = document.querySelectorAll("article");
    articles.forEach(article => {
        article.addEventListener("click", () => {
            alert("Anda mengklik " + article.querySelector("h2").textContent);
        });
    });
});