// Henter express for library 
import express from "express";
// Henter cookie-parser fra library 
import cookieParser from "cookie-parser";
// Importere renderPage fra util/templateEngine.js for at kunne benytte dens kode nedenfor ved at putte den i en variabel.
import { renderPage } from "./util/templateEngine.js";
import { users } from "./database.js";
import { checkIfUserExists, findUserByEmail } from "./signup_service.js"

// Instantiering af express
const app = express();

app.use(express.json())
// Cookie-parser er middleware. Denne middleware gør at vi kan bruge cookie-parser functionen i app.js
app.use(cookieParser())
// urlencoded er middleware.
// Den gør at vi kan få adgang til fx de input som email og password og og bruge kalde dem i vores 
// Post metode fx req.body.email
app.use(express.urlencoded( {extended: true} ))  
//
app.use(express.static("public")) 


// Bruger renderPage som vi har importeret så vi kan bruge koden og gemmer den i en variabel. 
// Frontpage 
const frontPage = renderPage("/frontpage/frontpage.html",
{
    tabTitle: "Nodejs frontpage",
    cssLink: `<link rel="stylesheet" href="/pages/frontpage/frontpage.css">`
});
// Page 1
const page1site = renderPage("/page1/page1site.html", 
{
    tabTitle: "Nodejs page 1",
    cssLink: `<link rel="stylesheet" href="/pages/page1/page1site.css">`
});
// Page 2
const page2site = renderPage("/page2/page2site.html",
{ 
    tabTitle: "Nodejs page 2",
    cssLink: `<link rel="stylesheet" href="/pages/page2/page2site.css">`
});
// Page 3
const page3site = renderPage("/page3/page3site.html",
{ 
    tabTitle: "Nodejs page 3",
    cssLink: `<link rel="stylesheet" href="/pages/page3/page3site.css">`
});
// Page 4
const page4site = renderPage("/page4/page4site.html",
{ 
    tabTitle: "Nodejs page 4",
    cssLink: `<link rel="stylesheet" href="/pages/page4/page4site.css">`
});

//
const notAllowed = renderPage("/create_content/not_allowed.html",
{
    tabTitle: "Not allowed",
    cssLink: `<link rel="stylesheet" href="/pages/create_content/create_content.css">`
})

// Create content
const createContent = renderPage("/create_content/create_content.html",
{
    tabTitle: "Nodejs admin login",
    cssLink: `<link rel="stylesheet" href="/pages/create_content/create_content.css">`
});

// Login page 
/*const loginPage = renderPage("/login/loginpage.html",
{
    tabTitle: "Nodejs login",
    cssLink: `<link rel="stylesheet" href="/pages/login/loginpage.css">`
});*/

// Sign up page 
const signUpPage = renderPage("/signup/signup.html",
{
    tabTitle: "Nodejs signup",
    cssLink: `<link rel="stylesheet" href="/pages/signup/signup.css">`
});

// Sign in page 
const signInPage = renderPage("/signin/signin.html",
{
    tabTitle: "Nodejs signin",
    cssLink: `<link rel="stylesheet" href="/pages/signin/signin.css">`
});

app.get("/create-content", (req,res) => {
    const isAdmin = req.cookies.isAdmin
    const logged_in = req.cookies.userIsLoggedIn

    
    if (isAdmin === "true" && logged_in === "true") {
        res.send(createContent)
    } else if (logged_in == "true") {
            res.send(notAllowed) // res = return 
        }else {
        res.send(signInPage) 
    }     
})

app.get("/signin", (req, res) => {
    res.send(signInPage); 
})
// Her comes all the Routes
// Login   
/*app.post("/login", (req, res) => {
    // req.body er noget middleware fra express.urlencoded()
    req.body.email === "mymail@yahoo.dk" // Gemmer noget data i body
    req.body.password === "1234" // Gemmer noget data i body

    // Ved denne opperator skal begge conditions være sande 
    const good = req.body.email === "mymail@yahoo.dk" && req.body.password === "1234"; 
    if (good) { // Condition 
        // If condition er true så skal der laves en cookie med navn session og en value der har 1234. 
        // Den cookie bruges til at logge ind med.
        res.cookie("sessionid", "1234") // Nede i fx week1 hvis req.cookies.sessionid = 1234 
        // Hvis condition er true så naviger til frontpage
        res.redirect("/") 
    }
    // hvis condition ikke er true, så fejler log ind og der vil komme en fejlmeddelse med fail. 
    // dvs. hvis der bliver indtastet en mail eller password der er andre end dem i req.body så fejler log ind. 
    res.send("Fail"); 
})*/

// Route til sign up page
app.get("/signup", (req,res) => {
    res.send(signUpPage)
})

app.post("/signup", (req,res) => {
    console.log("POST request called")
    if(checkIfUserExists(users, req.body.email) === false) {
        users.push(req.body)
        console.log("User created")
        res.redirect("/signin")
        console.log({data: users})
    } else {
        console.log("User already exists")
        res.send("User already exists")
    }
    //res.send({data: users})
})

app.post("/signin", (req, res) => {
    console.log("attempt to login ")
    if(checkIfUserExists(users, req.body.email) === true) {
        const user = findUserByEmail(req.body.email)
        if(user.password === req.body.password) {
        console.log("Login successfully")
        res.cookie("userIsLoggedIn", true)
        res.cookie("isAdmin", user.isAdmin)
        res.redirect("/")
        }
    } else {
        console.log("User doesn't exist")
        res.send(signInPage)
        
    }
})

// Route til frontpage
app.get("/", (req, res) => {
    res.send(frontPage);
})

// Route til page 1
app.get("/Page1", (req, res) => {
    const logged_in = req.cookies.userIsLoggedIn

    if (!logged_in) {
        res.send(signInPage)
    } else {
        res.send(page1site)
    }
}); 

// Route til page 2
app.get("/Page2", (req, res) => {
    const logged_in = req.cookies.userIsLoggedIn

    if (!logged_in) {
        res.send(signInPage)
    } else {
        res.send(page2site)
    }
}); 

// Route til page 3
app.get("/Page3", (req, res) => {
    const logged_in = req.cookies.userIsLoggedIn

    if (!logged_in) {
        res.send(signInPage)
    } else {
        res.send(page3site)
    }
}); 

// Route til page 4
app.get("/Page4", (req, res) => {
    const logged_in = req.cookies.userIsLoggedIn

    if (!logged_in) {
        res.send(signInPage)
    } else {
        res.send(page4site)
    }
}); 

// Hvilken port programmet lytter til
// Hvis porten ikke kan findes så vil den altid starte port 8080. 
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }// addess().port er for at vise hvilken port der er bundet til.
    // Hvis den ikke finder nogen port vil den altid forbinde med port 8080 til at køre localt.  
    console.log("Server is running on port", server.address().port); 
    console.log("app is running in mode: ", process.env.NODE_ENV);
})
