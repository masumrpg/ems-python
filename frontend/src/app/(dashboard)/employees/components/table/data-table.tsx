"use client";
import {
    ColumnDef,
    ColumnFiltersState,
    PaginationState,
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
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useMediaQuery } from "@react-hook/media-query";
import { useMutation, useQuery } from "@tanstack/react-query";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: UserPaginationResponse;
}

interface FetchDataProps {
    limit?: number;
    page?: number;
    filterBy?: string;
    filterValue?: string;
}

export default function DataTable<TData, TValue>({
    columns,
    data: initFromServer
}: DataTableProps<TData, TValue>) {
    const {
        data: initialData,
        refetch
    } = useQuery({
        queryKey: ["employees"],
        initialData: initFromServer,
        queryFn: async () => {
            const res = await getAllEmployeesAction({});
            setData(res.content);
            return res;
        }
    });

    const mutation = useMutation({
        mutationKey: ["employeesUpdate"],
        mutationFn: async ({
            limit,
            page,
            filterBy,
            filterValue
        }: FetchDataProps) => {
            const res = await getAllEmployeesAction({
                limit: limit || 10,
                page: page,
                filterBy: filterBy || "",
                filterValue: filterValue || ""
            });
            setData(res.content);
            setUpdatedData(res);
        },
        gcTime: 0
    });

    const [data, setData] = React.useState<any>(initialData.content);
    const [updatedData, setUpdatedData] =
        React.useState<UserPaginationResponse>(initialData);
    // =========
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    // =========

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

        state: {
            sorting,
            columnFilters,
            columnVisibility,
            pagination
        }
    });

    const pageSearchSize = 30;
    const searchFetch = async (filterBy: string, filterValue: string) => {
        if (filterValue) {
            mutation.mutate({
                limit: pageSearchSize,
                filterBy: filterBy,
                filterValue: filterValue
            });
            setPagination({
                pageIndex: 0,
                pageSize: pageSearchSize
            });
        } else {
            setData(initialData.content);
            mutation.mutate({});
            setPagination({
                pageIndex: 0,
                pageSize: 10
            });
        }
    };

    const paginationHandler = async (page: number) => {
        mutation.mutate({
            page: page
        });
    };

    // Mobile hide column
    const isMobile = useMediaQuery("(max-width: 768px)");

    React.useEffect(() => {
        const initialColumnVisibility: Record<string, boolean> = {};
        table.getAllColumns().forEach((column) => {
            // Set default visibility to true for all columns
            initialColumnVisibility[column.id] = true;
        });

        // Set certain columns to be hidden by default if isMobile is true
        if (isMobile) {
            // initialColumnVisibility["full_name"] = false;
            initialColumnVisibility["username"] = false;
            initialColumnVisibility["email"] = false;
            // initialColumnVisibility["is_superuser"] = false;
            initialColumnVisibility["is_verified"] = false;
            initialColumnVisibility["actions"] = false;
        }

        setColumnVisibility(initialColumnVisibility);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-10">
            {/* input */}
            <div className="flex items-center py-4 space-x-4">
                <Input
                    placeholder="Filter name..."
                    value={
                        (table
                            .getColumn("full_name")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) => {
                        const column = "full_name";
                        table
                            .getColumn(column)
                            ?.setFilterValue(event.target.value);
                        searchFetch(column, event.target.value);
                    }}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <p
                            className={cn(
                                buttonVariants({
                                    variant: "outline"
                                }),
                                "ml-auto"
                            )}
                        >
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
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
            <div className="flex items-center justify-end space-x-2 py-4">
                {updatedData.limit === 10 ? (
                    <div className="flex-1 text-sm text-muted-foreground">
                        Page {updatedData.page} of {updatedData.total_pages}
                    </div>
                ) : (
                    <div className="flex-1 text-sm text-muted-foreground">
                        Result {updatedData.total_records}
                    </div>
                )}
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            const prev = updatedData.page - 1;
                            paginationHandler(prev);
                        }}
                        disabled={updatedData.page === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            const next = updatedData.page + 1;
                            paginationHandler(next);
                        }}
                        disabled={
                            updatedData.page === updatedData.total_pages ||
                            updatedData.limit === pageSearchSize
                        }
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}