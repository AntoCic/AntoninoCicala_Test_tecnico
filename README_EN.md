# Antonino Cicala Test
This project is a web application that allows users to upload local text files or provide URLs of text files for analysis to obtain:

- the total number of words in the file
- the number of letters in the file
- the number of spaces in the file
- the words that repeat more than 10 times and indicate the number of times they repeat

The project uses the Facade design pattern to manage file processing logic.

## Project Structure

- `index.js`: The main file that sets up and starts the Express server.
- `public/index.html`: The HTML file that provides the user interface.
- `public/app.js`: The JavaScript file that handles front-end logic.
- `modules/fileFacade.js`: The file that implements the FileFacade class for file processing.
- `modules/fileReader.js`: The file that implements the FileReader class for file reading functions.
- `modules/textInfo.js`: The file that implements the TextInfo class for string analysis functions.

## Requirements
- Node.js
- npm

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/AntoCic/AntoninoCicala_Test_tecnico.git
    ```
2. Navigate to the project directory:
    ```sh
    cd AntoninoCicala_Test_tecnico
    ```
3. Install the dependencies:
    ```sh
    npm i
    ```

## Starting the Server
To start the server, run the command:
> NOTE: The server is initialized on port 3000
```sh
npm start
```

## Important Info about the Files
### index.html
Within the element with ID `result-box`, other elements containing the result of the submit request are created. Additionally, an element containing the file text is generated, positioned right after `result-box`.

```sh
<ul class="list-group" id="results-box">
    <!-- result -->
</ul>
<!-- file text -->
```

---
### app.js
The main function that handles the submit logic checks which type of request to make based on the value of `inputFile`, which corresponds to the input with ID `input-file`. If `inputFile` contains a file, a request will be sent to process it; if it is an empty string, the link written in the `inputUrl` input will be used.

```sh
form.addEventListener('submit', (event) => {
    <!-- ... -->
    if (inputFile.value !== '') { 
        <!-- ... -->
    } else { 
        <!-- ... -->
    }
});
```

The fetch functions handle two distinct cases:
- In the case of a local upload, the entire form is sent to be processed by the server.
- In the case of an external upload from a web URL, only the URL is sent, encapsulated in an object with a variable named `fileUrl`.

---
### index.js
The modules used are:

- `Express` for server operation
- `Multer` for local file upload
- My module `FileFacade` for data processing

The two server calls, apart from the one for displaying the homepage, are:
- /uploadfile to process a local file
- /urlfile to process an external URL

For processing, I use the `processPath` and `processUrl` methods obtained from the fileProcess object created using `FileFacade`.

---
### fileFacade.js
My facade class, `FileFacade`, extends two utility classes that transform the local path or URL into a string and subsequently analyze it to obtain an object containing the analysis result and the complete text.

---
### fileReader.js
It uses two built-in modules: `fs` for reading and deleting files, and `path` to get the paths.
The two methods of the class are `readPath` and `readUrl`.

- `readPath` reads the content of a local file, deletes the file, and returns the string with its content.
- `readUrl` performs a fetch to get the text from a URL and returns it in string format.

---
### textInfo.js

The methods contained in the `TextInfo` class are:
- `numWords`: Given a string, returns the number of words contained.
- `numLetters`: Given a string, returns the number of letters contained.
- `numWhiteSpaces`: Given a string, returns the number of white spaces.
- `numRecurringWords`: Given a string and a quantity, returns the number of words that recur more times than the specified quantity. If the quantity is not specified, the default value is 10.