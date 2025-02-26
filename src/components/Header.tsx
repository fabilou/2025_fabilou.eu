import * as React from "react"
import { Link } from "gatsby"

import * as styles from "./Header.module.sass"

const Header: React.FC = () => {
	return (
		<header className={styles.header}>
			<nav>
				<ul className={styles.navList}>
					<li>
						<Link to="/">Fabi Lou Viktoria Sax</Link>
					</li>
					<li>
						<a href="mailto:hello@fabilou.eu">hello@fabilou.eu</a>
					</li>
					<li>
						<a href="https://instagram.com/fabilousax">Instagram</a>
					</li>
					<li>
						<a href="https://github.com/fabilou">Github</a>
					</li>
					<li className={styles.right}>
						<Link to="/about">About</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}

export default Header
