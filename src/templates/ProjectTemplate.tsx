import * as React from "react"
import { HeadFC, graphql, PageProps } from "gatsby"

import { useGlobalContext } from "../components/GlobalContext"
import Seo from "../components/seo"

const ProjectTemplatePage: React.FC<PageProps> = ({ data, location }: any) => {
	const { setIndex, setProjectURL, setProject } = useGlobalContext()

	React.useEffect(() => {
		if (!document.startViewTransition) {
			setProjectURL(location.pathname)
			setProject(data.projects)

			if (data.projects?.isIndex) {
				setIndex(location.pathname)
			}
			return
		} else {
			document.startViewTransition(() => {
				setProjectURL(location.pathname)
				setProject(data.projects)

				if (data.projects?.isIndex) {
					setIndex(location.pathname)
				}
			})
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
