import logo from './logo.svg';
import './App.css';
import Switch from './puyo/Switch'
import MediaQuery from 'react-responsive'

function App() {

  return (
    <div>
      <MediaQuery query='(max-width: 767px)'>
        <div className='wrapper' style={{
            overflow: 'hidden'
          }}>
          <h2 className="bg-info text-white px-4">フィバとこぷよツール</h2>
          <div className='main'>
            <Switch/>
          </div>
          <footer className='bg-dark text-white py-3 mt-3'>
            <p className='text-center px-5 mx-5 pt-3'>バグ報告、ご意見ご要望ご感想は<a href="https://twitter.com/yayuyayu_puyo"><span className='fab fa-twitter'></span>こちら<br/>(@yayuyayu_puyo)</a>まで</p>
            <p className='text-center px-5 mx-5 '>©︎ 2021.09 yayuyayu_puyo</p>
          </footer>
        </div>
      </MediaQuery>
      <MediaQuery query='(min-width: 768px)'>
        <div className='wrapper'>
          <h1 className="bg-info text-white display-4 px-4">フィバとこぷよツール</h1>
          <div className='main'>
            <Switch/>
          </div>
          <footer className='bg-dark text-white py-3 mt-3'>
            <p className='text-left px-5 mx-5 float-left pt-3'>バグ報告、ご意見ご要望ご感想は<a href="https://twitter.com/yayuyayu_puyo"><span className='fab fa-twitter'></span>こちら(@yayuyayu_puyo)</a>まで</p>
            <p className='text-right px-5 mx-5 pt-3'>©︎ 2021.09 yayuyayu_puyo</p>
          </footer>
        </div>
      </MediaQuery>
    </div>
  );
}

export default App;
