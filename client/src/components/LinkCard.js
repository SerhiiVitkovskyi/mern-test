import React from 'react'

export const LinkCard = ({link}) => {
  return (
    <>
      <h2>Reference</h2>    
      <p>
        Your link: <a href={link.to} target="_blank" rel="noopoener noreferrer" >{link.to}</a> 
      </p>
      <p>
        From: <a href={link.from}  target="_blank" rel="noopoener noreferrer" >{link.from}</a>
      </p>
      <p>
        Link clicks: <strong>{link.clicks}</strong> 
      </p>

  <p>Date of creation: <strong>{ new Date(link.date).toLocaleDateString() }</strong> </p>

    </>
  )
}