import * as React from "react"
import { useState, useEffect } from "react"

interface Props {
    text: string
    action?: string
    duration: number
    isOpen: boolean
    classNames: {
        container: string
        surface: string
        text: string
        button: string
    }
    onOpen?: () => void
    onClose?: () => void
    onAction?: () => void
}

// Snackbars inform users of a process that an app has performed or will perform.
// Official guidelines from Material: https://material.io/components/snackbars/#
export function Notification({
    text,
    action,
    duration,
    classNames = { container: "", surface: "", text: "", button: "" },
    isOpen,
    onOpen,
    onClose,
    onAction,
}: Props) {
    const [open, setOpen] = useState(isOpen)
    const [timeoutId, setTimeoutId] = useState(null)

    useEffect(() => {
        if (isOpen) {
            onOpen()
            setOpen(true)
            setTimeoutId(setTimeout(() => setOpen(false), duration))
        } else if (!isOpen) {
            onClose()
            setOpen(false)
            clearTimeout(timeoutId)
            setTimeoutId(null)
        }

        return () => clearTimeout(timeoutId)
    }, [isOpen])

    const transition = `opacity 150ms 0ms cubic-bezier(0, 0, 0.2, 1),\    
                        transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)`

    const boxShadow = `rgba(0, 0, 0, 0.2) 0px 3px 5px -1px,\ 
                       rgba(0, 0, 0, 0.137255) 0px 6px 10px 0px,\
                       rgba(0, 0, 0, 0.117647) 0px 1px 18px 0px`

    return (
        <div
            className={classNames.container}
            style={{
                pointerEvents: "none",
                transition,
                WebkitTransition: transition,
                MozTransition: transition,
                OTransition: transition,
                // Scale down when closed
                ...(!open && {
                    transform: `scale(0.8)`,
                    WebkitTransform: `scale(0.8)`,
                    MozTransform: `scale(0.8)`,
                    OTransform: `scale(0.8)`,
                    msTransform: `scale(0.8)`,
                    opacity: 0,
                }),
                // Scale up when opened
                ...(open && {
                    transform: `scale(1)`,
                    WebkitTransform: `scale(1)`,
                    MozTransform: `scale(1)`,
                    OTransform: `scale(1)`,
                    msTransform: `scale(1)`,
                    opacity: 1,
                }),
            }}
        >
            <div
                className={classNames.surface}
                style={{
                    position: "relative",
                    bottom: 0,
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "flex-start",
                    boxSizing: "border-box",
                    minWidth: 344,
                    maxWidth: 672,
                    margin: 8,
                    borderRadius: 4,
                    fontFamily: "Roboto, sans-serif",
                    background: "rgba(51, 51, 51, 1)",
                    boxShadow,
                    WebkitBoxShadow: boxShadow,
                    MozBoxShadow: boxShadow,
                    pointerEvents: "auto",
                }}
            >
                <div
                    className={classNames.text}
                    style={{
                        position: "relative",
                        flexGrow: 1,
                        height: "auto",
                        minHeight: 48,
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingTop: 14,
                        paddingBottom: 14,
                        color: "rgba(255, 255, 255, 1)",
                        fontSize: 14,
                        fontWeight: 400,
                        lineHeight: "20px",
                        letterSpacing: "0.25px",
                        wordSpacing: 0,
                    }}
                    role="status"
                    aria-live="polite"
                >
                    {text}
                </div>
                {action && (
                    <button
                        className={classNames.button}
                        onClick={() => {
                            setOpen(false)
                            onAction()
                        }}
                        style={{
                            flexShrink: 0,
                            minHeight: 36,
                            minWidth: 64,
                            margin: 0,
                            paddingTop: 14,
                            paddingBottom: 14,
                            paddingLeft: 16,
                            paddingRight: 16,
                            color: "rgb(187, 134, 252)",
                            fontSize: 14,
                            fontWeight: 500,
                            lineHeight: "20px",
                            textTransform: "uppercase",
                            letterSpacing: "1.25px",
                            wordSpacing: 0,
                            border: "none",
                            outline: "none",
                            background: "none",
                        }}
                    >
                        {action}
                    </button>
                )}
            </div>
        </div>
    )
}

Notification.defaultProps = {
    text: "",
    action: "",
    duration: 4000,
    isOpen: false,
    onOpen: () => null,
    onClose: () => null,
    onAction: () => null,
}
