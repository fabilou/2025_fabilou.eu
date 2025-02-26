import * as React from "react"
import { Link } from "gatsby"

import * as styles from "./Footer.module.sass"

interface FooterProps {
	style?: object
}

const Footer: React.FC<FooterProps> = ({ style }) => {
	return (
		<footer className={styles.container} style={style}>
			<nav>
				<ul className={styles.list}>
					<li>
						<Link className={styles.link} to="/legal">
							Legal Notice
						</Link>
					</li>
				</ul>
			</nav>
		</footer>
	)
}

export default Footer
