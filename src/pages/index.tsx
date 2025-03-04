import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import { useGlobalContext } from "../components/GlobalContext"
import Seo from "../components/seo"

const IndexPage: React.FC<PageProps> = () => {
	const { setProjectInfo, setProjectURL } = useGlobalContext()

	React.useEffect(() => {
		setProjectInfo(null)
		setProjectURL(undefined)
	}, [])
	return <></>
}

export default IndexPage

export const Head: HeadFC = () => <Seo />
