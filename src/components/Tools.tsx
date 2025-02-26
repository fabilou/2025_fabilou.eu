import * as React from "react"

import * as styles from "./Tools.module.sass"

interface ToolsProps {
	skills?: Array<String>
	name: string
}

const Tools: React.FC<ToolsProps> = ({ name, skills }) => {
	return (
		<div className={styles.toolContainer}>
			<p>{name}</p>
			<div className={styles.toolDetails}>
				{skills && <p>{skills.join(" + ")}</p>}
			</div>
		</div>
	)
}

export default Tools
