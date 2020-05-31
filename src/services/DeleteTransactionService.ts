import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  transactionId: string;
}

class DeleteTransactionService {
  public async execute({ transactionId }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transaction = transactionsRepository.findOne({ id: transactionId });

    if (!transaction) {
      throw new AppError('There is no transaction with the informed id!');
    }

    await transactionsRepository.delete(transactionId);
  }
}

export default DeleteTransactionService;
