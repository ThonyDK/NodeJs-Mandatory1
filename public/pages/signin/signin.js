const signinButton = document.getElementById("btn-confirm-id").addEventListener("click", signin);

function signin() {

    fetch("/signin", {
        method: "POST",
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        }),
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    })
}    