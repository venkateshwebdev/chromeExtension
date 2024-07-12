import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import { useEffect, useState } from "react"

import { ReplyButton } from "~features/ReplyButton"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}
export const targetTextAreaClassName = ".msg-form__contenteditable"

// target the linked in message text area, and set reply button to be inline with it.
export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(targetTextAreaClassName)

const PlasmoOverlay = () => {
  const [showButton, setShowButton] = useState(false)

  // when the text area is focused, show the reply button.
  // listener that listens for the focus event on the text area.
  useEffect(() => {
    // show the reply button only when the data-artdeco-is-focused attribute is true, i.e when the message text area is focused.
    const msgForm = document.querySelector(targetTextAreaClassName)
    function handleFocus() {
      msgForm.setAttribute("data-artdeco-is-focused", "true")
      setShowButton(true)
    }
    function handleBlur() {
      setTimeout(() => {
        setShowButton(false)
        msgForm.removeAttribute("data-artdeco-is-focused")
      }, 200)
    }
    msgForm?.addEventListener("focus", handleFocus)
    msgForm?.addEventListener("blur", handleBlur)
    return () => {
      msgForm?.removeEventListener("focus", handleFocus)
      msgForm?.removeEventListener("blur", handleBlur)
    }
  }, [])

  return (
    <div className="z-50 flex absolute bottom-4 right-4">
      <ReplyButton showButton={showButton} />
    </div>
  )
}

export default PlasmoOverlay
