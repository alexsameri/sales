import Dexie, { Table } from 'dexie';

export interface Customer {
  id?: number;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

export interface Sale {
  id?: number;
  customerId: number;
  amount: number;
  description: string;
  date: Date;
  type: 'product' | 'service';
  duration?: number; // Duration in hours for services
  status?: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

export class SalesDB extends Dexie {
  customers!: Table<Customer>;
  sales!: Table<Sale>;

  constructor() {
    super('salesDB');
    this.version(2).stores({
      customers: '++id, name, email',
      sales: '++id, customerId, date, type'
    });
  }
}

export const db = new SalesDB();