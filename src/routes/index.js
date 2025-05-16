import { Router } from "express";

const routes = Router();

routes.use("/", (req, res) => {
    res.success([{name: 'thang', age: 13}], "success", 200)
})

// routes.use("/products", hanldeProduct...)
// routes.use("/products", hanldeProduct...)
// routes.use("/products", hanldeProduct...)
// routes.use("/products", hanldeProduct...)

export default routes;
