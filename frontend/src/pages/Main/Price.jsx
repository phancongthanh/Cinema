import React from 'react'
import Table from './Price/components/table';
import myIcon from './Price/icons/icon-gv.png'


const Price = () => {
  const columns = ['Thường', 'VIP', 'Sweetbox'];

  const data = [
    { header: 'Trước 12:00', Thường: '50.000', VIP: '60.000', Sweetbox: '130.000' },
    { header: 'Từ 12:00 đến trước 17:00', Thường: '65.000', VIP: '70.000', Sweetbox: '150.000' },
    { header: 'Từ 17:00 đến trước 23:00', Thường: '75.000', VIP: '85.000', Sweetbox: '170.000' },
    { header: 'Từ 23:00', Thường: '60.000', VIP: '65.000', Sweetbox: '140.000' },
  ];
  return (
    <div className='price' >
      <br />
      <br />
      <h1 style={{ textAlign: 'center', fontFamily: 'Arial', fontSize:'36px' }}>GIÁ VÉ</h1>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src={myIcon} alt="My Image" />
    </div>
    <br />
    <h2 style={{ textAlign: 'center', fontFamily: 'Arial', fontSize:'24px', color:'gray' }}>GIÁ VÉ XEM PHIM</h2>
<br />
      <h3 style={{fontFamily: 'Arial', fontSize:'24px', color:'black', margin:'2% 10%'}}>1. GIÁ VÉ XEM PHIM 2D</h3>
      <Table data={data} columns={columns} />
      <br />
      <h3 style={{fontFamily: 'Arial', fontSize:'24px', color:'black', margin:'2% 10%'}}>2. GIÁ VÉ XEM PHIM 3D</h3>
      <Table data={data} columns={columns} />
      <div style={{fontFamily: 'Arial', color:'black', margin:'2% 10%', fontSize:'17px'}}>
        <p style={{fontWeight:'bold'}}>
        * Giá vé đối với các đối tượng khán giả ưu tiên (khi trực tiếp sử dụng dịch vụ xem phim tại rạp chiếu phim):
        </p>
        <p style={{margin:'0% 3%'}}>- Giảm 20% giá vé theo qui định đối với: Trẻ em (người dưới 16 tuổi), người cao tuổi 
        (công dân Việt Nam từ đủ 60 tuổi trở lên), người có công với cách mạng, người</p>
        <p style={{margin:'0% 3%'}}>
        - Giảm 50% giá vé theo qui định đối với: Người khuyết tật nặng.
        </p>
        <p style={{margin:'0% 3%'}}>
        - Giảm giá vé 100% đối với: Người khuyết tật đặc biệt nặng, trẻ em dưới 0.7m đi kèm với người lớn.
        </p>
        <br />
        <p style={{margin:'0% 5%', fontWeight:'bold', fontStyle:'italic'}}> Điều kiện:</p>
        <p style={{margin:'0% 5%'}}>- Chỉ áp dụng khi mua vé tại quầy (không áp dụng khi mua online). <br></br>
- Các đối tượng khán giả trên phải xuất trình giấy tờ chứng minh khi mua vé xem phim và trước khi vào phòng chiếu. Cụ thể: </p>
        <p style={{margin:'0% 6%'}}>+ Trẻ em (trường hợp trẻ em từ 14-16 tuổi), người cao tuổi: xuất trình "Căn cước công dân".<br></br>
+ Người có công với cách mạng: xuất trình giấy xác nhận theo quy định.<br></br>
+ Người có hoàn cảnh đặc biệt khó khăn: xuất trình "Giấy chứng nhận hộ nghèo".<br></br>
+ Người khuyết tật: xuất trình "Giấy xác nhận khuyết tật".</p>
        <p style={{fontWeight:'bold',margin:'1% 0%' }}>
        * Ưu đãi cho học sinh, sinh viên từ 22 tuổi trở xuống: Đồng giá 50.000đ /vé 2D cho tất cả các suất chiếu phim từ Thứ 2 đến Thứ 6 (chỉ áp dụng cho hình thức mua vé trực tiếp tại quầy, mỗi thẻ được mua 1 vé/ngày - vui lòng xuất trình thẻ U22 và thẻ HSSV khi mua vé).
        <br></br>
        <br />
* Khán giả nghiêm túc thực hiện xem phim đúng độ tuổi theo phân loại phim: P, C13, C16, C18. (Trường hợp vi phạm sẽ xử phạt theo Quy định tại Nghị định 128/2022/NĐ-CP ngày 30/12/2022).
<br></br>
<br />
* Không bán vé cho trẻ em dưới 13 tuổi đối với các suất chiếu phim kết thúc sau 22h00 và không bán vé cho trẻ em dưới 16 tuổi đối với các suất chiếu phim kết thúc sau 23h00.
        </p>
        <p style={{fontWeight:'bold',margin:'1% 0%' }}>* Áp dụng giá vé ngày Lễ, Tết cho các ngày:</p>
        <p style={{margin:'0% 3%'}}> - Các ngày nghỉ Lễ, Tết theo quy định của nhà nước: Tết Nguyên Đán, Tết Dương Lịch, ngày Giỗ Tổ Hùng Vương 10/3 AL, ngày 30/4, 1/5, 2/9.
          <br></br>
          - Các ngày: 14/2, 8/3, 24/12.
          <br></br>
          - Các ngày: Nghỉ bù do nghỉ Lễ, Tết trùng vào thứ 7, Chủ Nhật.
        </p>
      </div>

    </div>
    
  )
}

export default Price