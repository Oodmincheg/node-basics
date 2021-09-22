const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const hostname = '127.0.0.1';
const port = 3000;

const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, fileContent) => {
      if (error != null) {
        reject([]);
        return;
      }

      resolve(JSON.parse(fileContent));
    });
  });
};

//ftp? and other
const server = http.createServer(async (req, res) => {
  console.log(req.url);

  const { method, url: route } = req;
  if (method === 'GET' && route === '/beer') {
    const fileData = await readFile('./data/products.json');
    res.statusCode = 200;
    //read from data base
    res.setHeader('Content-Type', 'application/json');
    res.end(`{data: ${JSON.stringify(fileData)}`);
  }
  //
  if (method === 'GET' && route === '/beer/{param}') {
    res.statusCode = 200;
    //read from data base
    res.setHeader('Content-Type', 'application/json');
    res.end(`{hello: world}`);
    return;
  }

  if (method === 'POST' && route === '/beer') {
    const buffers = [];

 // look what is this
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const data = Buffer.concat(buffers).toString();
  
  const fileData = await fsPromises.readFile('./data/products.json')
  const products = JSON.parse(fileData)
  const newBeer = {...JSON.parse(data), id: products.length + 1}

  products.push(newBeer)
  await fsPromises.writeFile('./data/products.json', JSON.stringify(products))
 
  res.setHeader('Content-Type', 'application/json')
  res.end(`{data: ${JSON.stringify(newBeer)}}`);
   return
   
  }

  if (method === 'PUT' && route === '/hello') {
    // update in data base already created smth
    res.statusCode = 201;
    res.end('You are put succesfully');
    return;
  }
  if (method === 'DELETE' && route === '/hello') {
    //delete from data base
    res.statusCode = 400;
    res.end('You are delete succesfully');
    return;
  }
  res.statusCode = 200;

  res.setHeader('Content-Type', 'application/json');
  res.end(`{route: ${req.url}, method: ${req.method}}`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
