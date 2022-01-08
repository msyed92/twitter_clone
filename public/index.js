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

