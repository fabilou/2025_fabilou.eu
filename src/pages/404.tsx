import * as React from "react"
import { HeadFC, graphql, PageProps } from "gatsby"

import { useGlobalContext } from "../components/GlobalContext"
import Popup from "../components/Popup"
import Seo from "../components/seo"

const Error404Page: React.FC<PageProps> = ({ data }: any) => {
	const { setProject, projectURL, setProjectURL } = useGlobalContext()

	React.useEffect(() => {
		if (!projectURL) {
			setProjectURL(null)
			setProject(data.projects)
		}
	}, [])
	return (
		<Popup>
			<h1>Error 404: This page doesn't exist</h1>
		</Popup>
	)
}

export default Error404Page

export const Head: HeadFC = () => <Seo title="Error 404" />

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
						transcode(fileExtension: "mp4") {
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
