const fs = require('fs');
const CleanCSS = require('clean-css');

const fileNames = ['normalize', 'petit']
const readingOptions = { encoding:'utf8', flag:'r' }
const writingOptions = { encoding:'utf8', flag:'w' }

function minify() {
    const originalContent = getOriginalContent()
    const minifiedContent = getMinifiedContent(originalContent)
    saveMinifiedContent(minifiedContent)
}

function getOriginalContent() {
    const list = {}

    fileNames.forEach((fileName) => {
        list[fileName] = fs.readFileSync(`${__dirname}/${fileName}.css`, readingOptions)
    })
    return list
}

function getMinifiedContent(content) {
    const list = {}

    Object.entries(content).forEach(([fileName, input]) => {
        list[fileName] = new CleanCSS().minify(input).styles;
    })
    return list
}

function saveMinifiedContent(content) {
    Object.entries(content).forEach(([fileName, input]) => {
        fs.writeFileSync(`${__dirname}/${fileName}.min.css`, input, writingOptions);
    })
}

minify()
