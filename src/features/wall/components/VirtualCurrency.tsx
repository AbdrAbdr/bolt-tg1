import React from 'react';
import { Coins } from 'lucide-react';
import type { VirtualCurrency as VirtualCurrencyType } from '../types';

interface VirtualCurrencyProps {
  currency: VirtualCurrencyType;
}

export function VirtualCurrency({ currency }: VirtualCurrencyProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Virtual Wallet</h2>
        <div className="flex items-center space-x-2">
          <Coins className="w-6 h-6 text-yellow-500" />
          <span className="text-2xl font-bold">{currency.balance}</span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Recent Transactions</h3>
        {currency.transactions.slice(0, 5).map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center p-2 bg-gray-50 rounded"
          >
            <div>
              <p className="font-medium">{transaction.reason}</p>
              <p className="text-sm text-gray-500">
                {transaction.timestamp.toLocaleDateString()}
              </p>
            </div>
            <span className={`font-bold ${
              transaction.type === 'earned' ? 'text-green-500' : 'text-red-500'
            }`}>
              {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
