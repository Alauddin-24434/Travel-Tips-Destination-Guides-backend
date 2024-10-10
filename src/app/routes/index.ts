import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { PostRoutes } from '../modules/posts/posts.route';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/',
    route: PostRoutes,
  },


];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;