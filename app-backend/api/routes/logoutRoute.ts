import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response)=> {
    res.clearCookie('refreshToken');
    res.status(200).json({message: 'Logged out successfully'});

});

export default router;