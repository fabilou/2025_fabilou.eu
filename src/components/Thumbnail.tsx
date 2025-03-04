import React, { ForwardedRef, forwardRef } from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import * as styles from "./Thumbnail.module.sass"

interface ImageProps {
	img: any
	mediaType: string
}

const Image: React.FC<ImageProps> = ({ img, mediaType }) => {
	const video = React.useRef<HTMLVideoElement>(null)

	React.useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					video.current?.play()
				} else {
					video.current?.pause()
				}
			})
		})

		if (video.current) {
			observer.observe(video.current)
		}

		return () => {
			if (video.current) {
				observer.unobserve(video.current)
			}
		}
	}, [])

	if (mediaType === "video/mp4" || mediaType === "video/webm") {
		return (
			<video
				autoPlay
				controls={false}
				controlsList="nodownload"
				disablePictureInPicture
				loop
				muted
				playsInline
				preload="metadata"
				ref={video}
			>
				<source src={img} type={mediaType} />
			</video>
		)
	} else if (
		mediaType === "image/jpeg" ||
		mediaType === "image/png" ||
		mediaType === "image/webp" ||
		mediaType === "image/gif" ||
		mediaType === "image/svg"
	) {
		return <GatsbyImage image={img} alt="" />
	} else return <></>
}

interface ThumbnailProps {
	caption?: string
	hidden?: boolean
	image: any
	ref?: React.ForwardedRef<HTMLDivElement>
	slug?: string
	type: string
	width?: number
}

const Thumbnail: React.FC<ThumbnailProps> = React.forwardRef(
	({ caption, image, hidden, slug, type, width }, ref) => {
		return (
			<figure
				className={styles.thumbnail}
				hidden={hidden}
				ref={ref}
				style={{
					flexBasis: `min(min(${
						width ? width : 1
					} * var(--column-width), 75vw), 50vh)`,
				}}
			>
				{slug ? (
					<>
						<Image img={image} mediaType={type} />
						{caption && (
							<Link to={"/" + slug}>
								<figcaption className={styles.description}>
									<span>{caption}</span>
									<span>↗</span>
								</figcaption>
							</Link>
						)}
					</>
				) : (
					<>
						<Image img={image} mediaType={type} />
						{caption && (
							<figcaption className={styles.description}>
								<span>{caption}</span>
								<span>↗</span>
							</figcaption>
						)}
					</>
				)}
			</figure>
		)
	}
)

export default Thumbnail
