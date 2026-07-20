import express from 'express';
import { 
  getAllQuotes, 
  getQuoteById, 
  createQuote, 
  updateQuote, 
  deleteQuote 
} from '../controllers/quoteController.js';

const router = express.Router();

router.get('/', getAllQuotes);
router.get('/:id', getQuoteById);
router.post('/', createQuote);
router.put('/:id', updateQuote);
router.delete('/:id', deleteQuote);

export default router;