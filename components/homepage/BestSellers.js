import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import RctSectionLoader from "Components/RctSectionLoader";
import { formatPrice } from "Components/Helpers/helpers";

// Carousel
import Carousel from "react-multi-carousel";
import { getFeaturedCars } from "Ducks/homepage";

import { Icon } from '@iconify/react';
import tickIcon from '@iconify/icons-subway/tick';
import arrowRight from '@iconify/icons-bi/arrow-right';

class BestSeller extends Component {
  componentDidMount() {
  
    this.props.getFeaturedCars();
  }

  render() {    
    console.log(this.props.featuredCars);
    return (
      <div className="featured-cars-area container">
        <div className="row">
        <h2>Featured Cars</h2>
        </div>
        <div className="row">
          {
          this.props.featuredCars.data.map(car => {
            return (
              <Link href={car.url}>
              <div className="featured-car col-xs-12 col-sm-6 col-lg-3" style={{cursor:"pointer"}}>
              
               <div class="imgBox"> <img src={car.thumbnail }/></div>
               <h3  style={{marginBottom:0}}>{ car.name }</h3>
                <h5 style={{marginTop:5}}>fr {car.price }</h5>
              </div>
              </Link>
            )
          })
          }
                
      </div>
      </div>
     
    );
  }
}
const mapStateToProps = ({ HomeState }) => {
  const { FeaturedState } = HomeState;
  const { featuredCars } = FeaturedState;
  return { featuredCars };
};

