import { useEffect, useState } from 'react'
import character from '/3d character1.png'
import quotesData from '../../data/quotes.json'

function Quote() {
  const [quote, setQuote] = useState('')
  const quotes = quotesData?.quotes

  useEffect(() => {
    const today = new Date()
    const index = today.getDate() % quotes.length
    setQuote(quotes[index])
  }, [])

  return (
    <div className="box_container">
      <h3 className="title">Today's Quote</h3>
      <div className="box quote_box">
        <p className="quote">
          "{quote}"
        </p>
        <img src={character} alt="3d character" className="character" />
      </div>
    </div>
  )
}

export default Quote
