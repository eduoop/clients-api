import { Router } from "express";
import ClientController from "./http/controllers/ClientController";

const router = Router();

router.post("/client", ClientController.create);
router.put("/client/:cpf", ClientController.update);
router.get("/client", ClientController.index);

export { router };
