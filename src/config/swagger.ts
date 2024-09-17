import swaggerJSDoc from 'swagger-jsdoc';
import {SwaggerUiOptions} from 'swagger-ui-express';

const option: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    tags: [{name: 'Products', description: 'API for products'}],
    info: {
      title: 'REST-API Node.js / Express / TypeScript / Sequelize',
      version: '1.0.0',
      description: 'REST API Docs products',
    },
  },
  apis: ['./src/router.ts'],
};

const swaggerSpec = swaggerJSDoc(option);

const swaggerUIOptions: SwaggerUiOptions = {
  customCss: `.topbar-wrapper  .link{
     content: url('https://img.freepik.com/vector-gratis/vector-degradado-logotipo-colorido-pajaro_343694-1365.jpg?t=st=1725747541~exp=1725751141~hmac=6c84f1a3beec608a755baec5175e815cb3a21ece0a50499522ffb1d057491293&w=740');
     height: 100px;
     width: 80px;
    }`,
  customSiteTitle: 'Documentation API Products',
};

export default swaggerSpec;

export {swaggerUIOptions};
