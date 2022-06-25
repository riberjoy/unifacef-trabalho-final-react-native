

import create from 'zustand'
import { api } from '../api';


export interface ItemHistotico {
  jogoId: number;
  titulo: string;
  valor: number;
}

interface HistoricoStorePros {
  historico: ItemHistotico[];
  loadData(userId: number, userEmail: string): Promise<void>;
}

export const useHistoricoStore = create<HistoricoStorePros>(set => ({
  historico: [],
  loadData: async (userId: number, userEmail: string) => {
    const response = await api.get('pedidos', {
      params: {
        userId,
        userEmail
      }
    });

    let myHistory: any[] = [];
    myHistory = response.data.map((item: { items: ItemHistotico[] }) => item.items) || [];

    if (myHistory.length > 0) {
      myHistory = myHistory.reduce((primeiro: ItemHistotico[], segundo: ItemHistotico[]) => ([...primeiro, ...segundo]));
    }
    set(state => ({ historico: myHistory as ItemHistotico[] }));
  },
}))