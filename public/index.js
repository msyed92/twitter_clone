if (document.URL == "http://localhost:3000/user/register") {
    const changeSignUp = document.getElementById("changeSignUp")
    const signUpToken = document.getElementById("signUpToken")


    changeSignUp.addEventListener("click", () => {
        const tokens = ["email address", "phone number"]
        const inputTokens = ["Email Address", "Phone Number"]
        if (signUpToken.innerHTML === tokens[0]) {
            signUpToken.innerHTML = tokens[1]
            document.getElementsByName("token")[0].placeholder = inputTokens[0]
        } else {
            signUpToken.innerHTML = tokens[0]
            document.getElementsByName("token")[0].placeholder = inputTokens[1]
        }
    })
}

async function getData(url) {
    console.log("HERE")
    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data, "HERE 2")
    } catch (error) {
        // Error handling here
        console.log(error)
    }
}

// Replace url with your url
const url = "http://localhost:3000/user/login"

getData(url)