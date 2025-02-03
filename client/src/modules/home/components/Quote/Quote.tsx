import character from '/3d character1.png'

function Quote() {
  return (
    <div className="box_container">
      <h3 className="title">Today's Quote</h3>
      <div className="box quote_box">
        <p className="quote">
          “Hydration is key! Drink water regularly to keep your body and mind in top shape”
        </p>
        <img src={character} alt="3d character" className="character" />
      </div>
    </div>
  )
}

export default Quote
