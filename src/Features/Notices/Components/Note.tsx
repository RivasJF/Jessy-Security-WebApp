import React, { useEffect, useRef, useState } from 'react'
import type { Notice } from '../../../Api/Notices/notices.v1'
import '../styles/Note.css'

export default function Note(notice: Notice) {
  const { id, message } = notice;
  const elRef = useRef<HTMLDialogElement | null>(null)
  const draggingRef = useRef(false)
  const offsetRef = useRef({ x: 0, y: 0 })
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    // place the dialog where it currently is in the layout
    const el = elRef.current
    if (el) {
      const rect = el.getBoundingClientRect()
      setPos({ x: rect.left, y: rect.top })
    }
  }, [])

  useEffect(() => {
    function onPointerMove(e: PointerEvent) {
      if (!draggingRef.current) return
      setPos({ x: e.clientX - offsetRef.current.x, y: e.clientY - offsetRef.current.y })
    }

    function onPointerUp() {
      draggingRef.current = false
      setDragging(false)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [])

  function handlePointerDown(e: React.PointerEvent) {
    draggingRef.current = true
    setDragging(true)
    const startX = e.clientX
    const startY = e.clientY
    offsetRef.current = { x: startX - pos.x, y: startY - pos.y }
    try {
      (e.target as Element).setPointerCapture(e.pointerId)
    } catch {}
  }

  return (
    <dialog
      ref={elRef}
      className={`notice-card ${dragging ? 'grabbing' : ''}`}
      data-id={id}
      style={{ position: 'absolute', left: pos.x, top: pos.y, touchAction: 'none' }}
      onPointerDown={handlePointerDown}
    >
      <div className="notice-content">
        <h2 className="notice-title">{message}</h2>
      </div>
    </dialog>
  )
}
