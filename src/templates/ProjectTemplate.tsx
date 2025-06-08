import * as React from "react"
import { HeadFC, graphql, PageProps } from "gatsby"

import { useGlobalContext } from "../components/GlobalContext"
import Seo from "../components/seo"

const ProjectTemplatePage: React.FC<PageProps> = ({ data, location }: any) => {
	const { setIndex, setProjectURL, setProject } = useGlobalContext()

	React.useEffect(() => {
		setProjectURL(location.pathname)
		setProject(data.projects)

		if (data.projects?.isIndex) {
			setIndex(location.pathname)
		}
	}, [])

	return <></>
}

export default ProjectTemplatePage

export const Head: HeadFC = ({ data }: any) =>
	data.projects.projectInfo && (
		<Seo title={data.projects.projectInfo.title} slug={data.projects.slug} />
	)

export const query = graphql`
	query ($slug: String!) {
		projects(slug: { eq: $slug }) {
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
			projectInfo {
				description
				info {
					label
					value
				}
				links {
					label
					target
				}
				tags {
					path
					title
				}
				title
			}
			slug
		}
	}
`
