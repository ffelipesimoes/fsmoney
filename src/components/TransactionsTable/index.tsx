import { appendFile } from "fs";
import { useEffect, useState } from "react";
import { Container } from "./style";
import { api } from "../../services/api"

interface Transaction {
  id: number,
  title: string,
  amount: number,
  type: string,
  category: string,
  createdAt: string
}

export function TransactionTable(){
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
           
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className="deposit"> 
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(transaction.amount)}
                </td>
              <td> {transaction.category}</td>
              <td>
              {new Intl.DateTimeFormat('pt-BR').format(
                new Date(transaction.createdAt))}
              </td>
            </tr>
          ))}

          

          
        </tbody>
      </table>
    </Container>
  )
}