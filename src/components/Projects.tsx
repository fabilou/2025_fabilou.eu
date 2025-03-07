import * as React from "react"

import { useGlobalContext } from "./GlobalContext"
import Thumbnail from "./Thumbnail"
import ProjectInfo from "./ProjectInfo"

import * as styles from "./Projects.module.sass"

const Projects: React.FC = () => {
	const { project } = useGlobalContext()

	const containerRef = React.useRef<HTMLDivElement>(null)
	const thumbnailRef = React.useRef<HTMLDivElement>(null)
	const infoRef = React.useRef<HTMLDivElement>(null)

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
				{project?.projectInfo && (
					<ProjectInfo
						description={project.projectInfo.description}
						info={project.projectInfo.info}
						links={project.projectInfo.links}
						ref={infoRef}
						tags={project.projectInfo.tags}
						title={project.projectInfo.title}
					/>
				)}
				{project?.media &&
					project.media.map((item: any, i: number) => (
						<Thumbnail
							caption={item.link && item.link.title}
							image={
								item.path.childImageSharp
									? item.path.childImageSharp.gatsbyImageData
									: item.path.publicURL
							}
							key={i}
							ref={thumbnailRef}
							slug={item.link && item.link.path}
							type={item.path.internal.mediaType}
							width={item.width}
						/>
					))}
			</div>
		</div>
	)
}

export default Projects
