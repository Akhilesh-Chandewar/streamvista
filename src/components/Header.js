import Image from 'next/image'
import Link from 'next/link'
import logo from "@/images/logo.png"

const styles = {
  navLink: `text-white flex mx-[10px]`,
  navItem: `relative mr-1 cursor-pointer hover:opacity-60`,
  nav: `flex  gap-[20px]`,
  header: `bg-[#17171A] text-white h-20 flex gap-[100px] p-[30px]`,
}

const Header = () => {
  return (
    <div className={styles.header}>
      <Image alt='Logo' src={logo} width={100} height={100} />
      <div className={styles.headerWrapper}>
        <nav className={styles.nav}>
          <div className={styles.navItem}>
            <Link href="/" className={styles.navLink}>Home</Link>
          </div>
          <div className={styles.navItem}>
            <Link href="/upload" className={styles.navLink}>Upload</Link>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Header