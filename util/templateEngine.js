import fs from "fs";

// fs er for at vi kan bruge readFileSync(): readFileSync() er for at læse filens indhold. 
const navComponent = fs.readFileSync("./public/components/navbar/navbar.html").toString();
//const footerComponent = fs.readFileSync("./public/components/footer/footer.html").toString(); hvis man vil lave en statisk footer på hver side. 

export function renderPage(path, options = {}) { // renderPage importeres til app.js for at undgå redundans at html sider og dermed gøre det serversite rendering. 
    const page = fs.readFileSync("./public/pages"+path).toString(); // page er path til app.js endpoints man benytter. 

    return navComponent // Navbar som altid skal står der som standard, så man undgår at lave redundanse html kode.
        .replace("%%TAB_TITLE%%", options.tabTitle || "Nodejs") // Sætter titel på hvad siden hedder. 
        .replace("%%PAGE_CSS_LINK%%", options.cssLink || "") // Erstat med disse features hvis den ser dem.
        + page // Indsættes altid da det er pathen 
        //+ footerComponent; // Footer indsættes altid som standard
} 