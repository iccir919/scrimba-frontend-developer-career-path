import personData from "./me.js"
import neilImgUrl from "./assets/neil_ricci.jpeg"

import Info from "./components/Info.jsx"
import TopicSection from "./components/TopicSection.jsx"
import Footer from "./components/Footer.jsx"

import "./BusinessCard.css"


function BusinessCard() {

  return (
    <main className="business-card-container">
        <Info
          personImgUrl={neilImgUrl}
          personInfo={personData.info}
        />
        <TopicSection
          sectionTitle="About"
          content={personData.about}
        />
        <TopicSection
          sectionTitle="Interests"
          content={personData.interests}
        />
        <Footer 
          socials={personData.socials}
        />
    </main>
  )
}

export default BusinessCard
