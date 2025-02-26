import * as React from "react"
import { graphql, PageProps, useStaticQuery } from "gatsby"

import Layout from "../components/Layout"

const PageWrapper: React.FC<PageProps> = ({ children }) => {
	return <Layout>{children}</Layout>
}

export default PageWrapper
