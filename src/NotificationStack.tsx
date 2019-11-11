import * as React from "react"
import { Children, useState, useEffect } from "react"

interface Props {
    children: any
}

export function NotificationStack(props: Props): React.ReactElement {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [nextIndex, setNextIndex] = useState(0)
    const [timeoutId, setTimeoutId] = useState(null)

    useEffect(() => {
        if (nextIndex >= 1) {
            setTimeoutId(
                setTimeout(() => {
                    setCurrentIndex(nextIndex)
                }, 400)
            )
        }

        return () => clearTimeout(timeoutId)
    }, [nextIndex])

    return (
        <div>
            {Children.map(props.children, (child, index) => {
                return React.cloneElement(child, {
                    ...child.props,
                    isOpen: currentIndex === index,
                    onClose() {
                        setNextIndex(index + 1)
                    },
                    onAction() {
                        setCurrentIndex(index + 1)
                    },
                })
            })}
        </div>
    )
}

NotificationStack.defaultProps = {
    children: [],
}