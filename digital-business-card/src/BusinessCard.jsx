import personData from "./me.js"
import neilImgUrl from "./assets/neil_ricci.jpeg"

import Info from "./components/Info.jsx"

import "./BusinessCard.css"


function BusinessCard() {

  return (
    <main>
      <div className="business-card-container">
        <Info
          personImgUrl={neilImgUrl}
          personInfo={personData.info}
        />
      </div>
    </main>
  )
}

export default BusinessCard
