import express from 'express';
import http from 'http';
import path from 'path';
import exphbs from 'express-handlebars';
import { Server } from 'socket.io';
import viewRouter from './routes/viewRouter.js';
import __dirname from './utils/utils.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configuración del motor de plantillas Handlebars
app.engine('handlebars', exphbs.engine());

app.set('view engine', 'handlebars');
//app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, '..', 'views'));


// Configuración del servidor de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración del enrutador de vistas
app.use('/', viewRouter(io));

// Iniciar el servidor
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
