import * as React from "react"
import { Link, navigate } from "gatsby"

import * as styles from "./Popup.module.sass"

interface PopupProps extends React.HTMLAttributes<HTMLDivElement> {}

const Popup: React.FC<PopupProps> = ({ children }) => {
	const popup = React.useRef<HTMLDivElement>(null)
	const popupContainer = React.useRef<HTMLDivElement>(null)

	const [bounds, setBounds] = React.useState({
		top: 0,
		height: 0,
		left: 0,
		width: 0,
	})
	const [isInside, setIsInside] = React.useState(true)

	React.useEffect(() => {
		const updateBounds = () =>
			popup.current && setBounds(popup.current?.getBoundingClientRect())

		updateBounds()

		window.addEventListener("resize", () => updateBounds())

		return window.removeEventListener("resize", updateBounds)
	}, [])

	const closePopup = () => {
		popup.current?.classList.add(styles.close)
		popupContainer.current?.addEventListener("animationend", () =>
			navigate("/")
		)
	}

	const handlePointerDown = (e: React.PointerEvent) => {
		if (!isInside) {
			closePopup()
		}
	}

	const handlePointerMove = (e: React.PointerEvent) => {
		setIsInside(
			bounds &&
				bounds.top <= e.clientY &&
				e.clientY <= bounds.top + bounds.height &&
				bounds.left <= e.clientX &&
				e.clientX <= bounds.left + bounds.width
		)
	}

	return (
		<div
			onPointerDown={(e) => handlePointerDown(e)}
			onPointerMove={(e) => handlePointerMove(e)}
			ref={popupContainer}
		>
			<div className={styles.container} ref={popup}>
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
