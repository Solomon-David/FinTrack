import { Router } from 'express';
import protect from '../middlewares/protect';
import * as rcDataController from '../controllers/rcdata.controller';

const rcDataRouter = Router();

rcDataRouter.post("/", protect, rcDataController.addRCData);
rcDataRouter.get("/", protect, rcDataController.getRCData);
rcDataRouter.patch("/:id", protect, rcDataController.updateRCData);
rcDataRouter.delete("/:id", protect, rcDataController.deleteRCData);

export default rcDataRouter;