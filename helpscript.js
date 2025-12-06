let p = document.getElementById('p');

let today = new Date();
let lastModified = new Date("2025-12-05T10:30:00Z");

let mili = today - lastModified;
let days = Math.floor(mili / (1000 * 60 * 60 * 24));

p.innerHTML += `<br> ${days} days since last update`;