import {getCustomRepository, getRepository} from 'typeorm';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';
import AppError from '../errors/AppError';

interface Request{
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({title, type, value, category}: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    if(type != 'income' && type != 'outcome'){
      throw new AppError('Invalid type! Must be income or outcome.', 400);
    }

    const {total} = await transactionsRepository.getBalance();
    if(type == 'outcome' && value > total){
      throw new AppError('This transaction extrapoles your finances!', 400);
    }

    let transactionCategory = await categoriesRepository.findOne({
      where: {title: category}
    });

    if(!transactionCategory){
      transactionCategory = categoriesRepository.create({
        title: category
      });

      await categoriesRepository.save(transactionCategory);
    }

    const newTransaction = transactionsRepository.create({
      title,
      type,
      value,
      category: transactionCategory
    });

    await transactionsRepository.save(newTransaction);

    return(newTransaction);
  }
}

export default CreateTransactionService;
