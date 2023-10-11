import Header from './components/Header/Header';
import List from './components/List/List';
import Footer from './components/Footer/Footer';
import Container from 'react-bootstrap/Container';

function App() {

  return (
    <>
    <Header />
    <Container fluid="sm">
      <main className='py-4'>
        <List />
      </main>
      <Footer />
    </Container>
    </>
  )
}

export default App
