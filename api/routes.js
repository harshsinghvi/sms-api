// eslint-disable-next-line import/no-import-module-exports
import { Router } from 'express';

const postSmsController = (req, res, next) => {
  try {
    const { id: deviceId } = req.params;
    return res.json({ deviceId });
  } catch (err) {
    return next(err);
  }
};

const router = Router();

router.post('/device/:id', postSmsController);

// export default router;

module.exports = router;
