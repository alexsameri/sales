import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { format } from 'date-fns';

export function Dashboard() {
  const sales = useLiveQuery(() => 
    db.sales
      .orderBy('date')
      .reverse()
      .limit(10)
      .toArray()
  );

  const customers = useLiveQuery(() => db.customers.toArray());

  const getCustomerName = (id: number) => {
    return customers?.find(c => c.id === id)?.name || 'Unknown';
  };

  const totalSales = sales?.reduce((sum, sale) => sum + sale.amount, 0) || 0;

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
        <p className="text-3xl font-bold text-indigo-600">${totalSales.toFixed(2)}</p>
        <p className="text-gray-500">Total Sales</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Sales</h2>
        <div className="space-y-4">
          {sales?.map(sale => (
            <div key={sale.id} className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{getCustomerName(sale.customerId)}</p>
                  <p className="text-sm text-gray-500">{sale.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${sale.amount.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{format(sale.date, 'MMM d, yyyy')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}