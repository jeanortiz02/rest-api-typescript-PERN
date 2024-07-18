import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
    swaggerDefinition : {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / Typescript',
            version: "1.0.0",
            description: 'API Docs for Products'
        }
    },
    apis: ['./src/router.ts']
} 

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions : SwaggerUiOptions = {
    // customCss: `
    //     .topbar-wrapper .link {
    //         content: url('https://jeancarlosortiz.com/wp-content/uploads/2024/03/Jean-e1711845664133.jpg');
    //         height: 120px;
    //         width: auto;
    //     }
    // `
    customSiteTitle: 'Documentation REST API Express / Typescript'
}

export default swaggerSpec;

export { swaggerUiOptions };