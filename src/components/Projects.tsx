import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import * as styles from "./Projects.module.sass"

const Projects: React.FC = () => {
	const data = useStaticQuery(graphql`
		query {
			allGalleryYaml {
				edges {
					node {
						link
						tags
						thumbnail {
							childImageSharp {
								gatsbyImageData
							}
							internal {
								mediaType
							}
							publicURL
						}
						title
						width
					}
				}
			}
		}
	`)

	const [grabbing, setGrabbing] = React.useState(false)
	const [scrollStart, setScrollStart] = React.useState(0)
	const [scroll, setScroll] = React.useState(0)

	return (
		<div
			className={styles.container}
			onPointerDown={(e) => {
				e.preventDefault()

				setGrabbing(true)
				setScrollStart(e.pageX)
				setScroll(e.currentTarget.scrollLeft)

				e.currentTarget.classList.add(styles.grabbing)
			}}
			onPointerUp={(e) => {
				setGrabbing(false)

				e.currentTarget.classList.remove(styles.grabbing)
			}}
			onPointerLeave={(e) => {
				setGrabbing(false)

				e.currentTarget.classList.remove(styles.grabbing)
			}}
			onPointerMove={(e) => {
				if (!grabbing) return

				e.preventDefault()

				const x = e.pageX
				const move = x - scrollStart

				e.currentTarget.scrollLeft = scroll - move
			}}
		>
			{data.allGalleryYaml.edges.map((item: any, i: number) => (
				<figure
					className={styles.thumbnail}
					onPointerEnter={(e) => e.currentTarget.classList.add(styles.hover)}
					onPointerLeave={(e) => e.currentTarget.classList.remove(styles.hover)}
					key={i}
					style={{
						flexBasis: `calc(${item.node.width} * 360px)`,
					}}
				>
					{item.node.thumbnail.internal.mediaType === "video/mp4" ||
					item.node.thumbnail.internal.mediaType === "video/webm" ? (
						<div>
							<video
								autoPlay
								controls={false}
								controlsList="nodownload"
								disablePictureInPicture
								loop
								muted
								playsInline
							>
								<source
									src={item.node.thumbnail.publicURL}
									type={item.node.thumbnail.internal.mediaType}
								/>
							</video>
						</div>
					) : item.node.thumbnail.internal.mediaType === "image/jpeg" ||
					  item.node.thumbnail.internal.mediaType === "image/png" ||
					  item.node.thumbnail.internal.mediaType === "image/webp" ||
					  item.node.thumbnail.internal.mediaType === "image/gif" ||
					  item.node.thumbnail.internal.mediaType === "image/svg" ? (
						<GatsbyImage
							image={item.node.thumbnail.childImageSharp.gatsbyImageData}
							alt=""
						/>
					) : (
						<></>
					)}
					<figcaption className={styles.description}>
						{item.node.title}
					</figcaption>
				</figure>
			))}
		</div>
	)
}

export default Projects
