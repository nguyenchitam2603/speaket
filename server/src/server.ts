import * as Hapi from 'hapi';

let server: Hapi.Server = new Hapi.Server();
server.connection({ host: 'localhost', port: 3000 });

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (request: Hapi.Request, reply: Hapi.ReplyNoContinue) {
    console.log('ZO PATH')
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }

  console.log('Server running at: ${server.info.uri}');
})