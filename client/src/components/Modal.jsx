import React from 'react'

import './Modal.css'

export default function Modal({ handleClose, children }) {
  return (
    <dialog className="Modal">
      <div className="modal-content">{children}</div>
    </dialog>
  )
}
