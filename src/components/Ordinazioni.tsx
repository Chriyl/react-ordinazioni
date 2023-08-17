import  { FormEvent, useState, useEffect } from 'react';
import { FaBitbucket } from 'react-icons/fa6';
import './style.css';

interface Order {
  nome: string;
  content: string;
  quantity: number;
}

const Ordinazioni = () => {
  const min = 1
  const max = 255
  const [value, setValue] = useState(1);
  const handleValue = (newValue: number) => {
    const value = Math.max(min, Math.min(max, newValue));
    setValue(value);
  };
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
    console.log(value)
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
          required
          value={formm.nome}
          onChange={(e) => setFormm((prev) => ({ ...prev, nome: e.target.value }))}
        />
        <input
          type="text"
          placeholder='inserisci il contenuto'
          value={formm.content}
          required
          onChange={(e) => setFormm((prev) => ({ ...prev, content: e.target.value }))

        }
        />
       <input
  type="number"
  min={1}
  placeholder='inserisci il numero'
  value={formm.quantity}
  required
  onChange={(e) => {
    const quantityValue = +e.target.value;
    handleValue(quantityValue); // Chiamata a handleValue qui
    setFormm((prev) => ({ ...prev, quantity: quantityValue }));
  }}
/>


        <button type='submit'>vai</button>
      </form>

      <table className='tabella'>
      
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.nome}</td>
              <td>{order.content}</td>
              <td>{order.quantity /*aaaa*/}</td>
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
