import { inject, injectable } from 'inversify';
import { CreateData } from '../types/create-event.interface';
import { APP_DI_TYPES } from '../app/app.di-types';
import { DatabaseService } from '../database/database.service';

@injectable()
export class CrudService {
  constructor(
    @inject(APP_DI_TYPES.DatabaseService) private databaseService: DatabaseService
  ) {}

  async create(data: CreateData) {
    if (typeof data === 'undefined') {
      throw new Error('Data is empty!');
    }
    console.log('saving...', data);
    return true;
  }

  async read() {
    return 'list of items';
  }
}
