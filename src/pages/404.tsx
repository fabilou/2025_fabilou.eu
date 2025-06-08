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
			isIndex
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
						desktopMP4: transcode(
							codec: "libx264"
							maxWidth: 1920
							maxHeight: 1080
							fileExtension: "mp4"
							options: [["-profile:v", "main"], ["-pix_fmt", "yuv420p"]]
							outputOptions: ["-movflags faststart"]
						) {
							src
							aspectRatio
						}
						mobileMP4: transcode(
							codec: "libx264"
							maxWidth: 1280
							maxHeight: 720
							fileExtension: "mp4"
							options: [["-profile:v", "main"], ["-pix_fmt", "yuv420p"]]
							outputOptions: ["-movflags faststart"]
						) {
							src
							aspectRatio
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
