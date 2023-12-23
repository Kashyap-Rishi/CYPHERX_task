
import './App.css'
import Card from './components/cards/Card'
import DataProvider from './context/data/DataProvider'
import ThemeProvider from './context/theme/ThemeProvider'

function App() {
 

  return (
    <>
   <ThemeProvider>
    <DataProvider>
       <Card/>
        </DataProvider>
        </ThemeProvider>
    </>
  )
}

export default App
