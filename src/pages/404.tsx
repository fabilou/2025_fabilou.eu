import * as React from "react"
import { HeadFC, PageProps } from "gatsby"

import Popup from "../components/Popup"
import Seo from "../components/seo"

const Error404Page: React.FC<PageProps> = () => {
	return (
		<Popup>
			<h1>Error 404: This page doesn't exist</h1>
		</Popup>
	)
}

export default Error404Page

export const Head: HeadFC = () => <Seo title="Error 404" />
