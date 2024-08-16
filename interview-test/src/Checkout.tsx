import { useEffect, useState } from 'react';
import styles from './Checkout.module.css';
import { LoadingIcon } from './Icons';
import { getProducts,Product} from './dataService';

// You are provided with an incomplete <Checkout /> component.
// You are not allowed to add any additional HTML elements.
// You are not allowed to use refs.

// Demo video - You can view how the completed functionality should look at: https://drive.google.com/file/d/1bcXpGUzJUyUwITOqEn8QPj8ZOgUbTGQD/view?usp=sharing

// Once the <Checkout /> component is mounted, load the products using the getProducts function.
// Once all the data is successfully loaded, hide the loading icon.
// Render each product object as a <Product/> component, passing in the necessary props.
// Implement the following functionality:
//  - The add and remove buttons should adjust the ordered quantity of each product
//  - The add and remove buttons should be enabled/disabled to ensure that the ordered quantity can’t be negative and can’t exceed the available count for that product.
//  - The total shown for each product should be calculated based on the ordered quantity and the price
//  - The total in the order summary should be calculated
//  - For orders over $1000, apply a 10% discount to the order. Display the discount text only if a discount has been applied.
//  - The total should reflect any discount that has been applied
//  - All dollar amounts should be displayed to 2 decimal places

type ProductComponentProps = {
  id: number;
  name: string;
  availableCount: number;
  price: number;
  orderedQuantity: number;
  total: number;
  onAdd: () => void;
  onRemove: () => void;
};
const ProductComponent = ({ id, name, availableCount, price, orderedQuantity, total, onAdd, onRemove }: ProductComponentProps) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{availableCount}</td>
      <td>${price.toFixed(2)}</td>
      <td>{orderedQuantity}</td>
      <td>${total.toFixed(2)}</td>
      <td>
        <button className={styles.actionButton} onClick={onAdd} disabled={orderedQuantity >= availableCount}>+</button>
        <button className={styles.actionButton} onClick={onRemove} disabled={orderedQuantity <= 0}>-</button>
      </td>
    </tr>
  );
};

const Checkout = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    getProducts().then(products => {
      setProducts(products);
      setLoading(false);
    });
  }, []);

  const handleAdd = (id: number) => {
    setOrder(prevOrder => {
      const newOrder = { ...prevOrder, [id]: (prevOrder[id] || 0) + 1 };
      return newOrder;
    });
  };

  const handleRemove = (id: number) => {
    setOrder(prevOrder => {
      const newOrder = { ...prevOrder, [id]: (prevOrder[id] || 0) - 1 };
      return newOrder;
    });
  };

  const calculateTotal = () => {
    let total = 0;
    products.forEach(product => {
      const quantity = order[product.id] || 0;
      total += quantity * product.price;
    });
    return total;
  };

  const total = calculateTotal();
  const discount = total > 1000 ? total * 0.1 : 0;
  const finalTotal = total - discount;

  return (
    <div>
      <header className={styles.header}>
        <h1>Electro World</h1>
      </header>
      <main>
        {loading ? <LoadingIcon /> : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th># Available</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <ProductComponent
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  availableCount={product.availableCount}
                  price={product.price}
                  orderedQuantity={order[product.id] || 0}
                  total={(order[product.id] || 0) * product.price}
                  onAdd={() => handleAdd(product.id)}
                  onRemove={() => handleRemove(product.id)}
                />
              ))}
            </tbody>
          </table>
        )}
        <h2>Order summary</h2>
        <p>Discount: ${discount.toFixed(2)}</p>
        <p>Total: ${finalTotal.toFixed(2)}</p>
      </main>
    </div>
  );
};

export default Checkout;