import server from './server.js';
import colors from 'colors';

const port = process.env.PORT || 4000;

server.listen(4000, () => {
  console.log(colors.yellow.bold(` Server is running on  ${port} `));
});
