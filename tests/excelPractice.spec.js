const ExcelJS = require('exceljs');
const {test, expect} = require('@playwright/test');


async function readFile(workbook, initText, filePath) {
    let output = {row:-1, column:-1};
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    await worksheet.eachRow((row, rowNumber)=>{
        

        row.eachCell((cell, colnumber) => {
            if (cell.value === initText) {
                output.row = rowNumber;
                output.column = colnumber;

            }
        });
    })
    return output;

}

async function writeFile(initText, updatedText, change, filePath){
    const workbook = new ExcelJS.Workbook();
    const output = await readFile(workbook, initText, filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const cell = worksheet.getCell(output.row, output.column+change.colChange);
    cell.value = updatedText;
    await workbook.xlsx.writeFile("/Users/prince/Downloads/download.xlsx");
    
}

// writeFile("DragonFruit", "Purple", {rowChange:0, colChange:1}, "/Users/prince/Downloads/download.xlsx")

test("@Excel Excel Test", async({page})=>{
    const searchedText = "Mango";
    const desiredText = "Purple";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const downloadEvent = page.waitForEvent('download');
    await page.getByRole('button',{name:'Download'}).click();
    await downloadEvent;
    writeFile(searchedText, desiredText, {rowChange:0, colChange:1}, "/Users/prince/Downloads/download.xlsx")
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("/Users/prince/Downloads/download.xlsx");
    await page.getByText(searchedText).waitFor();
    const searchedTextLocator = page.getByText(searchedText);
    const desiredRowLocator = await page.getByRole('row').filter({has:searchedTextLocator});
    await expect(desiredRowLocator.locator("#cell-3-undefined")).toContainText(desiredText);
})
