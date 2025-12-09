import { Router } from 'express'
import { body, param } from 'express-validator'
import { handleInputErrors } from './middleware';
import { 
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    updateAvailability,
    deleteProduct
} from './handlers/product';

const router = Router();

router.get('/', getProducts);

router.get('/:id', 
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    getProductById
);

router.post('/',
    body('name')
        .notEmpty().withMessage('Product name cannot be empty'),
    body('price')
        .notEmpty().withMessage('Product price cannot be empty')
        .isNumeric().withMessage('Product price must be a number')
        .custom(value => value > 0).withMessage('Product price must be greater than 0'),
    handleInputErrors,
    createProduct
);

router.put('/:id',
    param('id').isInt().withMessage('Invalid ID'),
    body('name')
        .notEmpty().withMessage('Product name cannot be empty'),
    body('price')
        .notEmpty().withMessage('Product price cannot be empty')
        .isNumeric().withMessage('Product price must be a number')
        .custom(value => value > 0).withMessage('Product price must be greater than 0'),
    body('availability').isBoolean().withMessage('Invalid availability value'),
    handleInputErrors,
    updateProduct,
);

router.patch('/:id', 
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    updateAvailability
);

router.delete('/:id', 
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    deleteProduct
);

export default router