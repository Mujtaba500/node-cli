import http from "http";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("hello world");
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
