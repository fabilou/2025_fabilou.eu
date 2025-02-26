import * as React from "react"

import Header from "./Header"
import Projects from "./Projects"
import Footer from "./Footer"

import "../styles/reset.sass"
import "../styles/fonts.sass"
import "../styles/base.sass"
import * as styles from "./Layout.module.sass"

interface LayoutProps {
	children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<main className={styles.content}>
			<Header />
			<Projects />
			{children}
			<Footer />
		</main>
	)
}

export default Layout
