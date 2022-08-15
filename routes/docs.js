const express = require('express');
const router = express.Router();
const swagger = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


// TODO: add implemented apis to the list
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Caption contest backend",
            description: "Blog website project",
            version: "1.0.0",
            license: {
                name: "MIT",
                url: "https://choosealicense.com/licenses/mit/",
            }
        },
    },
    apis: []
};
const specs = swagger(options);


router.use("/",swaggerUI.serve);
router.get(
    "/",
    swaggerUI.setup(specs, {
        explorer: true
    })
)

module.exports = router;