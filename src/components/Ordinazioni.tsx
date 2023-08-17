import React, {FormEvent, useState} from 'react'
import { FaBitbucket } from "react-icons/fa6" 
import "./style.css"

interface Order {
    nome: string;
    content: string;
    quantity: number;
}

const Ordinazioni = () => {
   const [formm, setFormm] = useState<Order>({
    nome: '',
    content: '',
    quantity: 0
   })

   const [orders, setOrders] = useState<Order[]>([]);

   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setOrders(prev => ([...prev, formm]));
   }

        const handleDelete = (indexdel: number) => {
            setOrders((orders) => 
            orders.filter((_, index)=> index !== indexdel)
            )    
            
        }

  return (
    <div>
       <form onSubmit={handleSubmit} className='form'>
            <input type="text" placeholder='inserisci nome' value={formm.nome} onChange={e => setFormm(prev => ({
                ...prev,
                nome: e.target.value
            }))} />
            <input type="text" placeholder='inserisci il contenuto' value={formm.content}  onChange={e => setFormm(prev => ({
                ...prev,
                content: e.target.value
            }))}/>
            <input type="text" placeholder='inserisci il numero' value={formm.quantity}  onChange={e => setFormm(prev => ({
                ...prev,
                quantity: +e.target.value
            }))} />
            <button type='submit'> vai </button>
       </form>

       <table className='tabella'>
        <tr>
            <th>
                nome
            </th>
            <th>
                contenuto
            </th>
            <th>
                quantita
            </th>
            <th>
                gesture
            </th>
            
        </tr>
        {orders.map((order, index) => (
            <tr>
                <th>
                    {order.nome}
                </th>
                <th>
                    {order.content}
                </th>
                <th>
                    {order.quantity}
                </th>
                <th>
                <button onClick={() => handleDelete(index)}><FaBitbucket/></button>
                </th>
                
            </tr>
        ))}
       </table>
    </div>
  )
}

export default Ordinazioni