function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]

    if(names.includes(inputText)) {
        alert("Welcome, Captain!")
    }
    else { alert("Your name is not recognized. Please choose from these names: Picard, Janeway, Kirk, Archer and Georgiou.") }
}

export { checkForName }
