import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// __dirname setup
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let arr = [];

// Load existing blogs from the creation directory at startup
fs.readdir(path.join(__dirname, 'creation'), (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
    } else {
        arr = files.map(file => path.parse(file).name); // Assuming each file is named as `title.html`
        console.log('Existing blogs loaded:', arr);
    }
});

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/blog", (req, res) => {
    res.render("create.ejs");
});
app.get("/update", (req, res) => {
    res.render("update.ejs");
});
app.get("/delete", (req, res) => {
    res.render("delete.ejs", { arr });
});
/*app.post("/update", (req, res) => {
    const oldTitle = req.body["otitle"]; // Assuming you have an input field for oldTitle in update.ejs
    const newTitle = req.body["ntitle"];
    const content = req.body["content"];

    const oldFilePath = path.join(__dirname, 'creation', `${oldTitle}.html`);
    const newFilePath = path.join(__dirname, 'creation', `${newTitle}.html`);

    fs.readFile(oldFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            res.sendStatus(500);
        } else {
            const htmlContent =
                ` <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${newTitle}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f0f0f0;
                    color: #333;
                }
                .container {
                    background-color: #fce4ec;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    margin-top: 20px;
                }
                h1 {
                    color: #d81b60;
                    text-align: center;
                }
                p {
                    color: #666;
                    text-align: justify;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>${newTitle}</h1>
                <p>${content}</p>
            </div>
        </body>
        </html>
        `;

            fs.writeFile(newFilePath, htmlContent, (err) => {
                if (err) {
                    console.error('Error updating HTML file:', err);
                    res.sendStatus(500);
                } else {
                    console.log(`HTML file ${newFilePath}
                        has been updated successfully.`);

                    // After successfully writing new file, delete the old file
                    fs.unlink(oldFilePath, (err) => {
                        if (err) {
                            console.error('Error deleting old HTML file:', err);
                            res.sendStatus(500);
                        } else {
                            console.log(`Old HTML file ${oldFilePath}
                                has been deleted successfully.`);
                            arr = arr.map(blog => (blog === oldTitle ? newTitle : blog));
                            res.render("createdblog.ejs", { arr });
                        } // fs unlink
                    });
                }   //fs wrie=te end
            });
        }   // first if else end
    });// readfile ended
});*/
app.post("/update", (req, res) => {
    const oldTitle = req.body["otitle"];
    const newTitle = req.body["ntitle"];
    const content = req.body["content"];

    if (!oldTitle) {
        console.error('Error: Old title is undefined or empty');
        return res.sendStatus(400);
    }

    const oldFilePath = path.join(__dirname, 'creation', `${oldTitle}.html`);
    const newFilePath = path.join(__dirname, 'creation', `${newTitle}.html`);

    // Check if new title is different and not empty
    if (newTitle && newTitle !== oldTitle && !arr.includes(newTitle)) {
        // Update arr with new title
        arr = arr.map(blog => (blog === oldTitle ? newTitle : blog));

        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${newTitle}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f0f0f0;
                    color: #333;
                }
                .container {
                    background-color: #fce4ec;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    margin-top: 20px;
                }
                h1 {
                    color: #d81b60;
                    text-align: center;
                }
                p {
                    color: #666;
                    text-align: justify;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>${newTitle}</h1>
                <p>${content}</p>
            </div>
        </body>
        </html>
        `;

        // Write new file
        fs.writeFile(newFilePath, htmlContent, (err) => {
            if (err) {
                console.error('Error creating HTML file:', err);
                return res.sendStatus(500);
            }

            console.log(`HTML file '${newFilePath}' has been created successfully.`);
        });
        // Delete old file
        fs.unlink(oldFilePath, (err) => {
            if (err) {
                console.error('Error deleting HTML file:', err);
                return res.sendStatus(500);
            }

            console.log(`HTML file '${oldFilePath}' has been deleted successfully.`);

            // Render response after successful update
            res.render("createdblog.ejs", { arr });
        });

    } else {
        // Render response when no update is needed
        res.render("createdblog.ejs", { arr });
    }
});


app.post("/delete", (req, res) => {
    const title = req.body["title"];
    if (!title) {
        console.error('Error: Title is undefined or empty');
        res.sendStatus(400);
        return;
    }

    const filePath = path.join(__dirname, 'creation', `${ title }.html`);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting HTML file:', err);
            res.sendStatus(500);
        } else {
            console.log(`HTML file ${filePath}
                has been deleted successfully.`);
            arr = arr.filter(blog => blog !== title);
            res.render("createdblog.ejs", { arr });
        }
    });
});




app.get("/faq", (req, res) => {
    res.render("faq.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});
app.post("/submit", (req, res) => {
    const title = req.body["title"];
    const content = req.body["content"];
    if (!arr.includes(title) && title) { // Ensure title is not empty
        arr.push(title);

        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f0f0f0;
                    color: #333;
                }
                .container {
                    background-color: #fce4ec;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    margin-top: 20px;
                }
                h1 {
                    color: #d81b60;
                    text-align: center;
                }
                p {
                    color: #666;
                    text-align: justify;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>${title}</h1>
                <p>${content}</p>
            </div>
        </body>
        </html>
        `;

        const filePath = path.join(__dirname, 'creation', `${title}.html`);

        fs.writeFile(filePath, htmlContent, (err) => {
            if (err) {
                console.error('Error creating HTML file:', err);
                res.sendStatus(500);
            } else {
                console.log(`HTML file '${filePath}' has been created successfully.`);
                res.render("createdblog.ejs", { arr });
            }
        });
    } else {
        res.render("createdblog.ejs", { arr });
    }
});
app.use('/creation', express.static(path.join(__dirname, 'creation')));

app.get("/features", (req, res) => {
    res.render("features.ejs");
});
// Serve static files from the creation directory


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});