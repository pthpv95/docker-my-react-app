import React from "react"
import { BrowserRouter as Router, Link } from "react-router-dom"

const Home = props => {
  return (
    <div className="container">
      <div className="gallery">
        <figure className="gallery__item gallery__item--1">
          <img
            src="https://picsum.photos/200?random"
            alt="Gallery image 1"
            className="gallery__img"
          />
        </figure>
        <figure className="gallery__item gallery__item--2">
          <img
            src="https://picsum.photos/200?random"
            alt="Gallery image 2"
            className="gallery__img"
          />
        </figure>
        <figure className="gallery__item gallery__item--3">
          <img
            src="https://picsum.photos/200?random"
            alt="Gallery image 3"
            className="gallery__img"
          />
        </figure>
        <figure className="gallery__item gallery__item--4">
          <img
            src="https://picsum.photos/200?random"
            alt="Gallery image 4"
            className="gallery__img"
          />
        </figure>
      </div>
    </div>
  )
}

export default Home
