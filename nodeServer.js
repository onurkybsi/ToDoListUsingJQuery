let http = require("http");
let fs = require("fs");
let path = require("path");

function send404(response) {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.write("Error 404: Resource not found.");
  response.end();
}

let mimeLookup = {
  ".js": "application/javascript",
  ".html": "text/html",
  ".css": "text/css",
};

let server = http
  .createServer(function (request, response) {
    console.log("Request starting...");

    if (request.method == "GET") {
      let fileUrl;

      if (request.url == "/") fileUrl = "/index.html";
      else fileUrl = request.url;

      let filePath = path.resolve("." + fileUrl);

      let fileExt = path.extname(filePath);
      let mimeType = mimeLookup[fileExt];

      if (!mimeType) {
        send404(response);
        return;
      }

      fs.exists(filePath, function (exists) {
        if (!exists) {
          send404(response);
          return;
        }

        response.writeHead(200, { "content-type": mimeType });
        fs.createReadStream(filePath).pipe(response);
      });
    } else {
      send404(response);
    }
  })
  .listen(3000);

console.log("Server running at http://localhost:3000");