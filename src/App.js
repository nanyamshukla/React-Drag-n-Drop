import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className='App'>
      <Header title={`Drag & Drop in React`} />
      <Dashboard />
    </div>
  );
}

export default App;
