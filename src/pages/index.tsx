import * as React from "react"
import { graphql, HeadFC, PageProps } from "gatsby"

import { useGlobalContext } from "../components/GlobalContext"
import Seo from "../components/seo"

const IndexPage: React.FC<PageProps> = ({ data }: any) => {
	const { setIndex, setProject, setProjectURL } = useGlobalContext()

	React.useEffect(() => {
		if (!document.startViewTransition) {
			setProjectURL(null)
			setProject(data.projects)
			setIndex(null)
			return
		} else {
			document.startViewTransition(() => {
				setProjectURL(null)
				setProject(data.projects)
				setIndex(null)
			})
		}
	}, [])
	return <></>
}

export default IndexPage

export const Head: HeadFC = () => <Seo />

export const query = graphql`
	query {
		projects(slug: { eq: "3d" }) {
			media {
				columns
				link {
					path
					title
				}
				path {
					childImageSharp {
						gatsbyImageData
						resize {
							aspectRatio
						}
					}
					childVideoFfmpeg {
						transcode {
							aspectRatio
							src
						}
					}
					internal {
						mediaType
					}
					publicURL
				}
			}
			slug
		}
	}
`
