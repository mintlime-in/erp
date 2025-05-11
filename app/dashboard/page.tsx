"use client";

import {
  AllCommunityModule,
  ColDef,
  colorSchemeDark,
  colorSchemeDarkWarm,
  colorSchemeLight,
  GridOptions,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { useColorModeValue } from "../components/ui/color-mode";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine-dark.css";
ModuleRegistry.registerModules([AllCommunityModule]);

export default function Dashboard() {
  // const [rowData, setRowData] = useState([
  //   { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  //   { make: "Ford", model: "F-Series", price: 33850, electric: false },
  //   { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  // ]);

  // // Column Definitions: Defines the columns to be displayed.
  // const [colDefs, setColDefs] = useState([
  //   { field: "make" },
  //   { field: "model" },
  //   { field: "price" },
  //   { field: "electric" },
  // ] as ColDef[]);

  const gridOptions: GridOptions = {
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
    },
    columnDefs: [
      { field: "make" },
      { field: "model" },
      { field: "price" },
      { field: "electric" },
    ] as ColDef[],
    rowData: [
      { make: "Tesla", model: "Model Y", price: 64950, electric: true },
      { make: "Ford", model: "F-Series", price: 33850, electric: false },
      { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ],
    domLayout: "autoHeight",
  };

  return (
    <>
      <AgGridReact
        gridOptions={gridOptions}
        theme={themeQuartz.withPart(
          useColorModeValue(colorSchemeLight, colorSchemeDark)
        )}
      />
    </>
  );
}
