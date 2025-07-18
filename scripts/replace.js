import path from "path";
const oldString = /-gray-/g;
import fs from "fs/promises";
const targetDirectory = "./";
const filesToModify = ".tsx";
const newString = "-neutral-";
async function processDirectory(directory) {
    try {
        const entries = await fs.readdir(directory, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(directory, entry.name);
            if (entry.isDirectory()) {
                if (entry.name !== "node_modules" && entry.name !== ".git" && entry.name !== ".next") await processDirectory(fullPath);
            } else if (entry.isFile() && entry.name.endsWith(filesToModify)) await replaceInFile(fullPath);
        }
    } catch (error) {
        console.error(`Error reading directory ${directory}:`, error);
    }
}
async function replaceInFile(filePath) {
    try {
        const content = await fs.readFile(filePath, "utf-8");
        if (oldString.test(content)) {
            const newContent = content.replace(oldString, newString);
            await fs.writeFile(filePath, newContent, "utf-8");
            console.log(`Updated file: ${filePath}`);
        }
    } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
    }
}
(async () => {
    console.log("Starting replacement process...");
    await processDirectory(targetDirectory);
    console.log("Replacement process finished.");
})();