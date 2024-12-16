import React, { useEffect, useState } from 'react';
import clsx from 'clsx'
import styles from './AddressPage.module.scss';
import UnderLineComponent from '../../components/UnderLineComponent/UnderLineComponent'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/slices/userSlice';

const AddressPage = ({closeModal, onAddressChange}) => {
  const { user_address, _id } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // const [addresses, setAddresses] = useState([
  //   // { _id: 1, name: 'Võ Văn', phone: '0382868383', address: {home_address: "324 Xô Viết Nghệ Tĩnh ", commune: "Phường 24", district: "Quận Bình Thạnh", province: "TP. Hồ Chí Minh"}},
  //   // { _id: 2, name: 'Phi Thông', phone: '0987654321', address: {home_address: "324 Xô Viết Nghệ Tĩnh ", commune: "Phường 24", district: "Quận Bình Thạnh", province: "TP. Hồ Chí Minh"}},
  // ]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [newAddress, setNewAddress] = useState({ name: '', phone: '', address: '' });
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  const defaultAddress = user_address.find((addr) => addr.isDefault) || user_address[0];
  
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress?._id);

  useEffect(() => {
    if (defaultAddress) {
      setSelectedAddress(defaultAddress._id); // Đặt giá trị mặc định khi render
    }
  }, [defaultAddress]);

  const handleSelectAddress = (addressId) => {
    setSelectedAddress(addressId); 
  };

  const handleEditAddress = (address) => {
    setIsEditing(true);
    setNewAddress(address);
  };

  const handleSaveEditAddress = () => {
    // setAddresses(
    //   addresses.map((addr) => (addr.id === newAddress.id ? newAddress : addr))
    // );
    // setIsEditing(false);
    // setNewAddress({ name: '', phone: '', address: '' });
  };

  const handleAddNewAddress = () => {
    setIsAddingNew(true);
    setNewAddress({ id: Date.now(), name: '', phone: '', address: '' });
  };

  const handleSaveNewAddress = () => {
    // setAddresses([...addresses, newAddress]);
    // setIsAddingNew(false);
    // setNewAddress({ name: '', phone: '', address: '' });
  };

  const handleDeleteAddress = (addressId) => {
    // setAddresses(addresses.filter((addr) => addr.id !== addressId));
  };

  const handleConfirmAddress = () => {
    if (selectedAddress) {
      const address = user_address.find((addr) => addr._id === selectedAddress);
      onAddressChange(address); // Gọi callback để gửi địa chỉ lên CheckOutPage
      closeModal(); // Đóng modal
      console.log("addressPage", address)
    } else {
      alert('Vui lòng chọn địa chỉ.');
    }
  };

  // const handleConfirmAddress = async () => {
  //   if (selectedAddress) {
  //     const address = user_address.find((addr) => addr._id === selectedAddress);
  //     if (address) {
  //       try {
  //         // Gửi yêu cầu cập nhật đến API
  //         const response = await axios.post('/api/update-address', {
  //           userId: _id, // ID người dùng
  //           newAddress: address, // Địa chỉ mới
  //         });
  
  //         if (response.status === 200) {
  //           console.log("Cập nhật địa chỉ thành công:", response.data);
  
  //           // Gọi callback để gửi địa chỉ lên CheckOutPage
  //           onAddressChange(address);
  
  //           // Đóng modal
  //           closeModal();
  
  //           // (Tuỳ chọn) Hiển thị thông báo thành công
  //           alert('Địa chỉ đã được cập nhật thành công.');
  //         } else {
  //           throw new Error('Cập nhật địa chỉ thất bại.');
  //         }
  //       } catch (error) {
  //         console.error('Lỗi khi cập nhật địa chỉ:', error);
  //         alert('Đã xảy ra lỗi khi cập nhật địa chỉ. Vui lòng thử lại.');
  //       }
  //     } else {
  //       alert('Không tìm thấy địa chỉ.');
  //     }
  //   } else {
  //     alert('Vui lòng chọn địa chỉ.');
  //   }
  // };

  return (
    <div className={styles.addressPage}>
      <ul>
        {user_address.map((address) => (
          <li key={address._id} className={styles.addressItem}>
            <div className={styles.all}>
              <div className={styles.checkAndInfo}>
                <div>
                  <input
                    type="checkbox"
                    checked={selectedAddress === address._id}
                    onChange={() => handleSelectAddress(address._id)}
                  />
                </div>
                <div className={styles.info}>
                  <p>
                    {address.name}
                  </p>
                  <p>
                    {address.phone}
                  </p>
                  <p>
                  <p>Đia chỉ: {address?.home_address}, {address?.commune}, {address?.district}, {address?.province}</p>
                  </p>
                </div>
              </div>
              <div className={styles.btn}>
                <button className={clsx(styles.button, styles.update)} onClick={() => handleEditAddress(address)}>Cập nhật</button>
                <button className={clsx(styles.button, styles.delete)} onClick={() => handleDeleteAddress(address.id)}>Xóa</button>
              </div>
            </div>
            <UnderLineComponent
                width="100%"
                height="1px"
                background="rgba(0, 0, 0, 0.2)"
            />
          </li>
        ))}
      </ul>

      {isEditing && (
        <div className={styles.AddressForm}>
          <h3>Cập Nhật Địa Chỉ</h3>
          <UnderLineComponent 
                width="100%"
                height="1px"
                background="rgba(0, 0, 0, 0.2)"
          />
          <input
            type="text"
            placeholder="Tên người nhận"
            value={newAddress.name}
            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            value={newAddress.phone}
            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Địa chỉ"
            value={newAddress.address}
            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
          />
          <div style={{display: "flex", justifyContent: "center"}}>
            <button className={styles.button} onClick={handleSaveEditAddress}>Lưu</button>
          </div>
        </div>
      )}

      {isAddingNew && (
        <div className={styles.AddressForm}>
          <h3>Thêm Địa Chỉ Mới</h3>
          <input
            type="text"
            placeholder="Tên người nhận"
            value={newAddress.name}
            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            value={newAddress.phone}
            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Địa chỉ"
            value={newAddress.address}
            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
          />
          <div style={{display: "flex", justifyContent: "center"}}>
          <button className={styles.button} onClick={handleSaveNewAddress}>Lưu Địa Chỉ Mới</button>
          </div>
        </div>
      )}
      {isEditing || isAddingNew ||
        <div style={{display: "flex", gap: "10px", margin: "30px 0 0 0", justifyContent: "flex-end"}}>
          <button className={clsx(styles.button, styles.add)} onClick={handleAddNewAddress}>Thêm Địa Chỉ Mới</button>
          <button className={clsx(styles.button, styles.confirm)} onClick={() => {handleConfirmAddress(); closeModal()}}>Xác Nhận</button>
      </div>
      }
    </div>
  );
};

export default AddressPage;
