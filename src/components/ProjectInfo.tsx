import React from "react"

import * as styles from "./ProjectInfo.module.sass"

interface ProjectInfoProps {
	description: string
	info?: [{ label: string; value: [string] }]
	links?: [{ label: string; target: string }]
	tags?: [string]
	ref?: React.ForwardedRef<HTMLDivElement>
	title: string
}

const ProjectInfo: React.FC<ProjectInfoProps> = React.forwardRef(
	({ description, info, links, tags, title }, ref) => {
		return (
			<div className={styles.projectInfo} ref={ref}>
				<h2>{title}</h2>
				<section>
					<p>{description}</p>
				</section>
				<section>
					<h3>Info</h3>
					{info && (
						<div className={styles.info}>
							{info.map((item: any, i: number) => (
								<div key={i}>
									<h4 className={styles.label}>{item.label}</h4>
									<p className={styles.value}>
										{item.value.map((value: string, j: number) => (
											<React.Fragment key={j}>
												<span>{value}</span>
												{j < item.value.length - 1 ? ", " : ""}
											</React.Fragment>
										))}
									</p>
								</div>
							))}
						</div>
					)}
				</section>
				{links && (
					<section>
						<h3>Links</h3>
						{links.map((link: any, i: number) => (
							<p key={i}>
								<a href={link.target} target="_blank" rel="noreferrer">
									{link.label}
								</a>
							</p>
						))}
					</section>
				)}
				<section>
					<div className={styles.tags}>
						{tags?.map((tag: string, i: number) => (
							<div className={styles.tag} key={i}>
								{tag}
							</div>
						))}
					</div>
				</section>
			</div>
		)
	}
)

export default ProjectInfo
