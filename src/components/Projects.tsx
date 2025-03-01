import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import { useGlobalContext } from "./GlobalContext"
import Thumbnail from "./Thumbnail"
import ProjectInfo from "./ProjectInfo"

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

	const containerRef = React.useRef<HTMLDivElement>(null)
	const thumbnailRef = React.useRef<HTMLDivElement>(null)
	const infoRef = React.useRef<HTMLDivElement>(null)

	React.useEffect(() => {
		const container = containerRef.current
		if (!container) return

		container.scrollLeft = 0
	}, [filter])

	// React.useEffect(() => {
	// 	const container = containerRef.current
	// 	if (!container) return

	// 	const handleWheel = (e: WheelEvent) => {
	// 		container.scrollLeft += e.deltaY
	// 	}

	// 	container.addEventListener("wheel", handleWheel)

	// 	return () => {
	// 		container.removeEventListener("wheel", handleWheel)
	// 	}
	// }, [])

	// React.useEffect(() => {
	// 	const info = infoRef.current
	// 	if (!info) return

	// 	const handleMouseEnter = (e: React.MouseEvent) => {
	// 		containerRef.current?.removeEventListener("wheel", () => {})
	// 	}

	// 	info.addEventListener("wheel", handleWheel)

	// 	return () => {
	// 		info.removeEventListener("wheel", handleMouseEnter)
	// 	}
	// }, [])

	// React.useEffect(() => {
	// 	const observer = new IntersectionObserver((entries) => {
	// 		console.log(entries.map((entry) => entry.target))
	// 	})

	// 	if (thumbnailRef.current) {
	// 		console.log(thumbnailRef.current)
	// 		observer.observe(thumbnailRef.current)
	// 	}

	// 	return () => {
	// 		if (thumbnailRef.current) {
	// 			observer.unobserve(thumbnailRef.current)
	// 		}
	// 	}
	// }, [])

	const [grabbing, setGrabbing] = React.useState(false)
	const [scrollStart, setScrollStart] = React.useState(0)
	const [scroll, setScroll] = React.useState(0)

	const handleMouseDown = (e: React.MouseEvent) => {
		e.preventDefault()

		setGrabbing(true)
		setScrollStart(e.pageX)
		setScroll(e.currentTarget && e.currentTarget.scrollLeft)
		e.currentTarget && e.currentTarget.classList.add(styles.grabbing)
	}

	const handleMouseUp = (e: React.MouseEvent) => {
		setGrabbing(false)
		e.currentTarget.classList.remove(styles.grabbing)
	}

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!grabbing) return
		e.preventDefault()

		e.currentTarget.scrollLeft = scroll - (e.pageX - scrollStart)
	}

	const handleMouseLeave = (e: React.MouseEvent) => {
		setGrabbing(false)
		e.currentTarget.classList.remove(styles.grabbing)
	}

	return (
		<div>
			<div
				ref={containerRef}
				className={styles.container}
				onMouseDown={(e) => handleMouseDown(e)}
				onMouseUp={(e) => handleMouseUp(e)}
				onMouseLeave={(e) => handleMouseLeave(e)}
				onMouseMove={(e) => handleMouseMove(e)}
			>
				{projectInfo !== null ? (
					<ProjectInfo
						title={projectInfo.title}
						description={projectInfo.description}
						info={projectInfo.info}
						ref={infoRef}
					/>
				) : (
					<></>
				)}
				{data.allGalleryYaml.edges.map((item: any, i: number) => (
					<Thumbnail
						caption={
							item.node.title && item.node.slug !== filter
								? item.node.title
								: null
						}
						hidden={filter !== undefined && item.node.slug !== filter}
						image={
							item.node.thumbnail.childImageSharp
								? item.node.thumbnail.childImageSharp.gatsbyImageData
								: item.node.thumbnail.publicURL
						}
						key={i}
						ref={thumbnailRef}
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
