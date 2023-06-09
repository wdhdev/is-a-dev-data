const tableBody = document.getElementById("data-body");

const hiddenDomains = [
    "_psl",
    "@",
    "www"
]

function loadData() {
    fetch("https://raw-api.is-a.dev", {
        method: "GET"
    }).then(res => res.json()).then(data => {
        data.sort((a, b) => a.subdomain.localeCompare(b.subdomain));

        data.forEach(i => {
            if(hiddenDomains.includes(i.subdomain)) return;

            let row = tableBody.insertRow(-1);

            let c1 = row.insertCell(0);
            let c2 = row.insertCell(1);
            let c3 = row.insertCell(2);

            c1.classList = "px-4 py-2 outline outline-1 outline-gray-700";
            c2.classList = "px-4 py-2 outline outline-1 outline-gray-700";
            c3.classList = "px-4 py-2 outline outline-1 outline-gray-700";
            c3.classList = "px-4 py-2 outline outline-1 outline-gray-700";

            const records = [];

            Object.keys(i.record).forEach(record => {
                if(record === "A" || record === "MX") {
                    return i.record[record].forEach(r => {
                        records.push(`<span class="text-blue-600 font-semibold">${record}</span> ${r.toLowerCase()}`);
                    })
                }

                if(record === "URL") {
                    return records.push(`<span class="text-green-600 font-semibold">${record}</span> <a href="${i.record[record]}" class="underline underline-2 hover:no-underline">${i.record[record]}</a>`);
                }

                records.push(`<span class="text-blue-600 font-semibold">${record}</span> ${i.record[record].toLowerCase()}`);
            })

            c1.innerHTML = `<a href="https://${i.subdomain}.is-a.dev" class="text-blue-600 hover:text-blue-700">${i.subdomain}</a>`;
            c2.innerHTML = `<span class="font-semibold">Username:</span> ${i.owner.username ? `<a href="https://github.com/${i.owner.username}" class="underline underline-2 hover:no-underline">${i.owner.username}</a>` : `<span class="italic">None</span>`}<br><span class="font-semibold">Email:</span> ${i.owner.email ? `<a href="mailto:${i.owner.email.replace(" (at) ", "@")}" class="underline underline-2 hover:no-underline">${i.owner.email.replace(" (at) ", "@")}</a>` : `<span class="italic">None</span>`}`;
            c3.innerHTML = records.join("<br>");
        })
    })
}

loadData();
