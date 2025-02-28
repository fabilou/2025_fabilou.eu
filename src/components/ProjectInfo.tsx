import React from "react"

import * as styles from "./ProjectInfo.module.sass"

interface ProjectInfoProps {
	description: string
	info?: [{ label: string }]
	title: string
}

const ProjectInfo: React.FC<ProjectInfoProps> = ({
	description,
	info,
	title,
}) => {
	return (
		<div className={styles.projectInfo}>
			<h2>{title}</h2>
			<section>
				<p>{description}</p>
			</section>
			<section>
				<h3>Info</h3>
				{info && (
					<div className={styles.info}>
						{info.map((item: any, i: number) => (
							<div className={styles.infoItem} key={i}>
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
		</div>
	)
}

export default ProjectInfo
