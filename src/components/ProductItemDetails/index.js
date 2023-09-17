import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineMinusSquare, AiOutlinePlusSquare} from 'react-icons/ai'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'
import './index.css'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class ProductItemDetails extends Component {
  state = {productDetail: [], similarData: [], count: 1, isLoading: true}

  componentDidMount() {
    this.getProductDetail()
  }

  onIncrease = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onDecrease = () => {
    this.setState(prevState => ({count: prevState.count - 1}))
  }

  updatingData = data => {
    const updatedData = {
      availability: data.availability,
      brand: data.brand,
      description: data.description,
      id: data.id,
      imageUrl: data.image_url,
      price: data.price,
      rating: data.rating,
      style: data.style,
      title: data.title,
      totalReviews: data.total_reviews,
    }
    this.setState({productDetail: updatedData, isLoading: false})
  }

  similarData = data => {
    const {similarData} = this.state
    const updatedSimilarData = {
      availability: data.availability,
      brand: data.brand,
      description: data.description,
      id: data.id,
      imageUrl: data.image_url,
      price: data.price,
      rating: data.rating,
      style: data.style,
      title: data.title,
      totalReviews: data.total_reviews,
    }
    console.log(similarData)
    this.setState(prevState => ({
      similarData: [...prevState.similarData, updatedSimilarData],
    }))
  }

  getProductDetail = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.updatingData(data)
      data.similar_products.map(eachItem => this.similarData(eachItem))
    } else {
      this.errorData()
    }
  }

  renderProductDetails = () => {
    const {productDetail, count} = this.state
    const {
      availability,
      brand,
      description,
      imageUrl,
      price,
      rating,
      style,
      title,
      totalReviews,
    } = productDetail
    return (
      <>
        <Header />
        <div className="selected-product-container">
          <img src={imageUrl} alt={style} className="selected-product-img" />
          <div className="product-details-container">
            <p className="title-section">{title}</p>
            <p className="price-section">RS {price}/-</p>
            <div className="rating-review-section">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p className="review">{totalReviews} Reviews</p>
            </div>
            <p className="description">{description}</p>
            <p className="availability">
              <span>Available: </span>
              {availability}
            </p>
            <p className="brand-section">
              <span>Brand: </span>
              {brand}
            </p>
            <hr />
            <div className="quantity">
              <button type="button" className="btn" onClick={this.onDecrease}>
                <AiOutlineMinusSquare />
              </button>
              <div>
                <p className="count">{count}</p>
              </div>
              <button type="button" className="btn" onClick={this.onIncrease}>
                <AiOutlinePlusSquare />
              </button>
            </div>
            <button type="button" className="add-cart-btn">
              Add Cart
            </button>
          </div>
        </div>
        <h1 className="similar-heading">Similar Product</h1>
        {this.similarProducts()}
      </>
    )
  }

  similarProducts = () => {
    const {similarData} = this.state
    return (
      <ul className="products-list">
        {similarData.map(eachItem => (
          <SimilarProductItem similarData={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        {isLoading ? (
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={50}
            width={50}
            className="bg-container"
          />
        ) : (
          this.renderProductDetails()
        )}
      </div>
    )
  }
}

export default ProductItemDetails
