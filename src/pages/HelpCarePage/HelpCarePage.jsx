import React, { useEffect } from "react";
import styles from "./HelpCarePage.module.scss";
import { Link } from "react-router-dom";
import clsx from "clsx";

const HelpCarePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.main}>
      <div className="grid wide">
        <div className={styles.helpCenter}>
          <header className={styles.header}>
            <h1 className={styles.title}>Trung Tâm Trợ Giúp Pawfect</h1>
            <p className={styles.subtitle}>
              Hãy để chúng tôi đồng hành cùng bạn và thú cưng trên hành trình
              mang lại những trải nghiệm tuyệt vời nhất!
            </p>
          </header>
        </div>
        <div className={clsx("row", styles.wrapSupporr)}>
          <div className={clsx('col l-4 m-6 c-6')}>
            <div className={styles.section}>
              <h2>Về chúng tôi</h2>
              <p>
                Tìm hiểu thêm về sứ mệnh, tầm nhìn, và những giá trị cốt lõi mà chúng tôi mang đến cho khách hàng.
              </p>
              <Link to="/about" className={styles.link}>
                Xem chi tiết
              </Link>
            </div>
          </div>
          <div className={clsx('col l-4 m-6 c-6')}>
            <div className={styles.section}>
              <h2>Điều khoản chung</h2>
              <p>
                Tìm hiểu về các quy định và điều khoản sử dụng khi truy cập và sử dụng dịch vụ của chúng tôi.
              </p>
              <Link to="/general-terms" className={styles.link}>
                Xem chi tiết
              </Link>
            </div>
          </div>
          <div className={clsx('col l-4 m-6 c-6')}>
            <div className={styles.section}>
              <h2>Chính sách bảo mật</h2>
              <p>
                Tìm hiểu cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn để đảm bảo quyền riêng tư và an toàn dữ liệu.
              </p>
              <Link to="/privacy-policy" className={styles.link}>
                Xem chi tiết
              </Link>
            </div>
          </div>
          <div className={clsx('col l-4 m-6 c-6')}>
            <div className={styles.section}>
              <h2>Chính sách bảo hành</h2>
              <p>
                Tìm hiểu về các điều kiện và quy trình bảo hành sản phẩm để đảm bảo quyền lợi của bạn.
              </p>
              <Link to="/guarantee" className={styles.link}>
                Xem chi tiết
              </Link>
            </div>
          </div>
          <div className={clsx('col l-4 m-6 c-6')}>
            <div className={styles.section}>
              <h2>Chính sách trả hàng và hoàn tiền</h2>
              <p>
                Tìm hiểu quy định về việc trả hàng, hoàn tiền và các bước cần thực hiện để giải quyết khiếu nại.
              </p>
              <Link to="/return-policy" className={styles.link}>
                Xem chi tiết
              </Link>
            </div>
          </div>
          <div className={clsx('col l-4 m-6 c-6')}>
            <div className={styles.section}>
              <h2>Câu hỏi thường gặp (FAQ)</h2>
              <p>
                Tìm hiểu thêm về các câu hỏi thường gặp liên quan đến đặt hàng,
                thanh toán hoặc chính sách đổi trả.
              </p>
              <Link to="/faq" className={styles.link}>
                Xem chi tiết
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.helpCenter}>
          <header className={styles.header}>
            <h1 className={styles.title}>Bài viết chăm sóc thú cưng</h1>
            <p className={styles.subtitle}>
              Khám phá các bài viết từ chuyên gia giúp bạn chăm sóc chó và mèo của
              mình tốt hơn.
            </p>
          </header>
        </div>
        <div className="row">
          <div className="col l-4 m-6 c-6">
            <div className={styles.section}>
              {/* <img
                src="/images/cat-care.jpg"
                alt="Chăm sóc mèo"
                className={styles.articleImage}
              /> */}
              <h2>Hướng dẫn chăm sóc mèo</h2>
              <p>
                Cách chăm sóc mèo khoa học và hiệu quả để bé mèo của bạn luôn
                vui vẻ, khỏe mạnh.
              </p>
              <Link to="/articles/cat-care" className={styles.link}>
                Đọc bài viết
              </Link>
            </div>
          </div>
          <div className="col l-4 m-6 c-6">
            <div className={styles.section}>
              {/* <img
                src="/images/cat-care.jpg"
                alt="Chăm sóc chó"
                className={styles.articleImage}
              /> */}
              <h2>Hướng dẫn chăm sóc chó</h2>
              <p>
                Cách chăm sóc chó khoa học và hiệu quả để bé chó của bạn luôn
                vui vẻ, khỏe mạnh.
              </p>
              <Link to="/articles/cat-care" className={styles.link}>
                Đọc bài viết
              </Link>
            </div>
          </div>
          <div className="col l-4 m-6 c-6">
            <div className={styles.section}>
              {/* <img
                src="/images/cat-care.jpg"
                alt="Huấn luyện mèo"
                className={styles.articleImage}
              /> */}
              <h2>Huấn luyện mèo con</h2>
              <p>
                Hướng dẫn các phương pháp huấn luyện cơ bản và hiệu quả để giúp chú mèo con của bạn ngoan ngoãn và phát triển tốt.
              </p>
              <Link to="/articles/cat-care" className={styles.link}>
                Đọc bài viết
              </Link>
            </div>
          </div>
          <div className="col l-4 m-6 c-6">
            <div className={styles.section}>
              {/* <img
                src="/images/cat-care.jpg"
                alt="Chăm sóc mèo"
                className={styles.articleImage}
              /> */}
              <h2>Huấn luyện chó con</h2>
              <p>
                Hướng dẫn các phương pháp huấn luyện cơ bản và hiệu quả để giúp chú chó con của bạn ngoan ngoãn và phát triển tốt.
              </p>
              <Link to="/articles/cat-care" className={styles.link}>
                Đọc bài viết
              </Link>
            </div>
          </div>
          <div className="col l-4 m-6 c-6">
            <div className={styles.section}>
              {/* <img
                src="/images/cat-care.jpg"
                alt="Sức khỏe và dinh dưỡng cho mèo"
                className={styles.articleImage}
              /> */}
              <h2>Sức khỏe và dinh dưỡng cho mèo</h2>
              <p>
                Cung cấp thông tin về chế độ dinh dưỡng phù hợp và các mẹo chăm sóc sức khỏe để mèo của bạn luôn khỏe mạnh và vui vẻ.
              </p>
              <Link to="/articles/cat-care" className={styles.link}>
                Đọc bài viết
              </Link>
            </div>
          </div>
          <div className="col l-4 m-6 c-6">
            <div className={styles.section}>
              {/* <img
                  src="/images/cat-care.jpg"
                  alt="Sức khỏe và dinh dưỡng cho chó"
                  className={styles.articleImage}
                /> */}
              <h2>Sức khỏe và dinh dưỡng cho chó</h2>
              <p>
                Cung cấp thông tin về chế độ dinh dưỡng phù hợp và các mẹo chăm sóc sức khỏe để chó của bạn luôn khỏe mạnh và vui vẻ.
              </p>
              <Link to="/articles/cat-care" className={styles.link}>
                Đọc bài viết
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCarePage;
