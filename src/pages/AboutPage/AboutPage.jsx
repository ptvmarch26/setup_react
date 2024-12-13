import React, { useEffect } from 'react'
import styles from './AboutPage.module.scss'
import about1 from '../../assets/images/about1.svg'
import about2 from '../../assets/images/about2.svg'
import about4 from '../../assets/images/about4.svg'
import AboutMeComponent from '../../components/AboutMeComponent/AboutMeComponent'
import UnderLineComponent from '../../components/UnderLineComponent/UnderLineComponent'

const AboutPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className={styles.main}>
            <div className='grid wide'>
                <div className={styles.aboutImg}>
                    <div className={styles.info}>
                        <h3>Welcome to the</h3>
                        <h2>PAWFECT</h2>
                        <p>Only the best for your best friends</p>
                    </div>
                </div>
                <AboutMeComponent
                    avt={about2}
                    aboutTitle="Về chúng tôi"
                    aboutPara={`Chào mừng đến với Pawfect Petcare Center, nơi chúng tôi mang đến những sản phẩm chất lượng và dịch vụ tốt nhất cho những người bạn bốn chân yêu quý của bạn! Được thành lập vào năm 2022 với mục tiêu chăm sóc sức khỏe và mang lại niềm vui cho chó và mèo, chúng tôi cung cấp các sản phẩm chăm sóc, dinh dưỡng, đồ chơi, và phụ kiện dành cho thú cưng. Tại Pawfect, mỗi sản phẩm đều được chúng tôi lựa chọn kỹ lưỡng từ những thương hiệu nổi tiếng, đảm bảo an toàn và chất lượng cao nhất cho thú cưng của bạn.
                        Chúng tôi hiểu rằng thú cưng không chỉ là vật nuôi mà còn là một phần quan trọng trong gia đình, và chúng tôi cam kết giúp bạn mang đến cho chúng một cuộc sống khỏe mạnh, vui vẻ và đầy đủ yêu thương.`}
                    linear="linear-gradient(#FFD482, #FFD482)"
                />
                <AboutMeComponent
                    avt={about4}
                    aboutTitle="Tầm nhìn"
                    aboutPara={`Tầm nhìn của Pawfect Petcare Center là trở thành một trong những cửa hàng bán đồ dùng chăm sóc thú cưng uy tín và chất lượng hàng đầu tại Việt Nam. Chúng tôi mong muốn xây dựng một cộng đồng yêu thú cưng, nơi các chủ nuôi có thể tìm thấy tất cả những gì họ cần để chăm sóc tốt nhất cho chó và mèo. Với cam kết về chất lượng sản phẩm và dịch vụ khách hàng, chúng tôi không ngừng nỗ lực để mang đến những sản phẩm và trải nghiệm mua sắm tuyệt vời nhất cho mọi gia đình có thú cưng.`}
                    isReverse={true}
                    linear="linear-gradient(#F7662D, #FFD482)"
                />
                <AboutMeComponent
                    avt={about1}
                    aboutTitle="Sứ mệnh"
                    aboutPara={
                        `Sứ mệnh của Pawfect Petcare Center là cung cấp các sản phẩm chăm sóc thú cưng chất lượng cao, đồng thời tạo ra một không gian thân thiện và đáng tin cậy cho cộng đồng yêu thú cưng. Chúng tôi tập trung vào:
                        <strong>Sản phẩm chất lượng:</strong> Cung cấp các sản phẩm chăm sóc sức khỏe, dinh dưỡng, đồ chơi và phụ kiện thú cưng đến từ các thương hiệu uy tín.
                        <strong>Chăm sóc khách hàng tận tình:</strong> Tư vấn và hỗ trợ khách hàng lựa chọn sản phẩm phù hợp với nhu cầu và sở thích của thú cưng.
                        <strong>Xây dựng cộng đồng yêu thú cưng:</strong> Tạo ra một môi trường nơi những người yêu thú cưng có thể chia sẻ kinh nghiệm và gắn kết hơn với những người bạn bốn chân của mình.
                        Chúng tôi tin rằng, khi thú cưng của bạn khỏe mạnh và hạnh phúc, cả gia đình bạn cũng sẽ cảm thấy vui vẻ hơn. Và đó chính là sứ mệnh mà Pawfect Petcare Center luôn hướng tới!`
                    }
                    linear="linear-gradient(#ECC9BD, #EFCBB4)"
                />
            </div>
        </div>
    )
}

export default AboutPage

// import React from 'react'
// import styles from './AboutPage.module.scss'
// import about1 from '../../assets/images/about1.svg'
// import about2 from '../../assets/images/about2.svg'
// import about3 from '../../assets/images/about3.svg'
// import about4 from '../../assets/images/about4.svg'

