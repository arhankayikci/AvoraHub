import Navbar from './Navbar';
import Footer from './Footer';
import MobileNav from './MobileNav';
import MobileHeader from './MobileHeader';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
    return (
        <div className={styles.layout}>
            {/* Desktop: Top Navbar */}
            <Navbar />

            {/* Mobile: Top Header */}
            <MobileHeader />

            <main className={styles.main}>
                {children}
            </main>

            <Footer />

            {/* Mobile: Bottom Navigation */}
            <MobileNav />
        </div>
    );
};

export default Layout;
