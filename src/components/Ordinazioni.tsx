import  { FormEvent, useState, useEffect } from 'react';
import { FaBitbucket } from 'react-icons/fa6';
import './style.css';

interface Order {
  nome: string;
  content: string;
  quantity: number;
}

const Ordinazioni = () => {
  const [formm, setFormm] = useState<Order>({
    nome: '',
    content: '',
    quantity: 1,
  });

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newOrders = [...orders, formm];
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));
    setFormm({
      nome: '',
      content: '',
      quantity: 0,
    });
  };

  const handleDelete = (indexdel: number) => {
    const newOrders = orders.filter((_, index) => index !== indexdel);
    setOrders(newOrders);
    localStorage.setItem('orders', JSON.stringify(newOrders));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='form'>
        {/* ... your input fields */}
        <input
          type="text"
          placeholder='inserisci nome'
          value={formm.nome}
          onChange={(e) => setFormm((prev) => ({ ...prev, nome: e.target.value }))}
        />
        <input
          type="text"
          placeholder='inserisci il contenuto'
          value={formm.content}
          onChange={(e) => setFormm((prev) => ({ ...prev, content: e.target.value }))}
        />
        <input
          type="number"
          placeholder='inserisci il numero'
          value={formm.quantity}
          onChange={(e) =>
            setFormm((prev) => ({ ...prev, quantity: +e.target.value }))
          }
        />

        <button type='submit'>vai</button>
      </form>

      <table className='tabella'>
      
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.nome}</td>
              <td>{order.content}</td>
              <td>{order.quantity}</td>
              <td>
                <button onClick={() => handleDelete(index)}>
                  <FaBitbucket />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ordinazioni;
