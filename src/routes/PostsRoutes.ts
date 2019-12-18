import { Request, Response, Router } from 'express';

class PostsRoutes {
    router: Router;
    constructor() {
        this.router = Router();
    }
    getPosts() {

    }
    getPost() {

    }
    createPost() {

    }
    updatePost() {

    }
    deletePost() {

    }
    routes() {
        this.router.get('/api/routes', this.getPosts);
    }
}
const postsRoutes = new PostsRoutes();
postsRoutes.routes();
export default postsRoutes.router;

// minuto 50