// const AboutPage = () => {
//     return (
//         <div className={styles.main}>
//             <div className='grid wide'>
//                 <div className={styles.introduce}>
//                     <h2>
//                         PAWFECT PETCARE CENTER
//                         EVERYTHING YOUR PET NEEDS, ALL IN ONE PLACE
//                     </h2>
//                     <p>
//                         <strong>PAWFECT PETCARE CENTER</strong> -
//                         Nơi chúng tôi mang đến những sản phẩm chất lượng và dịch vụ tốt nhất cho những người bạn bốn chân yêu quý của bạn!
//                         Được thành lập vào năm 2022 với mục tiêu chăm sóc sức khỏe và mang lại niềm vui cho chó và mèo,
//                         chúng tôi cung cấp các sản phẩm chăm sóc, dinh dưỡng, đồ chơi, và phụ kiện dành cho thú cưng.
//                         Tại Pawfect, mỗi sản phẩm đều được chúng tôi lựa chọn kỹ lưỡng từ những thương hiệu nổi tiếng, đảm bảo an toàn và chất lượng cao nhất cho thú cưng của bạn.
//                     </p>
//                     <img src={about1} alt="PAWFECT PETCARE CENTER"></img>
//                 </div>
//                 <div className={styles.vision}>
//                     <div>
//                         <h2>Tầm nhìn</h2>
//                         <p>Tầm nhìn của Pawfect Petcare Center là trở thành một trong những cửa hàng bán đồ dùng chăm sóc thú cưng uy tín và chất lượng hàng đầu tại Việt Nam. Chúng tôi mong muốn xây dựng một cộng đồng yêu thú cưng, nơi các chủ nuôi có thể tìm thấy tất cả những gì họ cần để chăm sóc tốt nhất cho chó và mèo. Với cam kết về chất lượng sản phẩm và dịch vụ khách hàng, chúng tôi không ngừng nỗ lực để mang đến những sản phẩm và trải nghiệm mua sắm tuyệt vời nhất cho mọi gia đình có thú cưng.</p>
//                     </div>
//                     <div className={styles.img}>
//                         <img src={about2}></img>
//                     </div>
//                 </div>
//                 <div className={styles.commit}>
//                     <div style={{ marginBottom: "80px" }}>
//                         <h2>Cam kết</h2>
//                         <p>
//                             Pawfect Petcare Center cam kết chỉ cung cấp các sản phẩm chăm sóc thú cưng từ những nhà sản xuất uy tín, được kiểm định kỹ lưỡng về chất lượng, an toàn và hiệu quả. Chúng tôi đảm bảo rằng mọi sản phẩm đều phù hợp với nhu cầu của thú cưng, giúp chúng phát triển khỏe mạnh và vui vẻ.
//                             Chúng tôi luôn đặt khách hàng và thú cưng lên hàng đầu, với mục tiêu mang đến trải nghiệm mua sắm tuyệt vời và sự hài lòng tuyệt đối. Đội ngũ nhân viên thân thiện, chuyên nghiệp luôn sẵn sàng tư vấn và hỗ trợ mọi vấn đề mà khách hàng gặp phải.
//                             Pawfect Petcare Center cam kết xây dựng một cộng đồng nơi các chủ nuôi có thể chia sẻ kinh nghiệm, học hỏi và nhận được sự hỗ trợ trong việc chăm sóc thú cưng. Chúng tôi luôn mong muốn gắn kết mọi người trong tình yêu dành cho thú cưng, để cùng nhau tạo nên một môi trường sống tốt đẹp cho các bé.
//                             Chúng tôi không ngừng tìm kiếm và cập nhật những sản phẩm và dịch vụ mới nhất, phù hợp với nhu cầu ngày càng đa dạng của thú cưng và chủ nuôi. Pawfect Petcare Center luôn lắng nghe phản hồi từ khách hàng để cải thiện chất lượng và mang lại những giá trị tốt nhất cho cộng đồng thú cưng Việt Nam.
//                         </p>
//                     </div>
//                     <div className={styles.img}>
//                         <img src={about3}></img>
//                     </div>
//                 </div>
//                 <div className={styles.mission}>
//                     <div>
//                         <h2>Sứ mệnh</h2>
//                         <p>Tầm nhìn của Pawfect Petcare Center là trở thành một trong những cửa hàng bán đồ dùng chăm sóc thú cưng uy tín và chất lượng hàng đầu tại Việt Nam. Chúng tôi mong muốn xây dựng một cộng đồng yêu thú cưng, nơi các chủ nuôi có thể tìm thấy tất cả những gì họ cần để chăm sóc tốt nhất cho chó và mèo. Với cam kết về chất lượng sản phẩm và dịch vụ khách hàng, chúng tôi không ngừng nỗ lực để mang đến những sản phẩm và trải nghiệm mua sắm tuyệt vời nhất cho mọi gia đình có thú cưng.</p>
//                         <ul>
//                             <li><strong>Sản phẩm chất lượng:</strong> Cung cấp các sản phẩm chăm sóc sức khỏe, dinh dưỡng, đồ chơi và phụ kiện thú cưng đến từ các thương hiệu uy tín.</li>
//                             <li><strong>Chăm sóc khách hàng tận tình:</strong> Tư vấn và hỗ trợ khách hàng lựa chọn sản phẩm phù hợp với nhu cầu và sở thích của thú cưng.</li>
//                             <li><strong>Xây dựng cộng đồng yêu thú cưng:</strong> Tạo ra một môi trường nơi những người yêu thú cưng có thể chia sẻ kinh nghiệm và gắn kết hơn với những người bạn bốn chân của mình.</li>
//                         </ul>
//                         <p>Chúng tôi tin rằng, khi thú cưng của bạn khỏe mạnh và hạnh phúc, cả gia đình bạn cũng sẽ cảm thấy vui vẻ hơn. Và đó chính là sứ mệnh mà Pawfect Petcare Center luôn hướng tới!</p>
//                     </div>
//                     <div className={styles.wrap}>
//                         <div className={styles.img}>
//                             <img src={about4}></img>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default AboutPage