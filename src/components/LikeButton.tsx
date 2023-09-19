import React, { useState } from 'react'

function LikeButton() {
  const [fill, setFill] = useState('none')
  function handleClick(): void {
    // TODO: add to favorites
    if (fill === 'red') setFill('none')
    else setFill('red')
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="red"
      className="w-6 h-6 transition-transform hover:scale-125 cursor-pointer"
      onClick={handleClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  )
}

export default LikeButton
