import * as React from "react"

import { useGlobalContext } from "./GlobalContext"
import Header from "./Header"
import Projects from "./Projects"
import Footer from "./Footer"

import "../styles/reset.sass"
import "../styles/fonts.sass"
import "../styles/base.sass"

interface LayoutProps {
	children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { project } = useGlobalContext()

	return (
		<>
			<Header />
			<main>
				{children}
				<Projects key={project && project.slug} />
			</main>
			<Footer />
		</>
	)
}

export default Layout
