import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { Bindings } from './types';
import chatRoute from './routes/chat.route';

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors());

// Mount the chat route
app.route('/api/chat', chatRoute);

export default app;
