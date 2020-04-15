import React from "react";
import { AppBar, Typography } from "@material-ui/core";
import {
  AggregateFunctions,
  ColumnDataType,
  ColumnModel,
  ColumnSortDirection
} from "tubular-common";
import DataGrid, { withRemoteDataSource } from "tubular-react";

const columns = [
  new ColumnModel("OrderID", {
    DataType: ColumnDataType.NUMERIC,
    Filtering: true,
    IsKey: true,
    Label: "Id",
    SortDirection: ColumnSortDirection.ASCENDING,
    SortOrder: 1,
    Sortable: true
  }),
  new ColumnModel("CustomerName", {
    Aggregate: AggregateFunctions.COUNT,
    Filtering: true,
    Searchable: true,
    Sortable: true
  }),
  new ColumnModel("ShippedDate", {
    DataType: ColumnDataType.DATE_TIME,
    Filtering: true,
    Sortable: true
  }),
  new ColumnModel("ShipperCity")
];

export default withRemoteDataSource(
  () => {
    return (
      <div>
        <AppBar position="static">
          <Typography gutterBottom={true} variant="headline" component="h2">
            Tubular React Grid Sample
          </Typography>
        </AppBar>
        <DataGrid gridName="table" />
      </div>
    );
  },
  columns,
  "https://tubular.azurewebsites.net/api/orders/paged"
);
