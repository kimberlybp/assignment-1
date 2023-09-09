import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Detail from './pages/Detail.tsx'

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail" element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App
