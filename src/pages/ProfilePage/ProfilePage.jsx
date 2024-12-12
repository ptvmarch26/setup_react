import React from 'react'
import { useSelector } from "react-redux";
import styles from './ProfilePage.module.scss'
import UserProfileComponent from '../../components/UserProfileComponent/UserProfileComponent'

const ProfilePage = () => {
    const { isAuthenticated, user_name, user_avt_img, _id, full_name } = useSelector(
        (state) => state.user
    );
    return (
        <div className={styles.main}>
            <div className='grid wide'>
                <UserProfileComponent
                    full_name={full_name}
                    src_img={user_avt_img}
                    user_name={user_name}
                    className={styles.user}
                />
            </div>
        </div>
    )
}

export default ProfilePage