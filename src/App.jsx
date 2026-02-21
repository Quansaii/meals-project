import { useState } from 'react'
import { HomePage } from './HomePage'
import { CreateRecipePage } from './RecipePage'
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'

function App() {

  const [recipe, setRecipe] = useState(null)


  return(
    <Routes>
      <Route index element={<HomePage onUpdate={setRecipe}></HomePage>}/>
      <Route path="/recipe" element={<CreateRecipePage data={recipe}/>}/>
    </Routes>
  )
}

export default App
