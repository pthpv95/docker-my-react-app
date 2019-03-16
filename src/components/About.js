import React from "react"
import myPic from '../assets/images/me.jpg'
import me_raceing from '../assets/images/me_racing.png'

const About = props => {
  return (
    <div className="container">
    <h3>This is me!</h3>
      <div className="gallery">
        <figure className="gallery__item gallery__item--1">
          <img src={myPic} alt="Gallery image 1" className="gallery__img" />
        </figure>
        <figure className="gallery__item gallery__item--2">
          <img src={myPic} alt="Gallery image 2" className="gallery__img" />
        </figure>
        <figure className="gallery__item gallery__item--3">
          <img
            src={me_raceing}
            alt="Gallery image 3"
            className="gallery__img"
          />
        </figure>
        <figure className="gallery__item gallery__item--4">
          <img src={myPic} alt="Gallery image 4" className="gallery__img" />
        </figure>
      </div>
    </div>
  )
}
export default About