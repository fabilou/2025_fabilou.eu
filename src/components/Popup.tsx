import * as React from "react"
import { navigate } from "gatsby"

import { useGlobalContext } from "./GlobalContext"

import * as styles from "./Popup.module.sass"

interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {}

const Popup: React.FC<PopupProps> = ({ children }) => {
	const { projectURL } = useGlobalContext()

	const popup = React.useRef<HTMLDivElement>(null)
	const popupContainer = React.useRef<HTMLDivElement>(null)

	const [isInside, setIsInside] = React.useState(false)

	const closePopup = () => {
		popup.current?.classList.add(styles.close)
		popupContainer.current?.addEventListener("animationend", () =>
			navigate(projectURL ? projectURL : "/")
		)
	}

	const handleMouseDown = (e: React.MouseEvent) => {
		popup.current &&
			setIsInside(() => {
				const bounds = popup.current?.getBoundingClientRect()

				if (
					bounds &&
					bounds.top <= e.clientY &&
					e.clientY <= bounds.top + bounds.height &&
					bounds.left <= e.clientX &&
					e.clientX <= bounds.left + bounds.width
				) {
					return true
				} else {
					closePopup()
					return false
				}
			})
	}

	return (
		<div onMouseDown={(e) => handleMouseDown(e)} ref={popupContainer}>
			<div
				className={styles.container}
				ref={popup}
				onPointerEnter={() => setIsInside(true)}
				onPointerLeave={() => setIsInside(false)}
			>
				<button className={styles.button} onClick={() => closePopup()}>
					Close
				</button>
				<div>{children}</div>
			</div>
			<div className={styles.overlay}></div>
		</div>
	)
}

export default Popup
