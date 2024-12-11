import React from 'react'
import styles from './ProfilePage.module.scss'
import UserProfileComponent from '../../components/UserProfileComponent/UserProfileComponent'

const ProfilePage = () => {
    return (
        <div className={styles.main}>
            <div className='grid wide'>
                <UserProfileComponent 
                    className={styles.user}
                />
            </div>
        </div>
    )
}

export default ProfilePage