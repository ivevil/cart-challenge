import Products from './components/Products';
import { useState, useEffect } from 'react';
import { Product } from './model/Product';

function App(): JSX.Element {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('products.json')
      .then(response => response.json())
      .then(productJson => setProducts(productJson));
  }, [])

  return (
    <div>
      <Products products={products} />
    </div>
  );
}

export default App;
