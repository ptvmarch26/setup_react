import React from "react";
import styles from "./HelpCarePage.module.scss";
import { Link } from "react-router-dom";

const HelpCarePage = () => {
  return (
    <div className="grid wide">
      <div className={styles.helpCenter}>
        <header className={styles.header}>
          <div className="grid wide">
            <h1 className={styles.title}>Trung Tâm Trợ Giúp Pawfect</h1>
            <p className={styles.subtitle}>
              Hãy để chúng tôi đồng hành cùng bạn và thú cưng trên hành trình
              mang lại những trải nghiệm tuyệt vời nhất!
            </p>
          </div>
        </header>

        <section className={`${styles.sections} grid wide`}>
          <div className={`${styles.section} col l-4 m-6 c-12`}>
            <h2 className={styles.sectionTitle}>Câu hỏi thường gặp (FAQ)</h2>
            <p className={styles.sectionDescription}>
              Tìm hiểu thêm về các câu hỏi thường gặp liên quan đến đặt hàng,
              thanh toán hoặc chính sách đổi trả.
            </p>
            <Link to="/faq" className={styles.link}>
              Xem chi tiết
            </Link>
          </div>

          <div className={`${styles.section} col l-4 m-6 c-12`}>
            <h2 className={styles.sectionTitle}>Hỗ trợ đơn hàng</h2>
            <p className={styles.sectionDescription}>
              Kiểm tra trạng thái đơn hàng, báo cáo sự cố hoặc yêu cầu đổi trả.
            </p>
            <Link to="/order-support" className={styles.link}>
              Hỗ trợ ngay
            </Link>
          </div>

          <div className={`${styles.section} col l-4 m-6 c-12`}>
            <h2 className={styles.sectionTitle}>Liên hệ với chúng tôi</h2>
            <p className={styles.sectionDescription}>
              Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng lắng nghe và giải quyết
              mọi thắc mắc của bạn.
            </p>
            <Link to="/contact-us" className={styles.link}>
              Liên hệ ngay
            </Link>
          </div>
        </section>

        <section className={`${styles.petCareArticles} grid wide`}>
          <h2 className={styles.articlesHeader}>Bài viết chăm sóc thú cưng</h2>
          <p className={styles.articlesIntro}>
            Khám phá các bài viết từ chuyên gia giúp bạn chăm sóc chó và mèo của
            mình tốt hơn.
          </p>
          <div className={`${styles.articles} row`}>
            <div className={`${styles.article} col l-3 m-6 c-12`}>
              <img
                src="/images/dog-care.jpg"
                alt="Chăm sóc chó"
                className={styles.articleImage}
              />
              <h3 className={styles.articleTitle}>Hướng dẫn chăm sóc chó</h3>
              <p className={styles.articleDescription}>
                Những mẹo hữu ích giúp chú chó của bạn luôn khỏe mạnh, từ chế độ
                ăn uống đến tập thể dục hàng ngày.
              </p>
              <Link to="/articles/dog-care" className={styles.link}>
                Đọc bài viết
              </Link>
            </div>

            <div className={`${styles.article} col l-3 m-6 c-12`}>
              <img
                src="/images/cat-care.jpg"
                alt="Chăm sóc mèo"
                className={styles.articleImage}
              />
              <h3 className={styles.articleTitle}>Hướng dẫn chăm sóc mèo</h3>
              <p className={styles.articleDescription}>
                Cách chăm sóc mèo khoa học và hiệu quả để bé mèo của bạn luôn
                vui vẻ, khỏe mạnh.
              </p>
              <Link to="/articles/cat-care" className={styles.link}>
                Đọc bài viết
              </Link>
            </div>

            <div className={`${styles.article} col l-3 m-6 c-12`}>
              <img
                src="/images/training-puppy.jpg"
                alt="Huấn luyện chó con"
                className={styles.articleImage}
              />
              <h3 className={styles.articleTitle}>Huấn luyện chó con</h3>
              <p className={styles.articleDescription}>
                Các bước cơ bản để dạy chó con những thói quen tốt ngay từ đầu,
                giúp bạn và thú cưng sống hòa thuận hơn.
              </p>
              <Link to="/articles/training-puppy" className={styles.link}>
                Đọc bài viết
              </Link>
            </div>

            <div className={`${styles.article} col l-3 m-6 c-12`}>
              <img
                src="/images/cat-health.jpg"
                alt="Sức khỏe mèo"
                className={styles.articleImage}
              />
              <h3 className={styles.articleTitle}>
                Sức khỏe và dinh dưỡng cho mèo
              </h3>
              <p className={styles.articleDescription}>
                Tìm hiểu các dấu hiệu sức khỏe thường gặp và cách xây dựng chế
                độ ăn uống cân bằng cho mèo.
              </p>
              <Link to="/articles/cat-health" className={styles.link}>
                Đọc bài viết
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpCarePage;
