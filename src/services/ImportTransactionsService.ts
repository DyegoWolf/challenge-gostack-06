import {
  getCustomRepository,
  getRepository,
  In,
  createConnections
} from 'typeorm';
import csvParse from 'csv-parse';
import fs from 'fs';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface CSVTransaction{
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    const transactionsReadStream = fs.createReadStream(filePath);

    // Configurações de leitura do arquivo .csv
    const parsers = csvParse({
      from_line: 2, // Leitura inicializada a partir da linha 2
      ltrim: true,
      rtrim: true
    });

    // Leitura das linhas do arquivo .csv conforme estejam disponíveis
    const parseCSV = transactionsReadStream.pipe(parsers);

    // Variáveis utilizadas na estratégia Book Insert
    const transactions: CSVTransaction[] = [];
    const categories: string[] = [];

    parseCSV.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim()
      );

      // Se a leitura não for bem sucedida, não criar informação
      if(!title || !type || !value){
        return;
      }

      categories.push(category);
      transactions.push({title, type, value, category});
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    // Busca de categorias existentes
    const existentCategories = await categoriesRepository.find({
      where: {
        title: In(categories)
      }
    });

    const existentCategoriesTitles = existentCategories.map(
      (category: Category) => category.title
    );

    const addCategoryTitles = categories
      .filter(category => !existentCategoriesTitles.includes(category))
      .filter((value, index, self) => self.indexOf(value) === index);

    const newCategories = categoriesRepository.create(
      addCategoryTitles.map(title => ({
        title
      }))
    );

    await categoriesRepository.save(newCategories);

    const finalCategories = [...newCategories, ...existentCategories];
    const newTransactions = transactionsRepository.create(
      transactions.map(transaction => ({
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        category: finalCategories.find(
          category => category.title === transaction.category
        )
      }))
    );

    await transactionsRepository.save(newTransactions);

    //console.log(categories);
    //console.log(transactions);

    // Exclusão do arquivo .csv após a leitura
    await fs.promises.unlink(filePath);

    return(newTransactions);
  }
}

export default ImportTransactionsService;
