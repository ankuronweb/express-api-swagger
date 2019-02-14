import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swagger.json';
import { version } from '../package.json';
import { health } from './services/index';

const app = express();
const PORT = process.env.PORT || 3001;
const router = express.Router();

const swaggerOptions = {
  explorer: true
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, swaggerOptions));

router.use('/', swaggerUi.serve);

router.get('/', (req, res) => res.json({ App: 'Express api starter pack is running!', version, uptime: process.uptime() }));

router.get('/health', health);

app.use('/api', router);

const server = app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log('Press Ctrl+C to quit.');
});

app.stop = () => server.close();

export default app;
