import app from './app';
import { Network } from './common/Network';

app.listen(3333, '0.0.0.0', () => {
  console.log('Serving at http://localhost:3333');
  console.log(`Serving at http://${Network.publicIP()}:3333`);
});
