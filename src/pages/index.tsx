import * as React from "react"
import { graphql, HeadFC, PageProps } from "gatsby"

import { useGlobalContext } from "../components/GlobalContext"
import Seo from "../components/seo"

const IndexPage: React.FC<PageProps> = ({ data }: any) => {
	const { setProject, setProjectURL } = useGlobalContext()

	React.useEffect(() => {
		if (!document.startViewTransition) {
			setProjectURL(null)
			setProject(data.projects)
			return
		} else {
			document.startViewTransition(() => {
				setProjectURL(null)
				setProject(data.projects)
			})
		}
	}, [])
	return <></>
}

export default IndexPage

export const Head: HeadFC = () => <Seo />

export const query = graphql`
	query {
		projects(slug: { eq: "index" }) {
			media {
				link {
					path
					title
				}
				path {
					childImageSharp {
						gatsbyImageData
					}
					internal {
						mediaType
					}
					publicURL
				}
				width
			}
			slug
		}
	}
`
