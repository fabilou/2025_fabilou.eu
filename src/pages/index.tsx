import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

import { useGlobalContext } from "../components/GlobalContext"

const IndexPage: React.FC<PageProps> = () => {
	const { setProjectInfo, setProjectURL } = useGlobalContext()

	React.useEffect(() => {
		setProjectInfo(null)
		setProjectURL(undefined)
	}, [])
	return <></>
}

export default IndexPage

export const Head: HeadFC = () => <title>Fabi Lou Viktoria</title>
