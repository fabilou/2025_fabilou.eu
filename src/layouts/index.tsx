import * as React from "react"
import { PageProps } from "gatsby"

import { GlobalContextProvider } from "../components/GlobalContext"
import Layout from "../components/Layout"

const PageWrapper: React.FC<PageProps> = ({ children }) => {
	return (
		<GlobalContextProvider>
			<Layout>{children}</Layout>
		</GlobalContextProvider>
	)
}

export default PageWrapper
