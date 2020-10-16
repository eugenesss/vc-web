import * as types from "./ProductTypes";

const INIT_STATE = {
  ProductModel: {
    id: null,
    name: null,
    image: null,
    description: null
  },
  ProductGrade: {
    id: null,
    name: null,
    price: 0,
    description: null,
    images: [],
    data: {}
  },
  ProductSpecification: {},
  ProductExterior: {
    data: {},
    selected: null
  },
  ProductInterior: {
    data: {},
    selected: null
  },
  ProductRims: {
    data: {},
    selected: null
  },
  ProductAccessories: {
    selected: null,
    data: {}
  },
  ProductTotal: {
    subtotal: 0,
    misc: 0,
    gst: 0,
    total: 0
  },
  CoeSelected: {
    name: "",
    price:-1
  },
  AftersaleSelected: {
    warranty: null,
    servicing: null
  },
  LoanCalculator: {
    loanTerm: 0,
    loanAmount: 0,
    interestRate: 0,
    downPayment: 0,
    deposit: 500,
    monthlyInstallment: 0
  },
  featuredCars: {
    featured: [],
    loading: false
  }
};

export default (state = INIT_STATE, action) => {
  // console.log("redux state= ", state)
  switch (action.type) {
    case types.GET_PRODUCT_MODEL_DATA:
      return {
        ...state
      };

    case types.GET_PRODUCT_MODEL_DATA_SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        ProductModel: {
          id: data.id,
          name: data.name,
          image: data.files[0].path,
          description: data.description
        }
      };

    case types.GET_PRODUCT_MODEL_DATA_FAILURE:
      return {
        ...state
      };

    case types.GET_PRODUCT_GRADES:
      return {
        ...state
      };

    case types.GET_PRODUCT_GRADES_SUCCESS:
      var {
        gradeId,
        gradesData
        
      } = action.payload;      

      const ProductGrade = gradesData.data.fields.find(
        element => element.id === gradeId
      );
      /*
      specificationData,
        exteriorData,
        interiorData,
        accessoriesData
      var imageList = [];
      var thumbsList = [];
      var populateImageList = ProductGrade => {
        ProductGrade.files.map(item => {
          imageList.push(item.path);
        });
      };
      populateImageList(ProductGrade);
      ProductGrade.images.forEach(element => {
        thumbsList.push(element.path);
      });
      ProductSpecification: {
          data: specificationData.data.fields.Detail
        },
        ProductExterior: {
          data: exteriorData.data
        },
        ProductInterior: {
          data: interiorData.data
        },
        ProductAccessories: {
          ...state.ProductAccessories,
          data: accessoriesData.data
        }
      */
      let image = ProductGrade.files.length > 0 ? ProductGrade.files[0].path : "";
      let thumb = ProductGrade.images.length > 0 ? ProductGrade.images[0].path : "";
      return {
        ...state,
        ProductGrade: {
          id: ProductGrade.id,
          name: ProductGrade.name,
          price: ProductGrade.selling_Price,
          description: ProductGrade.description,
          details: ProductGrade.details,
          images: image,
          thumbs: thumb,
          data: gradesData.data
        }        
      };

    case types.GET_PRODUCT_GRADES_FAILURE:
      return {
        ...state
      };

    case types.SELECTED_PRODUCT_GRADE:
      var id = action.payload;
      var { fields } = state.ProductGrade.data;      
      var object = fields.find(element => element.id === id);
      if(object){
        image = object.files.length > 0 ? object.files[0].path : "";
        thumb = object.images.length > 0 ? object.images[0].path : "";
      }
      else {
        object = {}
      }
      
      return {
        ...state,
        ProductGrade: {
          ...state.ProductGrade,
          id: object.id,
          name: object.name,
          price: object.selling_Price,
          description: object.description,
          images: image,
          thumbs: thumb
        }
      };

    case types.GET_PRODUCT_GRADE_DATA:
      return {
        ...state
      };

    case types.GET_PRODUCT_GRADE_DATA_SUCCESS:
      var {
        id,
        specificationData,
        exteriorData,
        interiorData,
        accessoriesData
      } = action.payload;
      let interior = { fields : {}};
      let rims = { fields: {}};
      Object.entries(interiorData.data.fields).map(([variance, data]) => {
        if(variance == "Rims"){
          rims.fields[variance] = data;
        }
        else {
          interior.fields[variance] = data;
        }
      });
      //console.log(exteriorData.data);
      return {
        ...state,
        ProductSpecification: {
          data: {
            ...state.ProductSpecification.data,
           [id]:  specificationData.data.fields.Detail
          }
        },
        ProductExterior: {
          data: {
           ...state.ProductExterior.data, 
           [id]: exteriorData.data
          }
        },
        ProductInterior: {
          data: {
            ...state.ProductInterior.data,
            [id]:interior
          }
        },
        ProductRims: {
          data: {
            ...state.ProductRims.data,
            [id]: rims
          }
        },
        ProductAccessories: {
          ...state.ProductAccessories,
          data: {
            ...state.ProductAccessories.data,
            [id]: accessoriesData.data
          }
        }
      };

    case types.GET_PRODUCT_GRADE_DATA_FAILURE:
      return { ...state };

    case types.SELECTED_PRODUCT_EXTERIOR:      
      return {
        ...state,
        ProductExterior: {
          ...state.ProductExterior,
          selected: {
            ...state.ProductExterior.selected,
            ...action.payload
          }
        }
      };

    case types.SELECTED_PRODUCT_INTERIOR:
      return {
        ...state,
        ProductInterior: {
          ...state.ProductInterior,
          selected: {
            ...state.ProductInterior.selected,
            ...action.payload
          }
        }
      };
    case types.SELECTED_PRODUCT_RIMS:
      return {
        ...state,
        ProductRims: {
          ...state.ProductRims,
          selected: {
            ...state.ProductRims.selected,
            ...action.payload
          }
        }
      }

    case types.SELECTED_PRODUCT_ACCESSORIES:
      //let selectedAccessoriesId = [];
      let selectedAccessories = { ...state.ProductAccessories.selected };      

      var { fields } = state.ProductAccessories.data[state.ProductGrade.id];
      var options = fields[action.payload.variance].options;
      selectedAccessories[action.payload.variance] = [];     
      options.map(item => {
        
          let found = action.payload.selectedIds.indexOf(item.id);
          if (
            found >= 0
          ) {
            selectedAccessories[action.payload.variance].push({              
              id: item.id,
              name: item.name,
              price: item.price,
              thumbnail: item.files.length > 0 && item.files[0].path
            });
          }        
      });
      return {
        ...state,
        ProductAccessories: {
          ...state.ProductAccessories,
          selected: selectedAccessories
        }
      };
    case types.SELECTED_COE_PACKAGE:
      return {
        ...state,
        CoeSelected: action.payload
      };
    case types.SELECTED_AFTERSALES_PACKAGE:
      return {
        ...state,
        AftersaleSelected: action.payload
      };

    case types.UPDATE_LOAN_CALCULATOR:
      var {
        loanTerm,
        loanAmount,
        interestRate,
        downPayment,
        deposit,
        monthlyInstallment
      } = action.payload;
      return {
        ...state,
        LoanCalculator: {
          loanTerm: loanTerm,
          loanAmount: loanAmount,
          interestRate: interestRate,
          downPayment: downPayment,
          deposit: deposit,
          monthlyInstallment: monthlyInstallment
        }
      };

    case types.UPDATE_PRODUCT_TOTAL:   
      const { subtotal, misc, gst, total } = action.payload.current;
      return {
        ...state,
        ProductTotal: {
          subtotal: subtotal,
          misc: misc,
          gst: gst,
          total: total
        }
      };

    case types.GET_FEATURED_CARS:
      return {
        ...state,
        featuredCars: { ...state.featuredCars, loading: true }
      };

    case types.GET_FEATURED_CARS_SUCCESS:
      return {
        ...state,
        featuredCars: {
          ...state.featuredCars,
          loading: false,
          featured: action.payload
        }
      };
    case types.GET_FEATURED_CARS_FAILURE:
      return {
        ...state,
        featuredCars: { ...state.featuredCars, loading: false }
      };

    case types.GET_INTEREST_RATE:
      return {
        ...state
      };

    case types.GET_INTEREST_RATE_SUCCESS:
      var interestRate;
      !!action.payload.data[0]
        ? (interestRate = action.payload.data[0].interestRate)
        : (interestRate = 0);
      return {
        ...state,
        LoanCalculator: {
          ...state.LoanCalculator,
          interestRate: interestRate
        }
      };

    case types.GET_INTEREST_RATE_FAILURE:
      return {
        ...state
      };
    
      case types.UPDATE_LOAN_CALCULATOR:
        return {
          ...state,
          LoanCalculator: action.payload
        }

    default:
      return { ...state };
  }
};
