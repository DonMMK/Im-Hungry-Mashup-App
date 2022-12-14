// Fetch the summary of the article from our Express API
const fetchSummary = (event) => {
    const title = event.target.textContent;

    fetch(`/api/summary/${title}`)
        .then((res) => res.json())
        .then((data) => {
            const parent = event.target.parentElement;
            const p = document.createElement("p");
            p.textContent = data.summary;
            parent.append(p);
        })
        .catch((error) => console.log(error));
};

// Add an event listener to each article title
const shopName = document.getElementsByClassName("shopName");

for (let name of shopName) {
    name.addEventListener("click", (event) => fetchSummary(event));
}