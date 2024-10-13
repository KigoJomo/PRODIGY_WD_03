"use client"

import React, { useState } from "react"

const Choose = ({onChoose}) =>{
  const [choice, setChoice] = useState(null)

  const handleChoice = (choice) =>{
    setChoice(choice)
  }

  return (
    <section className="w-full ">
      <h2>choose a side</h2>
      
      <div className=""></div>

      <button onClick={onChoose(choice)}>proceed</button>
    </section>
  )
}

export default Choose