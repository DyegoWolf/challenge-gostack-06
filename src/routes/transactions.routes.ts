import { Router } from 'express';
import {getCustomRepository} from 'typeorm';
import multer from 'multer';

import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionService from '../services/ImportTransactionsService';
import TransactionsRepository from '../repositories/TransactionsRepository';
import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);
const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionsRepository.find();
  const balance = await transactionsRepository.getBalance();

  return response.json({transactions, balance});
});

transactionsRouter.post('/', async (request, response) => {
  const createTransaction = new CreateTransactionService();

  const {title, type, value, category} = request.body;
  const newTransaction = await createTransaction.execute({
    title,
    type,
    value,
    category
  });

  return response.json(newTransaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const deleteTransactionService = new DeleteTransactionService();

  const {id} = request.params;
  await deleteTransactionService.execute(id);

  return response.status(204).send();
});

transactionsRouter.post(
  '/import',
  upload.single('file'), // Middleware de importação do arquivo .csv
  async (request, response) => {
    const importTransactions = new ImportTransactionService();

    const transactions = await importTransactions.execute(request.file.path); // Diretório do arquivo .csv

    return response.json(transactions);
});

export default transactionsRouter;
