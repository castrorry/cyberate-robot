import Express from 'express';
import Routes from '@routes';

const server = Express();
server.use(Express.json());
server.use(Routes());

server.listen(process.env.PORT || 8080, () => {
  console.log("Server running on port:", process.env.PORT || 8080);
});
