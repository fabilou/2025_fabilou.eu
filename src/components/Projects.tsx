import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import { useGlobalContext } from "./GlobalContext"
import Thumbnail from "./Thumbnail"

import * as styles from "./Projects.module.sass"

interface ProjectsProps {
	filter?: string
}

const Projects: React.FC<ProjectsProps> = ({ filter }) => {
	const data = useStaticQuery(graphql`
		query {
			allGalleryYaml {
				edges {
					node {
						slug
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

	const { projectInfo } = useGlobalContext()

	const [grabbing, setGrabbing] = React.useState(false)
	const [scrollStart, setScrollStart] = React.useState(0)
	const [scroll, setScroll] = React.useState(0)

	const containerRef = React.useRef<HTMLDivElement>(null)
	const thumbnailRef = React.useRef<HTMLDivElement>(null)

	React.useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollLeft = 0
		}
	}, [])

	React.useEffect(() => {
		const container = containerRef.current
		if (!container) return

		const handleWheel = (e: WheelEvent) => {
			container.scrollLeft += e.deltaY
		}

		container.addEventListener("wheel", handleWheel)

		return () => {
			container.removeEventListener("wheel", handleWheel)
		}
	}, [])

	React.useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			console.log(entries.map((entry) => entry.target))
		})

		if (thumbnailRef.current) {
			console.log(thumbnailRef.current)
			observer.observe(thumbnailRef.current)
		}

		return () => {
			if (thumbnailRef.current) {
				observer.unobserve(thumbnailRef.current)
			}
		}
	}, [])

	return (
		<div>
			<div
				ref={containerRef}
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
				{projectInfo ? projectInfo : null}
				{data.allGalleryYaml.edges.map((item: any, i: number) => (
					<Thumbnail
						caption={item.node.title ? item.node.title : null}
						hidden={filter !== undefined && item.node.slug !== filter}
						image={
							item.node.thumbnail.childImageSharp
								? item.node.thumbnail.childImageSharp.gatsbyImageData
								: item.node.thumbnail.publicURL
						}
						key={i}
						slug={item.node.slug ? item.node.slug : null}
						type={item.node.thumbnail.internal.mediaType}
						width={item.node.width}
					/>
				))}
			</div>
		</div>
	)
}

export default Projects
