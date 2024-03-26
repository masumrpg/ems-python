"use client";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import getAllEmployeesAction from "@/action/getAllEmployeesAction";
import { UserPaginationResponse } from "@/interface/interface-client";
import { toast } from "sonner";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: UserPaginationResponse;
}

export default function DataTable<TData, TValue>({
    columns,
    data: initialData
}: DataTableProps<TData, TValue>) {
    const [data, setData] = React.useState<any>(initialData.content); // test
    const [response, setResponse] =
        React.useState<UserPaginationResponse>(initialData); // test
    const [inputValue, setInputValue] = React.useState(""); // test
    // =========
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),

        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,

        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        }
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSearchClick = async () => {
        setInputValue(inputValue);
        const res = await getAllEmployeesAction({
            filterBy: "full_name",
            filterValue: inputValue
        });
        setData(res.content);
        // console.log(res.content);
    };

    const totalPage: number = Math.ceil(
        response.total_records / response.limit
    );

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            {/* input */}
            <div className="flex items-center py-4">
                <Input
                    type="text"
                    value={inputValue}
                    onChange={handleSearchChange}
                    placeholder="Enter value"
                    className="max-w-sm"
                />
                <Button onClick={handleSearchClick} className="ml-4">
                    Search
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="outline" className="ml-4">
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value: boolean) => {
                                            column.toggleVisibility(!!value);
                                        }}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => {
                            return (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell>No results</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* pagination */}
            <div className="flex items-center justify-start space-x-2 py-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <Button
                                variant="ghost"
                                className="gap-1 pl-2.5"
                                disabled={response.page === 1}
                                onClick={async () => {
                                    const nextPage = response.page - 1;
                                    const res = await getAllEmployeesAction({
                                        page: nextPage
                                    });
                                    setData(res.content);
                                    setResponse(res);
                                }}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                <span>Previous</span>
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button
                                variant={"ghost"}
                                className={cn(
                                    response.page === totalPage ? "" : "hidden", response.page - 2 === 0 ? "hidden" : ""
                                )}
                            >
                                {response.page - 2}
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button
                                variant={"ghost"}
                                className={cn(
                                    response.page - 1 ? "" : "hidden"
                                )}
                            >
                                {response.page - 1}
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button variant={"outline"}>{response.page}</Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button
                                variant={"ghost"}
                                className={cn(
                                    response.page === totalPage ? "hidden" : ""
                                )}
                            >
                                {response.page + 1}
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button
                                variant={"ghost"}
                                className={cn(
                                    response.page -1 ? "hidden" : "", response.page + 2 > totalPage ? "hidden" : ""
                                )}
                            >
                                {response.page + 2}
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button
                                variant="ghost"
                                disabled={response.page === totalPage}
                                className="gap-1 pr-2.5"
                                onClick={async () => {
                                    const nextPage = response.page + 1;
                                    const res = await getAllEmployeesAction({
                                        page: nextPage
                                    });
                                    setData(res.content);
                                    setResponse(res);
                                }}
                            >
                                <span>Next</span>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s)
            </div>
        </div>
    );
}
