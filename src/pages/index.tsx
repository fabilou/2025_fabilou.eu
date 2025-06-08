import * as React from "react"
import { graphql, HeadFC, PageProps } from "gatsby"

import { useGlobalContext } from "../components/GlobalContext"
import Seo from "../components/seo"

const IndexPage: React.FC<PageProps> = ({ data }: any) => {
	const { setIndex, setProject, setProjectURL } = useGlobalContext()

	React.useEffect(() => {
		setProjectURL(null)
		setProject(data.projects)
		setIndex("/")
	}, [])
	return <></>
}

export default IndexPage

export const Head: HeadFC = () => <Seo />

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
