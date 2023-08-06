async function handleSubmit(event) {
    event.preventDefault();

    // Check url to be valid url
    let inputURL = document.getElementById('name').value;
    Client.goodUrl(inputURL);

    console.log("Checking handleSubmit");

    try {
        const response = await fetch('/add', {
            method: "POST",
            credentials: "same-origin",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: inputURL })
        });

        const result = await response.json();

        document.getElementById('agreement').innerHTML = result.agreement;
        document.getElementById('subjectivity').innerHTML = result.subjectivity;
        document.getElementById('confidence').innerHTML = `Confidence Rating: ${result.confidence}`;
        document.getElementById('irony').innerHTML = result.irony;
    } catch (error) {
        console.log("error", error);
    }
}

export { handleSubmit };