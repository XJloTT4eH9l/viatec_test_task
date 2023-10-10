import Header from './components/Header/Header';
import List from './components/List/List';
import Footer from './components/Footer/Footer';
import './App.scss'

function App() {

  return (
    <>
    <Header />
    <div className="wrapper">
      <main>
        <List />
      </main>
      <Footer />
    </div>
    </>
  )
}

export default App
