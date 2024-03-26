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
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import getAllEmployeesAction from "@/action/getAllEmployeesAction";
import { UserPaginationResponse } from "@/interface/interface-client";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: UserPaginationResponse;
}

export default function DataTable<TData, TValue>({
    columns,
    data: initialData
}: DataTableProps<TData, TValue>) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const resUrlSearch = searchParams.get("search");
    const resUrlPage = searchParams.get("page");

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
    // =========

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllEmployeesAction({
                    page: Number(resUrlPage),
                    filterBy: !resUrlSearch ? "" : "full_name",
                    filterValue: !resUrlSearch ? "" : resUrlSearch
                });

                if (!resUrlSearch && !resUrlPage) {
                    setData(initialData.content);
                    setResponse(initialData);
                } else {
                    setData(res.content);
                    setResponse(res);
                }
            } catch (e: any) {
                toast.error("Error:", e);
            }
        };
        fetchData();
    }, [resUrlPage, initialData, resUrlSearch]);

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
    // FIXME susah ges ini untuk search
    const handleSearchClick = async () => {
        setInputValue(inputValue);
        const res = await getAllEmployeesAction({
            limit: 20,
            filterBy: "full_name",
            filterValue: inputValue
        });
        setData(res.content);
        router.push(`?search=${inputValue}`);
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            {/* input */}
            <div className="flex items-center py-4">
                <Input
                    type="text"
                    value={inputValue ?? ""}
                    onChange={handleSearchChange}
                    placeholder="Enter value"
                    className="max-w-sm"
                />
                <Button onClick={handleSearchClick} className="ml-4">
                    Search
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <p
                            className={cn(
                                buttonVariants({
                                    variant: "outline"
                                }),
                                "ml-4"
                            )}
                        >
                            Columns
                        </p>
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
                    {/* TODO search dan page params belum di implementasikan */}
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                className={`${
                                    response.page === 1
                                        ? "pointer-events-none text-muted-foreground"
                                        : ""
                                }`}
                                href={`?page=${
                                    response.page > 1 ? response.page - 1 : 1
                                }`}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <Button
                                variant={"ghost"}
                                className={cn(
                                    response.page === response.total_pages
                                        ? ""
                                        : "hidden",
                                    response.page - 2 === 0 ? "hidden" : "",
                                    "cursor-default"
                                )}
                            >
                                {response.page - 2}
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button
                                variant={"ghost"}
                                className={cn(
                                    response.page - 1 ? "" : "hidden",
                                    "cursor-default"
                                )}
                            >
                                {response.page - 1}
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button
                                variant={"outline"}
                                className="cursor-default"
                            >
                                {response.page}
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button
                                variant={"ghost"}
                                className={cn(
                                    response.page === response.total_pages
                                        ? "hidden"
                                        : "",
                                    "cursor-default"
                                )}
                            >
                                {response.page + 1}
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button
                                variant={"ghost"}
                                className={cn(
                                    response.page - 1 ? "hidden" : "",
                                    response.page + 2 > response.total_pages
                                        ? "hidden"
                                        : "",
                                    "cursor-default"
                                )}
                            >
                                {response.page + 2}
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                className={`${
                                    response.page === response.total_pages
                                        ? "pointer-events-none text-muted-foreground"
                                        : ""
                                }`}
                                href={`?page=${response.total_pages < response.page ? response.total_pages : response.page + 1
                                }`}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            <div className="flex-1 text-sm text-muted-foreground">
                <p>Result {response.total_records}</p>
                <p>Total pages {response.total_pages}</p>
            </div>
        </div>
    );
}
