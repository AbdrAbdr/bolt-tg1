import React, { useState } from 'react';
import { Star, CheckCircle, XCircle } from 'lucide-react';
import type { UserProfile } from '../types';
import api from '../services/api';
import { useTranslation } from 'react-i18next';

interface Status {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface StatusPurchaseProps {
  user: UserProfile | null;
  onStatusChange: (status: string) => void;
}

const statuses: Status[] = [
  {
    id: 'gold',
    name: 'Gold',
    price: 100,
    description: 'Unlock premium features'
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 50,
    description: 'Get access to exclusive content'
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 200,
    description: 'Enjoy enhanced benefits'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 300,
    description: 'Experience the ultimate privileges'
  }
];

export function StatusPurchase({ user, onStatusChange }: StatusPurchaseProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const handlePurchase = async (statusId: string) => {
    if (!user) {
      setError('User not logged in');
      return;
    }

    const status = statuses.find(s => s.id === statusId);
    if (!status) {
      setError('Invalid status');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post(`/virtual-currency/purchase`, {
        itemId: statusId,
        amount: status.price
      });
      if (response.data.success) {
        onStatusChange(statusId);
      } else {
        setError('Payment failed');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold flex items-center mb-6">
        <Star className="w-6 h-6 mr-2 text-yellow-500" />
        {t('purchase_status')}
      </h2>

      <div className="space-y-4">
        {statuses.map((status) => (
          <div
            key={status.id}
            className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{status.name}</h3>
              <span className="text-sm font-medium text-gray-600">
                {status.price} XTR
              </span>
            </div>
            <p className="text-sm text-gray-500">{status.description}</p>
            <div className="mt-2 flex justify-end">
              <button
                onClick={() => handlePurchase(status.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? 'Purchasing...' : 'Purchase'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-800 rounded-lg flex items-center space-x-2">
          <XCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
