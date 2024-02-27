"use client"
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { FileEditIcon, TrashIcon } from "lucide-react"
import {toast} from "sonner";

export default function EmployeesPage() {

  const handleToast = () => {
    toast.success("Suksess")
  }

  return (
  <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
    <div className="flex items-center">
      <h1 className="font-semibold text-lg md:text-2xl">Employees</h1>
      <Button className="ml-auto" size="sm" onClick={handleToast}>
        Add employee
      </Button>
    </div>
    <div className="border shadow-sm rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead className="max-w-[150px]">Name</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <img
                  alt="Avatar"
                  className="rounded-full object-cover"
                  height="40"
                  src="https://github.com/shadcn.png"
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width="40"
              />
            </TableCell>
            <TableCell className="font-semibold">Alice Johnson</TableCell>
            <TableCell className="hidden md:table-cell">alice@example.com</TableCell>
            <TableCell>Manager</TableCell>
            <TableCell className="flex gap-2 w-[100px]">
              <Button className="w-6 h-6" size="icon" variant="outline">
                <FileEditIcon className="w-4 h-4"/>
                <span className="sr-only">Edit</span>
              </Button>
              <Button className="w-6 h-6" size="icon" variant="outline">
                <TrashIcon className="w-4 h-4"/>
                <span className="sr-only">Delete</span>
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <img
                  alt="Avatar"
                  className="rounded-full object-cover"
                  height="40"
                  src="https://github.com/shadcn.png"
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width="40"
              />
            </TableCell>
            <TableCell className="font-semibold">Bob Smith</TableCell>
            <TableCell className="hidden md:table-cell">bob@example.com</TableCell>
            <TableCell>Developer</TableCell>
            <TableCell className="flex gap-2 w-[100px]">
              <Button className="w-6 h-6" size="icon" variant="outline">
                <FileEditIcon className="w-4 h-4"/>
                <span className="sr-only">Edit</span>
              </Button>
              <Button className="w-6 h-6" size="icon" variant="outline">
                <TrashIcon className="w-4 h-4"/>
                <span className="sr-only">Delete</span>
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <img
                  alt="Avatar"
                  className="rounded-full object-cover"
                  height="40"
                  src="https://github.com/shadcn.png"
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width="40"
              />
            </TableCell>
            <TableCell className="font-semibold">Eva Williams</TableCell>
            <TableCell className="hidden md:table-cell">eva@example.com</TableCell>
            <TableCell>Designer</TableCell>
            <TableCell className="flex gap-2 w-[100px]">
              <Button className="w-6 h-6" size="icon" variant="outline">
                <FileEditIcon className="w-4 h-4"/>
                <span className="sr-only">Edit</span>
              </Button>
              <Button className="w-6 h-6" size="icon" variant="outline">
                <TrashIcon className="w-4 h-4"/>
                <span className="sr-only">Delete</span>
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <img
                  alt="Avatar"
                  className="rounded-full object-cover"
                  height="40"
                  src="https://github.com/shadcn.png"
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width="40"
              />
            </TableCell>
            <TableCell className="font-semibold">Mark Davis</TableCell>
            <TableCell className="hidden md:table-cell">mark@example.com</TableCell>
            <TableCell>Intern</TableCell>
            <TableCell className="flex gap-2 w-[100px]">
              <Button className="w-6 h-6" size="icon" variant="outline">
                <FileEditIcon className="w-4 h-4"/>
                <span className="sr-only">Edit</span>
              </Button>
              <Button className="w-6 h-6" size="icon" variant="outline">
                <TrashIcon className="w-4 h-4"/>
                <span className="sr-only">Delete</span>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </main>
)
}



