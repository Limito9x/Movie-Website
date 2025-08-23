import { Router, RequestHandler } from "express";

interface IBaseController {
  getAll: Function;
  getById: Function;
  create: Function;
  update: Function;
  delete: Function;
}

// Định nghĩa interface cho các middleware tùy chỉnh
interface RouteMiddlewares {
  getAll?: RequestHandler[];
  getById?: RequestHandler[];
  create?: RequestHandler[];
  update?: RequestHandler[];
  delete?: RequestHandler[];
}

export function createBaseRouter(
  controller: IBaseController,
  middlewares: RouteMiddlewares = {}
): Router {
  const router = Router();

  // Định tuyến các API cơ bản với middleware tùy chỉnh
  router.get(
    "/",
    ...(middlewares.getAll || []),
    controller.getAll.bind(controller)
  );
  router.get(
    "/:id",
    ...(middlewares.getById || []),
    controller.getById.bind(controller)
  );
  router.post(
    "/",
    ...(middlewares.create || []),
    controller.create.bind(controller)
  );
  router.patch(
    "/:id",
    ...(middlewares.update || []),
    controller.update.bind(controller)
  );
  router.delete(
    "/:id",
    ...(middlewares.delete || []),
    controller.delete.bind(controller)
  );

  return router;
}