export default connect(mapStateToProps, { getFeaturedCars })(BestSeller);
/*
<section className="best-sellers-area">
        <div className="container">
          <div className="section-title without-bg" align="center">
            <h2>Featured Cars</h2>
          </div>

          <div className="sub-title">
            <div className="box">
              <h5>MPV / SUV</h5>
                <div className="fc-box">
                <div className="feature-cars">
                  <h3>TOYOTA RAIZE</h3>
                  <img src="/static/feature-cars/toyota-raize.png"/>
                  <h5>fr $175,888</h5>
                  <p>
                    <Icon icon={tickIcon} color="#48A62E" />&nbsp;
                    Engine Cap: 2493cc
                  </p>
                  <p>
                    <Icon icon={tickIcon} color="#48A62E" />&nbsp;
                    Power: 180bhp
                  </p>
                  <p>
                    <Icon icon={tickIcon} color="#48A62E" />&nbsp;
                    Fuel Consumption: 11.6 km/litre
                  </p>
                  <Link href="/">
                    <a className="btn moreBtn">
                      DISCOVER MORE &nbsp;&nbsp; <Icon icon={arrowRight} width="1.5rem"/>
                    </a>
                  </Link>
                  <p className="terms"> Vaild till 1 Jan 2021 12pm. Price subject to change without prior notice. Terms &amp; Conditions Apply. VES Banding: A2</p>
                </div>
                <hr />
                <div className="feature-cars">
                  <h3>TOYOTA VELLFIRE</h3>
                  <img src="/static/feature-cars/toyota-vellfire.png"/>
                  <h5>fr $169,888</h5>
                  <p>
                    <Icon icon={tickIcon} color="#48A62E" />&nbsp;
                    Engine Cap: 2493cc
                  </p>
                  <p>
                    <Icon icon={tickIcon} color="#48A62E" />&nbsp;
                    Power: 180bhp
                  </p>
                  <p>
                    <Icon icon={tickIcon} color="#48A62E" />&nbsp;
                    Fuel Consumption: 11.6 km/litre
                  </p>
                  <Link href="/">
                    <a className="btn moreBtn">
                      DISCOVER MORE &nbsp;&nbsp; <Icon icon={arrowRight} width="1.5rem"/>
                    </a>
                  </Link>
                  <p className="terms"> Vaild till 1 Jan 2021 12pm. Price subject to change without prior notice. Terms &amp; Conditions Apply. VES Banding: A2</p>
                </div>
              </div>
            </div>
            <div className="box">
              <h5>HATCHBACKS</h5>
              <div className="fc-box">
              <div className="feature-cars">
                <h3>HONDA FIT</h3>
                <img src="/static/feature-cars/honda-fit.png"/>
                <h5>fr $74,000</h5>
                <p>
                  <Icon icon={tickIcon} color="#48A62E" />&nbsp;
                  Engine Cap: 1339cc
                </p>
                <p>
                  <Icon icon={tickIcon} color="#48A62E" />&nbsp;
                  Power: 84bhp
                </p>
                <p>
                  <Icon icon={tickIcon} color="#48A62E" />&nbsp;
                  Fuel Consumption: 24.0 km/litre
                </p>
                <Link href="/">
                  <a className="btn moreBtn">
                    DISCOVER MORE &nbsp;&nbsp; <Icon icon={arrowRight} width="1.5rem"/>
                  </a>
                </Link>
                <p className="terms"> Vaild till 1 Jan 2021 12pm. Price subject to change without prior notice. Terms &amp; Conditions Apply. VES Banding: A2</p>
                </div>
                <hr />
                <div className="feature-cars">
                <h3>SUZUKI SWIFT</h3>
                <img src="/static/feature-cars/suzuki-swift.png"/>
                <h5>fr $65,888</h5>
                <p>
                  <Icon icon={tickIcon} color="#48A62E" />&nbsp;
                  Engine Cap: 1244cc
                </p>
                <p>
                  <Icon icon={tickIcon} color="#48A62E" />&nbsp;
                  Power: 90bhp
                </p>
                <p>
                  <Icon icon={tickIcon} color="#48A62E" />&nbsp;
                  Fuel Consumption: 24.0 km/litre
                </p>
                <Link href="/">
                  <a className="btn moreBtn">
                    DISCOVER MORE &nbsp;&nbsp; <Icon icon={arrowRight} width="1.5rem"/>
                  </a>
                </Link>
                <p className="terms"> Vaild till 1 Jan 2021 12pm. Price subject to change without prior notice. Terms &amp; Conditions Apply. VES Banding: A2</p>
              </div>
            </div>
            </div>
            <div className="box">
              <h5>NEW ARRIVALS</h5>
              <div className="fc-box">
                <div className="feature-cars">
                <h3>TOYOTA RAIZE</h3>
                <img src="/static/feature-cars/toyota-raize.png"/>
                <h5>fr $79,888</h5>
                <p>
                  <Icon icon={tickIcon} color="#48A62E" />&nbsp;
                  Engine Cap: 996 cc
                </p>
                <p>
                  <Icon icon={tickIcon} color="#48A62E" />&nbsp;
                  Power: 98 bhp
                </p>
                <p>
                  <Icon icon={tickIcon} color="#48A62E" />&nbsp;
                  Fuel Consumption: 18.8 km/litre
                </p>
                <Link href="/">
                  <a className="btn moreBtn">
                    DISCOVER MORE &nbsp;&nbsp; <Icon icon={arrowRight} width="1.5rem"/>
                  </a>
                </Link>
                <p className="terms"> Vaild till 1 Jan 2021 12pm. Price subject to change without prior notice. Terms &amp; Conditions Apply. VES Banding: A2</p>
                </div>
                <hr />
                <div className="feature-cars">
                <h3>HONDA FIT</h3>
                <img src="/static/feature-cars/honda-fit.png"/>
                <h5>fr $74,888</h5>
                <p>
                  <Icon icon={tickIcon} color="#48A62E" />&nbsp;
                  Engine Cap: 1339 cc
                </p>
                <p>
                  <Icon icon={tickIcon} color="#48A62E" />&nbsp;
                  Power: 84 bhp
                </p>
                <p>
                  <Icon icon={tickIcon} color="#48A62E" />&nbsp;
                  Fuel Consumption: 24.0 km/litre
                </p>
                <Link href="/">
                  <a className="btn moreBtn">
                    DISCOVER MORE &nbsp;&nbsp; <Icon icon={arrowRight} width="1.5rem"/>
                  </a>
                </Link>
                <p className="terms"> Vaild till 1 Jan 2021 12pm. Price subject to change without prior notice. Terms &amp; Conditions Apply. VES Banding: A2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
*/