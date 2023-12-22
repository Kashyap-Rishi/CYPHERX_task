
import './App.css'
import Card from './components/cards/Card'
import DataProvider from './context/data/DataProvider'

function App() {
 

  return (
    <>
    <DataProvider>
       <Card/>
        </DataProvider>
    </>
  )
}

export default App
