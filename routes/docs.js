const express = require('express');
const router = express.Router();
const swagger = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Blog website",
            description: "Blog website project",
            version: "1.0.0",
            license: {
                name: "MIT",
                url: "https://choosealicense.com/licenses/mit/",
            }
        },
    },
    apis: ["./routes/articles.js", "./routes/categories.js", "./routes/comments.js", "./routes/users.js"]
};
const specs = swagger(options);


router.use("/", swaggerUI.serve);
router.get(
    "/",
    swaggerUI.setup(specs, {
        explorer: true
    })
)

module.exports = router;