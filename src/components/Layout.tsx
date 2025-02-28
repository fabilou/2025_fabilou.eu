import * as React from "react"

import { useGlobalContext } from "./GlobalContext"
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
	const { projectURL } = useGlobalContext()

	const filter = projectURL?.replace(/^\/|\/$/g, "")

	return (
		<main className={styles.content}>
			<Header />
			{children}
			<Projects filter={filter} />
			<Footer />
		</main>
	)
}

export default Layout
