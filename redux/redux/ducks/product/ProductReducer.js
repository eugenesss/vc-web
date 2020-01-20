import * as types from "./ProductTypes"

const INIT_STATE = {
  productModel: {
    id: null,
    name: null,
  },
  productGrade: {
    id: null,
    name: null,
    price: 0,
    data: { }
  },
  productExterior: {
    id: null,
    name: null,
    price: 0,
    data: { }
  },
  productInterior: {
    id: null,
    name: null,
    price: 0,
    data: { }
  },
  productRims: {
    id: null,
    name: null,
    price: 0,
    data: { }
  },
  productAccessories: {
    selectedIds: { },
    data: { }
  }
}

export default (state = INIT_STATE, action) => {
  // console.log("redux state= ", state)
  switch(action.type){
    case types.GET_PRODUCT_MODEL_DATA:
      return {
        ...state
      }

    case types.GET_PRODUCT_MODEL_DATA_SUCCESS:
      const { data } = action.payload
      return {
        ...state,
        productModel: {
          id: data.id,
          name: data.name
        }
      }

    case types.GET_PRODUCT_MODEL_DATA_FAILURE:
      return {
        ...state
      }

    case types.GET_PRODUCT_GRADES:
      return {
        ...state
      }
    
    case types.GET_PRODUCT_GRADES_SUCCESS:
      return {
        ...state,
        productGrade: {
          ...state.productGrade,
          data: action.payload.data
        }
      }

    case types.GET_PRODUCT_GRADES_FAILURE:
      return {
        ...state
      }
    
    case types.SELECTED_PRODUCT_GRADE:
      var id = action.payload
      var { fields } = state.productGrade.data
      var object = fields.find(element => element.id === id)

      return {
        ...state,
        productGrade: {
          ...state.productGrade,
          id: object.id,
          name: object.name,
          price: object.selling_Price,
        }
      }

    case types.GET_PRODUCT_GRADE_DATA:
      return {
        ...state
      }

    case types.GET_PRODUCT_GRADE_DATA_SUCCESS:
      let accessoriesIdList = { }
      const populateAccessoriesIds = action => {
        action.payload.accessoriesData.data.fields.map(item => {
          Object.values(item).map(key => {
            key.map(item => {
              accessoriesIdList[item.id] = false
            })
          })
        })
      }
      populateAccessoriesIds(action)

      return {
        ...state,
        productExterior: {
          ...state.productExterior,
          data: action.payload.exteriorData.data
        },
        productInterior: {
          ...state.productInterior,
          data: action.payload.interiorData.data
        },
        productRims: {
          ...state.productInterior,
          data: action.payload.interiorData.data
        },
        productAccessories: {
          selectedIds: accessoriesIdList,
          data: action.payload.accessoriesData.data
        }
      }

    case types.GET_PRODUCT_GRADE_DATA_FAILURE:
      return {
        ...state
      }

    case types.SELECTED_PRODUCT_EXTERIOR:
      var id = action.payload
      var { objects } = state.productExterior.data.fields["Car Colors"]
      var object = objects.find(element => element.id === id)

      return {
        ...state,
        productExterior: {
          ...state.productExterior,
          id: object.id,
          name: object.name,
          price: object.price
        }
      }

    case types.SELECTED_PRODUCT_INTERIOR:
      var id = action.payload
      var { objects } = state.productInterior.data.fields["Seating Fabrics"]
      var object = objects.find(element => element.id === id)

      return {
        ...state,
        productInterior: {
          ...state.productInterior,
          id: object.id,
          name: object.name,
          price: object.price
        }
      }

    case types.SELECTED_PRODUCT_RIMS:
      var id = action.payload
      var { objects } = state.productInterior.data.fields["Rims"]
      var object = objects.find(element => element.id === id)

      return {
        ...state,
        productRims: {
          ...state.productRims,
          id: object.id,
          name: object.name,
          price: object.price
        }
      }

    case types.SELECTED_PRODUCT_ACCESSORIES:
      const newValue = !state.productAccessories.selectedIds[action.payload]
      return {
        ...state,
        productAccessories: {
          ...state.productAccessories,
          selectedIds: {
            ...state.productAccessories.selectedIds,
            [action.payload]: newValue
          }
        }
      }

    default:
      return {...state}
  }
}