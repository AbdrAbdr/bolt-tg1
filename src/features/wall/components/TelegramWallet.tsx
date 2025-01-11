import React from 'react';
import { Wallet } from 'lucide-react';
import WebApp from '@twa-dev/sdk';
import { useTranslation } from 'react-i18next';

interface TelegramWalletProps {
  onWalletConnect: () => void;
}

export function TelegramWallet({ onWalletConnect }: TelegramWalletProps) {
  const { t } = useTranslation();

  const handleConnectWallet = () => {
    WebApp.openTelegramLink('https://wallet.telegram.org');
    onWalletConnect();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center">
          <Wallet className="w-6 h-6 mr-2 text-blue-500" />
          {t('connect_wallet')}
        </h2>
      </div>
      <button
        onClick={handleConnectWallet}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {t('connect_wallet_button')}
      </button>
    </div>
  );
}
