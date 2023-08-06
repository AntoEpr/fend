 function handleSubmit(event) {
    event.preventDefault();
    // Check url to be valid url
    let inputURL = document.getElementById('name').value;
    Client.goodUrl(inputURL);

    console.log("Checking handleSubmit");

    try {
        const response = fetch ('/', {
          method: "POST",
          credentials: "same-origin",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: inputURL })
        });
      
        if (response.ok) {
          const result = response.json();
      
          document.getElementById('agreement').textContent = result.agreement;
          document.getElementById('subjectivity').textContent = result.subjectivity;
          document.getElementById('confidence').textContent = result.confidence;
          document.getElementById('irony').textContent = result.irony;
        } else {
          throw new Error('Request failed with status ' + response.status);
        }
      } catch (error) {
        console.log("error", error);
      }
}

export { handleSubmit };