import { useState } from "react"
import { createPortal } from "react-dom"

import Icons from "~icons"

import "../style.css"

import ModalForm from "./ModalForm"

export const ReplyButton = (props: { showButton: boolean }) => {
  const { showButton } = props
  const [showPrompt, setShowPrompt] = useState(false)

  return (
    <>
      {/* Set the modal  */}
      {createPortal(
        showPrompt ? (
          <ModalForm open={showPrompt} setOpen={setShowPrompt} />
        ) : null,
        document.body
      )}
      {showButton && (
        <button
          onClick={() => setShowPrompt((prev) => !prev)}
          type="button"
          className="h-12 w-12 rounded-full transition-all border-none
      shadow-lg hover:shadow-md flex items-center justify-center
      active:scale-105 bg-slate-50 hover:bg-slate-100 text-slate-800 hover:text-slate-900">
          <Icons name="wand" />
        </button>
      )}
    </>
  )
}
