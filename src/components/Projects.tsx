import * as React from "react"

import { useGlobalContext } from "./GlobalContext"
import Thumbnail from "./Thumbnail"
import ProjectInfo from "./ProjectInfo"

import * as styles from "./Projects.module.sass"

const Projects: React.FC = () => {
	const { project } = useGlobalContext()

	const containerRef = React.useRef<HTMLUListElement>(null)

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
			<ul
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
						tags={project.projectInfo.tags}
						title={project.projectInfo.title}
					/>
				)}
				{project?.media &&
					project.media.map((item: any, i: number) => {
						if (
							[
								"image/jpeg",
								"image/png",
								"image/webp",
								"image/gif",
								"image/svg",
							].some((type) => type === item.path.internal.mediaType)
						) {
							return (
								<React.Fragment key={i}>
									<Thumbnail
										aspectRatio={item.path.childImageSharp.resize.aspectRatio}
										caption={item.link && item.link.title}
										columns={item.columns}
										image={item.path.childImageSharp.gatsbyImageData}
										slug={item.link && item.link.path}
										type={item.path.internal.mediaType}
									/>
								</React.Fragment>
							)
						} else if (
							["video/mp4", "video/webm"].some(
								(type) => type === item.path.internal.mediaType
							)
						) {
							return (
								<React.Fragment key={i}>
									<Thumbnail
										aspectRatio={
											item.path.childVideoFfmpeg.transcode.aspectRatio
										}
										caption={item.link && item.link.title}
										columns={item.columns}
										image={item.path.childVideoFfmpeg.transcode.src}
										slug={item.link && item.link.path}
										type={item.path.internal.mediaType}
									/>
								</React.Fragment>
							)
						} else {
							return <></>
						}
					})}
			</ul>
		</div>
	)
}

export default Projects
