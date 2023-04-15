import './style/navbar.css';

function Navbar({tab, setTab}) {
    return (
        <div className='menu-tab'>
            <ul>
            <li onClick={() => setTab(0)}>PHIM ĐANG CHIẾU</li>
            <li onClick={() => setTab(1)}>PHIM SẮP CHIẾU</li>
            </ul>
            {/*<p>Xem thêm</p>*/}
        </div>
    );
  }
  export default Navbar