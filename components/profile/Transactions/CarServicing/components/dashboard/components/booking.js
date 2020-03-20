import React from "react";

import RecordsList from "Components/RecordsList";
import { listOptions } from "Components/Helpers/helpers";
import RctSectionLoader from "Components/RctSectionLoader";

import Moment from 'moment'

const CustomerList = ({ tableData, loading, title, action, SetSingleBooking }) => {

  const columns = [
    {
      name: "id",
      options: { display: "excluded", filter: false, sort: false }
    },
    {
      label: "Name",
      name: "contact",
      options: {
        customBodyRender: (value, tableMeta) => {
            const {firstName, lastName} = value
            const id = tableMeta.rowData[0]
            return (
                <div onClick={() => SetSingleBooking(id)}>
                    <span style={{color:"rgba(0,0,0,0.7)"}}>{firstName + ' ' + lastName}</span>
                </div>
            );
        }
      }
    },
    { 
        label: "Created",
        name: "created_at",
        options: {
            customBodyRender: (value, tableMeta) => {
                return (
                    <span style={{color:"rgba(0,0,0,0.7)"}}>{Moment(value).format('LL')}</span>
                );
            }
        }
    },
    {
      label: "Email",
      name: "contact",
      options: {
        customBodyRender: value => {
            const {email} = value
            return (
                <span style={{color:"rgba(0,0,0,0.7)"}}>{email}</span>
            );
        }
      }
    },
    {
        label: "Contact",
        name: "contact",
        options: {
            customBodyRender: (value, tableMeta) => {
                const {phone} = value
                return (
                    <span style={{color:"rgba(0,0,0,0.7)"}}>{phone}</span>
                );
            }
        }
    },
    {
      label: "Service",
      name: "service",
      options: {
        customBodyRender: value => {
          return (
            <span style={{color:"rgba(0,0,0,0.7)"}}>{value}</span>
          )
        }
      }
    },
    {
        label: "Model",
        name: "content",
        options: {
          customBodyRender: value => {
            const {model, date, timeslot, description} = value
            return (
              <span style={{color:"rgba(0,0,0,0.7)"}}>{model}</span>
            )
          }
        }
    },
    {
        label: "Schedule",
        name: "content",
        options: {
          customBodyRender: value => {
            const {model, date, timeslot, description} = value
            return (
                <span style={{color:"rgba(0,0,0,0.7)"}}>{Moment(date).format('LL')}</span>
            )
          }
        }
    },
    {
        label: "Status",
        name: "status",
        options: {
          customBodyRender: value => {
            return (
                <span style={{color:"rgba(0,0,0,0.7)"}}>{value}</span>
            )
          }
        }
    }
  ];
  
  // if (action == true) {
  //   columns.push({
  //     name: "Actions",
  //     options: {
  //       filter: false,
  //       sort: false,
  //       customBodyRender: value => {
  //         return (
  //           <Tooltip id="tooltip-icon" title="Edit">
  //             <IconButton
  //               className="text-primary mr-2"
  //               aria-label="Edit Customer"
  //               onClick={() => {
  //                 this.toggleEditModal(value);
  //               }}
  //             >
  //               <i className="zmdi zmdi-edit" />
  //             </IconButton>
  //           </Tooltip>
  //         );
  //       }
  //     }
  //   });
  // }

  // listOptions.onRowClick = rowData => onRowClick(rowData[0]);
  listOptions.customToolbarSelect = (
    selectedRows,
    displayData,
    setSelectRows
  ) => null;

  return (
    <div>
       
      <div className="d-flex flex-fill justify-content-center">
          <span style={{textAlign:'center'}}>CAR SERVICING BOOKING DETAILS</span>
      </div>

      <div className="rct-block" style={{margin: 20, borderRadius:10, boxShadow: '0 5px 9px 0 rgba(0,0,0,0.15), 0 8px 25px 0 rgba(0,0,0,0.15)'}}>
        <RecordsList
            title={title}
            columns={columns}
            data={tableData} 
            options={listOptions}
        />
        {loading && <RctSectionLoader/>}
      </div>
        
    </div>
  );
};

export default CustomerList;

