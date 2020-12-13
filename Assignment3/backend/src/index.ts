import './preStart'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import { Server } from 'ws';


// Start the server
const port = Number(process.env.PORT || 4000);
const httpServer = app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
const wsServer = new Server({server: httpServer});

export {wsServer}
