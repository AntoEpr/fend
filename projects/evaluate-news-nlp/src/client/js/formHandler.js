function handleSubmit(event) {
    event.preventDefault();
  
    // Get input from form input field
    let input_url = document.querySelector('input[name=test-url]').value;
  
    // Verify that input is a valid url
    if (Client.goodUrl(input_url)) {
      fetch('http://localhost:8080/article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input_url }),
      })
        .then((res) => res.json())
        .then(function (res) {
          // Update the result elements with the sentiment analysis response
          document.querySelector('section.results #polarity').innerHTML =
            res.polarity;
          document.querySelector('section.results #subjectivity').innerHTML =
            res.subjectivity;
          document.querySelector('section.results #polarity_confidence').innerHTML =
            res.polarity_confidence;
          document.querySelector('section.results #subjectivity_confidence').innerHTML =
            res.subjectivity_confidence;
          document.querySelector('section.results #excerpt').innerHTML =
            res.text;
        })
        .catch(function (error) {
          // Display error message if there was an issue with the API request
          var error_section = document.querySelector('section.errors');
          var error = document.querySelector('section.errors #error');
          error.innerHTML =
            "Error fetching sentiment analysis. Please try again later.";
          error_section.style.display = "block";
        });
    } else {
      // Display error message if URL is not valid
      var error_section = document.querySelector('section.errors');
      var error = document.querySelector('section.errors #error');
      error.innerHTML =
        "The URL:[" + JSON.stringify(input_url) + "] is not valid. Please enter a valid URL.";
      error_section.style.display = "block";
    }
  }
  
  export { handleSubmit };