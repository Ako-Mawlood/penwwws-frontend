"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  FilterFn,
  Row,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MemberType } from "@/components/shared/columns";
import { TableSearch } from "@/components/shared/table-search";
import RoleFilter from "@/components/shared/role-filter";
import { GroupFilter } from "./group-filter";
import { GroupType } from "@/types/Group";

const globalFilterFn: FilterFn<MemberType> = (
  row: Row<MemberType>,
  _columnId: string,
  filterValue: string,
) => {
  const fullName = row.original.fullName.toLowerCase();
  const email = row.original.email.toLowerCase();
  const id = parseInt(row.original.id);
  return (
    fullName.includes(filterValue.toLowerCase()) ||
    email.includes(filterValue.toLowerCase()) ||
    id === parseInt(filterValue)
  );
};

interface DataTableProps {
  columns: ColumnDef<MemberType>[];
  data: MemberType[];
  schoolId: string;
  defaultFilteredGroupIds?: number[];
  children: React.ReactNode;
  setSelectedMemberIds: Dispatch<SetStateAction<number[]>>;
}

export function DataTable({
  columns,
  data,
  defaultFilteredGroupIds = [],
  schoolId,
  setSelectedMemberIds,
  children,
}: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,

    globalFilterFn,
    state: {
      sorting,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    filterFns: {
      groups: (row, filterValue) => {
        return row.original.groups.some((group: GroupType) =>
          filterValue.includes(String(group.id)),
        );
      },
    },
  });
  useEffect(() => {
    setSelectedMemberIds(
      table
        .getSelectedRowModel()
        .rows.map((row) => row.original.id)
        .map(Number),
    );
  }, [table, setSelectedMemberIds, rowSelection]);

  return (
    <div>
      <div className="flex w-full flex-wrap items-center justify-start gap-3 py-6 md:gap-6">
        {" "}
        <TableSearch
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <GroupFilter
          table={table}
          schoolId={schoolId}
          defaultFilteredGroupIds={defaultFilteredGroupIds}
        />
        <RoleFilter table={table} />
        {children}
      </div>

      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-muted-foreground my-3 flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
    </div>
  );
}
