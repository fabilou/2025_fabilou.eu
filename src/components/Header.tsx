import * as React from "react"
import { Link } from "gatsby"

import { useGlobalContext } from "./GlobalContext"
import EmailButton from "./EmailButton"

import * as styles from "./Header.module.sass"

const Header: React.FC = () => {
	const { index, project, projectURL } = useGlobalContext()

	return (
		<header className={styles.header}>
			<nav>
				<ul className={styles.mainNavList}>
					<li>
						<h1>
							<Link to="/">Fabi Lou Viktoria Sax</Link>
						</h1>
					</li>
					<li>
						<EmailButton className={styles.email} text="hello@fabilou.com" />
					</li>
					<li>
						<a
							href="https://instagram.com/fabilousax"
							target="_blank"
							rel="noreferrer"
						>
							Instagram
						</a>
					</li>
					<li>
						<a
							href="https://github.com/fabilou"
							target="_blank"
							rel="noreferrer"
						>
							Github
						</a>
					</li>
					{projectURL && !project?.isIndex && (
						<li className={styles.back}>
							<Link to={index ? index : "/"}>Back</Link>
						</li>
					)}
					<li className={styles.right}>
						<Link to="/about">About</Link>
					</li>
				</ul>
				{/* <ul className={styles.secondaryNavList}>
					<li>
						<Link
							to="/"
							className={
								index === "/3d/" || index === "/"
									? [styles.link, styles.active].join(" ")
									: styles.link
							}
						>
							3D Design
						</Link>
					</li>
					<li>
						<Link
							to="/web"
							className={
								index === "/web/"
									? [styles.link, styles.active].join(" ")
									: styles.link
							}
						>
							Webdesign & Code
						</Link>
					</li>
				</ul> */}
			</nav>
		</header>
	)
}

export default Header
