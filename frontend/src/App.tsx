import { BrowserRouter, Routes, Route} from 'react-router-dom'
import ProductList from './pages/ProductList'
import ProductAdd from './pages/ProductAdd'
import ProductEdit from './pages/ProductEdit'

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto px-4">
        <nav className="py-4 flex gap-4">
          <a href="/" className="text-blue-500 font-bold">Shop Manager</a>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<ProductAdd />} />
          <Route path="/edit/:id" element={<ProductEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
