import React from "react"

import * as styles from "./EmailButton.module.sass"

interface EmailButtonProps {
	className?: string
	text: string
}

const EmailButton: React.FC<EmailButtonProps> = ({ className, text }) => {
	const [copied, setCopied] = React.useState(false)
	return (
		<button
			className={[className, styles.button].join(" ")}
			onClick={() => {
				navigator.clipboard.writeText(text)
				setCopied(true)
				const timeout = setTimeout(() => {
					clearTimeout(timeout)
					setCopied(false)
				}, 1000)
			}}
		>
			<span>{text}</span>
			{copied && <span className={styles.toolTip}>Copied!</span>}
		</button>
	)
}

export default EmailButton
