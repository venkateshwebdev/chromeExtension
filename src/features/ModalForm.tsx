import React, { useState } from "react"

import { targetTextAreaClassName } from "~contents/content"
import Icons from "~icons"

// Random responses [ mocks ]
const messages = [
  "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.",
  "I appreciate the opportunity! If you have further questions or need additional assistance, don't hesitate to reach out.",
  "Thanks for the chance! Please let me know if you have any other questions or need any further help.",
  "Thank you for this opportunity! I'm here if you have any more questions or need any other assistance.",
  "Grateful for the opportunity! Feel free to ask if you have any other questions or require further assistance.",
  "Thanks for the opportunity! If there's anything else you need or any more questions you have, just let me know.",
  "Thank you for this chance! Should you have any other inquiries or need further help, please feel free to contact me."
]

// Modal form component
const ModalForm = (props: {
  open: boolean
  setOpen: (open: boolean) => void
}) => {
  const { setOpen } = props
  // value to store current input value
  const [value, setValue] = useState("")
  // value to store current generated content
  const [generatedContent, setGeneratedContent] = useState("")

  const onInsert = () => {
    // target the textarea and set the content.
    const textarea = document.querySelector(targetTextAreaClassName + " >p")
    const placeholder = document.querySelector(".msg-form__placeholder")
    const sendButton = document.querySelector(".msg-form__send-button")
    // remove the class 'msg-form__placeholder' from the placeholder
    if (placeholder) placeholder.classList.remove("msg-form__placeholder")
    // remove the disabled attribute from the send button
    sendButton.removeAttribute("disabled")
    // set the name to the textarea
    textarea.innerHTML = generatedContent
    // close the modal
    setOpen(false)
    setValue("")
  }

  const onGenerate = () => setGeneratedContent(messages[0])

  const onRegenerate = () => {
    // assign a random message to the generatedContent
    const randomIndex = Math.floor(Math.random() * messages.length)
    setGeneratedContent(messages[randomIndex])
  }

  return (
    <div
      className="absolute h-[100vh] z-50 top-0 w-[100vw] inset-0 bg-[#0D0D1233]"
      onClick={() => setOpen(false)}>
      <div className="grid !w-full !h-full place-content-center">
        <div
          className="bg-[#F9FAFB] w-[500px] rounded-xl px-6 py-6 flex flex-col gap-6"
          onClick={(e) => {
            // Dont close the modal when clicked inside the modal
            e.stopPropagation()
          }}>
          {value !== "" && generatedContent !== "" && (
            <p className="bg-[#DFE1E7] py-2 px-4 rounded-xl self-end">
              {value}
            </p>
          )}
          {generatedContent !== "" && (
            <p className="bg-[#DBEAFE] py-2 px-4 rounded-xl self-start w-3/4">
              {generatedContent}
            </p>
          )}
          <div className="flex flex-col justify-center items-center h-full">
            <input
              type="text"
              value={value}
              autoFocus
              onChange={(e) => setValue(e.target.value)}
              className="w-full h-14 border border-gray-300 rounded-xl px-3"
              placeholder="Your prompt"
            />
            {generatedContent === "" && (
              <button
                type="submit"
                className="px-8 py-2 bg-blue-500 text-white rounded-xl mt-4 self-end flex gap-2 items-center"
                onClick={onGenerate}>
                <div className="text-sm">
                  <Icons name="generate" />
                </div>
                Generate
              </button>
            )}
            {generatedContent !== "" && (
              <div className="flex gap-2 mt-4 self-end items-center">
                <button
                  className="px-8 py-2 border-2 border-b-gray-700 rounded-xl flex gap-2 items-center"
                  // gray color border
                  style={{ border: "2px solid #4B5563" }}
                  onClick={onInsert}>
                  <Icons name="down" />
                  Insert
                </button>
                <button
                  className="px-8 py-2 bg-blue-500 text-white rounded-xl flex gap-2 items-center"
                  onClick={onRegenerate}>
                  <Icons name="regenerate" />
                  Regenerate
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalForm
