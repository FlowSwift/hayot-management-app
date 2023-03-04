import './App.css';
import ProductList from './products/ProductList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hayot Management
        </p>
      </header>
      <main>
        <ProductList />
      </main>
    </div>
  );
}

export default App;
