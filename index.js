//------------------Part 1: CSV Processing and Refactoring--------

//function to process CSV data into a two dimensional array
function processCSV(csvString) {
    return csvString.trim().split("\n").map(row => row.split(",").map(cell => cell.trim()));
}

//CSV data
let csvData1 =
    "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26";

//process CSV data
let processedData = processCSV(csvData1);
console.log("Processed CSV Data:", processedData);

//------------------Part 2: Expanding Functionality--------

//the number of columns is determined by the first row of processed data
let numColumns = processedData[0].length;
console.log("Number of Columns:", numColumns);

//------------------Part 3: Transforming Data--------

//function to transform processed data into an array of objects
function transformToObjects(data) {
    const headers = data[0].map(header => header.toLowerCase());
    return data.slice(1).map(row => {
        let obj = {};
        for (let i = 0; i < row.length; i++) {
            obj[headers[i]] = row[i];
        }
        return obj;
    });
}

//transform processed data into objects
let dataObjects = transformToObjects(processedData);
console.log("Transformed Data into Objects:", dataObjects);

//------------------Part 4: Sorting and Manipulating Data--------

//manipulate the array of objects
function manipulateData(data) {
    data.pop(); //remove the last element
    data.splice(1, 0, { id: "48", name: "Barry", occupation: "Runner", age: "25" }); //insert new object
    data.push({ id: "7", name: "Bilbo", occupation: "None", age: "111" }); //add new object

    //calculate average age using a loop
    let totalAge = 0;
    for (let person of data) {
        totalAge += Number(person.age); //convert age to number
    }
    const averageAge = totalAge / data.length;

    console.log("Updated Data:", data);
    console.log("Average Age:", averageAge);
}

//manipulate the data
manipulateData(dataObjects);

//------------------Part 5: Transforming Back to CSV--------

//function to convert array of objects back to CSV format
function convertToCSV(data) {
    const headers = Object.keys(data[0]).map(header => header.charAt(0).toUpperCase() + header.slice(1)).join(",");
    const rows = data.map(obj => Object.values(obj).join(",")).join("\n");
    return `${headers}\n${rows}`;
}

//convert the manipulated data back to CSV
let csvOutput = convertToCSV(dataObjects);
console.log("CSV Output:\n", csvOutput);