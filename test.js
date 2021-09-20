const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(req.url)

  const {method, url: route} = req
  if( method === 'GET' && route === '/hello') {
      res.statusCode = 200
      //read from data base
      res.setHeader('Content-Type', 'application/json')
      res.end(`{hello: world}`)
      return
  } 
  if(method === 'POST' && route === '/hello') {
      // create in data base
      res.statusCode = 201
      res.end('You are post succesfully')
      return
  }

  if(method === 'PUT' && route === '/hello') {
      // update in data base already created smth
    res.statusCode = 201
    res.end('You are put succesfully')
    return
  }
  if(method === 'DELETE' && route === '/hello') {
      //delete from data base
    res.statusCode = 400
    res.end('You are delete succesfully')
    return
  }
//   res.statusCode = 200;
  
//   res.setHeader('Content-Type', 'application/json');
//   res.end(`{route: ${req.url}, method: ${req.method}}`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
