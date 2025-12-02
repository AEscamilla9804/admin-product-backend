import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerUiOptions } from 'swagger-ui-express';

const options :swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        tags: [
            {
                name: 'Product Operations',
                description: 'API operations related to product management'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: '1.0.0',
            description: 'API Docs for Product Management'
        }
    },
    apis: [
        './src/docs/*.ts'
    ]
} 

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
    customCss: `
        /* Hide default Swagger SVG logo */
        .topbar-wrapper .link svg {
            display: none !important;
        }

        /* Apply your custom logo */
        .topbar-wrapper .link {
            background-image: url('https://upload.wikimedia.org/wikipedia/commons/3/39/Cc-public_domain_mark_white.svg') !important;
            background-size: contain !important;
            background-repeat: no-repeat !important;
            background-position: center !important;
            width: 40px !important;
            height: 60px !important;
            display: block !important;
        }

        /* Optional: adjust topbar height */
        .topbar {
            padding: 10px 0 !important;
        }
    `,
    customSiteTitle: 'Product Administrator REST API Docs'
};

export default swaggerSpec
export {
    swaggerUiOptions
}