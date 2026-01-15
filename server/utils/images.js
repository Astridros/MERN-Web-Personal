const path = require("path");

function getFilePath(file) {
    return path.join(
        "avatar",
        path.basename(file.path)
    );
}

module.exports = {
    getFilePath,
};