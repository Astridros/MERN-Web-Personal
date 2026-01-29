const path = require("path");

function getFilePath(file, type = "avatar") {
    return path.join(
        type,
        path.basename(file.path)
    );
}

module.exports = {
    getFilePath,
};