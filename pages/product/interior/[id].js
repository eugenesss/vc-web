import React, { Component } from "react";
import Default from "Components/Layout/PageTemplates/Default";
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

class Product extends Component {
    constructor(props) {
      super(props)
      this.state = {
        selectedGradeId: this.props.data.fields["Seating Fabrics"].objects[0].productId, // need to pull off global state
        selectedInteriorId: "",
      }

      this.handleClick = this.handleClick.bind(this)
    }
    handleClick(event) {
      const { id } = event.target
      this.setState({
        ...this.state,
        selectedInteriorId: id
      })
    }
  render(){
    console.log("props: ", this.props)
    console.log("state: ", this.state)

    return (
      <Default>
        <section className="contact-area pb-60">
          <div className="container">
            <div className="section-title">
              <p>03 Interior</p>
                <ul className="p-0 list-unstyled">
                  {this.props.data.fields["Seating Fabrics"].objects.map(( item, id ) => (
                    <li 
                      key= { id }
                      id={ item.id }
                      style={ item.id == this.state.selectedInteriorId ? {border: "2px solid orange"} : {border: "1px solid #DEE2E6"}}
                      onClick={ this.handleClick }
                    >
                      { item.name }<br/>
                      ${ item.price }
                    </li>
                  ))}
                </ul>
              <Link href={`/product/exterior/${this.state.selectedGradeId}`}>
                <button>Back</button>
              </Link>
              <Link href={`/product/rims/${this.state.selectedGradeId}`}>
                <button disabled={!(!!this.state.selectedInteriorId)}>04 Rims</button>
              </Link>
            </div>
          </div>
        </section>
      </Default>
    )
  }
}

Product.getInitialProps = async function({ctx}) {
  const { id } = ctx.query
  const res = await fetch(`http://159.65.14.175:3001/api/products/specificVariantInterior/${id}`)
  const data = await res.json()
  return {data}
}

export default Product;

// function mapStateToProps({TestState}) {
//     console.log('product mapStateToProps')
//     const{ProductState} = TestState
//     console.log(ProductState)
//     // const pId = ownProps.match.params.id;
//     // const product = state.posts[pId];
//     return {
//         ProductState
//     };
// }
// export default connect(
// mapStateToProps,
// {
//     getProductList
// }
// )(product);