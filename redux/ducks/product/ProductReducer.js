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
    id: null,
    name: null,
    price: 0,
    thumbnail: null,
    images: [],
    stockhistory: [],
    stockId: null,
    data: {}
  },
  ProductInterior: {
    id: null,
    name: null,
    price: 0,
    thumbnail: null,
    images: [],
    stockhistory: [],
    stockId: null,
    data: {}
  },
  ProductRims: {
    id: null,
    name: null,
    price: 0,
    thumbnail: null,
    images: [],
    stockhistory: [],
    stockId: null,
    data: {}
  },
  ProductAccessories: {
    selectedAccessories: [],
    data: {}
  },
  ProductTotal: {
    subtotal: 0,
    misc: 0,
    gst: 0,
    total: 0
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
        gradesData,
        specificationData,
        exteriorData,
        interiorData,
        accessoriesData
      } = action.payload;

      const ProductGrade = gradesData.data.fields.find(
        element => element.id === gradeId
      );

      var imageList = [];
      var populateImageList = ProductGrade => {
        ProductGrade.files.map(item => {
          imageList.push(item.path);
        });
      };
      populateImageList(ProductGrade);

      // need to update stockId here with checkstock() helper

      return {
        ...state,
        ProductGrade: {
          id: ProductGrade.id,
          name: ProductGrade.name,
          price: ProductGrade.selling_Price,
          description: ProductGrade.description,
          images: imageList,
          data: gradesData.data
        },
        ProductSpecification: {
          data: specificationData.data.fields.Detail
        },
        ProductExterior: {
          id: exteriorData.data.fields["Colors"].objects[0].id,
          name: exteriorData.data.fields["Colors"].objects[0].name,
          price: exteriorData.data.fields["Colors"].objects[0].price,
          thumbnail:
            exteriorData.data.fields["Colors"].objects[0].files[0].path,
          images: exteriorData.data.fields["Colors"].objects[0].images.map(
            item => item.path
          ),
          stockhistory:
            exteriorData.data.fields["Colors"].objects[0].stockhistory,
          data: exteriorData.data
        },
        ProductInterior: {
          id: interiorData.data.fields["Material"].objects[0].id,
          name: interiorData.data.fields["Material"].objects[0].name,
          price: interiorData.data.fields["Material"].objects[0].price,
          thumbnail:
            interiorData.data.fields["Material"].objects[0].files[0].path,
          images: interiorData.data.fields["Material"].objects[0].images.map(
            item => item.path
          ),
          stockhistory:
            interiorData.data.fields["Material"].objects[0].stockhistory,
          data: interiorData.data
        },
        ProductRims: {
          id: interiorData.data.fields["Rims"].objects[0].id,
          name: interiorData.data.fields["Rims"].objects[0].name,
          price: interiorData.data.fields["Rims"].objects[0].price,
          thumbnail: interiorData.data.fields["Rims"].objects[0].files[0].path,
          images: interiorData.data.fields["Rims"].objects[0].images.map(
            item => item.path
          ),
          stockhistory:
            interiorData.data.fields["Rims"].objects[0].stockhistory,
          data: interiorData.data
        },
        ProductAccessories: {
          ...state.ProductAccessories,
          data: accessoriesData.data
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

      var imageList = [];
      var populateImageList = object => {
        object.files.map(item => {
          imageList.push(item.path);
        });
      };
      populateImageList(object);

      return {
        ...state,
        ProductGrade: {
          ...state.ProductGrade,
          id: object.id,
          name: object.name,
          price: object.selling_Price,
          description: object.description,
          images: imageList
        }
      };

    case types.GET_PRODUCT_GRADE_DATA:
      return {
        ...state
      };

    case types.GET_PRODUCT_GRADE_DATA_SUCCESS:
      var {
        specificationData,
        exteriorData,
        interiorData,
        accessoriesData
      } = action.payload;

      // need to update stockId here with checkstock() helper

      return {
        ...state,
        ProductSpecification: {
          data: specificationData.data.fields.Detail
        },
        ProductExterior: {
          id: exteriorData.data.fields["Colors"].objects[0].id,
          name: exteriorData.data.fields["Colors"].objects[0].name,
          price: exteriorData.data.fields["Colors"].objects[0].price,
          thumbnail:
            exteriorData.data.fields["Colors"].objects[0].files[0].path,
          images: exteriorData.data.fields["Colors"].objects[0].images.map(
            item => item.path
          ),
          stockhistory:
            exteriorData.data.fields["Colors"].objects[0].stockhistory,
          data: exteriorData.data
        },
        ProductInterior: {
          id: interiorData.data.fields["Material"].objects[0].id,
          name: interiorData.data.fields["Material"].objects[0].name,
          price: interiorData.data.fields["Material"].objects[0].price,
          thumbnail:
            interiorData.data.fields["Material"].objects[0].files[0].path,
          images: interiorData.data.fields["Material"].objects[0].images.map(
            item => item.path
          ),
          stockhistory:
            interiorData.data.fields["Material"].objects[0].stockhistory,
          data: interiorData.data
        },
        ProductRims: {
          id: interiorData.data.fields["Rims"].objects[0].id,
          name: interiorData.data.fields["Rims"].objects[0].name,
          price: interiorData.data.fields["Rims"].objects[0].price,
          thumbnail: interiorData.data.fields["Rims"].objects[0].files[0].path,
          images: interiorData.data.fields["Rims"].objects[0].images.map(
            item => item.path
          ),
          stockhistory:
            interiorData.data.fields["Rims"].objects[0].stockhistory,
          data: interiorData.data
        },
        ProductAccessories: {
          ...state.ProductAccessories,
          data: accessoriesData.data
        }
      };

    case types.GET_PRODUCT_GRADE_DATA_FAILURE:
      return { ...state };

    case types.SELECTED_PRODUCT_EXTERIOR:
      var id = action.payload;
      var { objects } = state.ProductExterior.data.fields["Colors"];
      var object = objects.find(element => element.id === id);

      // need to update stockId here with checkstock() helper

      return {
        ...state,
        ProductExterior: {
          ...state.ProductExterior,
          id: object.id,
          name: object.name,
          price: object.price,
          thumbnail: object.files[0].path,
          images: object.images.map(item => item.path),
          stockhistory: object.stockhistory
        }
      };

    case types.SELECTED_PRODUCT_INTERIOR:
      var id = action.payload;
      var { objects } = state.ProductInterior.data.fields["Material"];
      var object = objects.find(element => element.id === id);

      // need to update stockId here with checkstock() helper

      return {
        ...state,
        ProductInterior: {
          ...state.ProductInterior,
          id: object.id,
          name: object.name,
          price: object.price,
          thumbnail: object.files[0].path,
          images: object.images.map(item => item.path),
          stockhistory: object.stockhistory
        }
      };

    case types.SELECTED_PRODUCT_RIMS:
      var id = action.payload;
      var { objects } = state.ProductInterior.data.fields["Rims"];
      var object = objects.find(element => element.id === id);

      // need to update stockId here with checkstock() helper

      return {
        ...state,
        ProductRims: {
          ...state.ProductRims,
          id: object.id,
          name: object.name,
          price: object.price,
          thumbnail: object.files[0].path,
          images: object.images.map(item => item.path),
          stockhistory: object.stockhistory
        }
      };

    case types.SELECTED_PRODUCT_ACCESSORIES:
      var { id, checked } = action.payload;
      var { fields } = state.ProductAccessories.data;
      let selectedAccessories = state.ProductAccessories.selectedAccessories;

      Object.values(fields).map(item => {
        item.map(object => {
          if (object.productOptionId === id) {
            checked
              ? selectedAccessories.push({
                  productOptionId: object.productOptionId,
                  name: object.productOption.name,
                  price: object.productOption.price,
                  image: object.productOption.files[0].path
                  // description: object.productOption.description
                })
              : (selectedAccessories = selectedAccessories.filter(
                  item => item.productOptionId != id
                ));
          }
        });
      });

      return {
        ...state,
        ProductAccessories: {
          ...state.ProductAccessories,
          selectedAccessories: selectedAccessories
        }
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
      // console.log(action.payload);
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

    default:
      return { ...state };
  }
};
