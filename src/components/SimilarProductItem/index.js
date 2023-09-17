import './index.css'

const SimilarProductItem = props => {
  const {similarData} = props
  const {brand, imageUrl, price, rating, style, title} = similarData
  return (
    <li className="product-item similar-product">
      <img src={imageUrl} alt={style} className="thumbnail" />
      <p className="title">{title}</p>
      <p className="brand">by {brand}</p>
      <div className="product-details">
        <p className="price">RS:{price}</p>
        <div className="rating-container">
          <p className="rating">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
