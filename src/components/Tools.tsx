import * as React from "react"

import * as styles from "./Tools.module.sass"

interface ToolsProps {
	skills?: Array<String>
	name: string
}

const Tools: React.FC<ToolsProps> = ({ name, skills }) => {
	return (
		<div className={styles.container}>
			<p className={styles.name}>{name}</p>
			<div className={styles.details}>
				{skills && <p>{skills.join(" + ")}</p>}
			</div>
		</div>
	)
}

export default Tools
