import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, Search, Eye, EyeOff, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronUp, ChevronDown } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Define the User type
type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  class: string
}
type StringSearchFields = Exclude<keyof User, 'id'>;
// Mock data for users
const initialUsers: User[] = [
  { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", role: "Manager", class: "G5A" },
  { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", role: "Student", class: "G5B" },
  { id: 3, firstName: "Bob", lastName: "Johnson", email: "bob@example.com", role: "Teacher", class: "G6A" },
  { id: 4, firstName: "Alice", lastName: "Williams", email: "alice@example.com", role: "Student", class: "G6B" },
  { id: 5, firstName: "Charlie", lastName: "Brown", email: "charlie@example.com", role: "Manager", class: "G7A" },
  { id: 6, firstName: "Alice", lastName: "sdfa", email: "alice@example.com", role: "Student", class: "G6B" },
  { id: 7, firstName: "Rafael", lastName: "Brown", email: "charlie@example.com", role: "Manager", class: "G7A" },
]

const roleColors: { [key: string]: string } = {
  Manager: "bg-blue-100 text-blue-800",
  Student: "bg-green-100 text-green-800",
  Teacher: "bg-purple-100 text-purple-800",
}

const yearClasses: { [key: number]: string[] } = {
  5: ["G5A", "G5B", "G5C"],
  6: ["G6A", "G6B", "G6C"],
  7: ["G7A", "G7B", "G7C"],
}

export function ManagerDashboardComponent() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'asc' | 'desc' } | null>(null)
  const [roleFilter, setRoleFilter] = useState<string | null>(null)
  const [classFilter, setClassFilter] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState<{ type: string; payload: any } | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchField, setSearchField] = useState<StringSearchFields>("lastName")
  const [visibleColumns, setVisibleColumns] = useState({
    firstName: true,
    lastName: true,
    email: true,
    role: true,
    class: true,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isLoading, setIsLoading] = useState(false)

  const filteredUsers = users.filter(user => 
    (!roleFilter || user.role === roleFilter) &&
    (!classFilter || user.class === classFilter) &&
    (searchTerm === "" || user[searchField].toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSort = (key: keyof User) => {
      let direction: 'asc' | 'desc' = 'asc'
      if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc'
      }
      setSortConfig({ key, direction })

      setUsers([...users].sort((a, b) => {
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
        return 0
      }))
  }

  const handleRoleFilter = (role: string | null) => {
    setRoleFilter(role)
    setCurrentPage(1)
  }

  const handleClassFilter = (classValue: string | null) => {
    setClassFilter(classValue)
    setCurrentPage(1)
  }

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectAllUsers = () => {
    setSelectedUsers(selectedUsers.length === paginatedUsers.length ? [] : paginatedUsers.map(user => user.id))
  }

  const handleDeleteUsers = () => {
    setIsLoading(true)
    // Simulating API call
    setTimeout(() => {
      setUsers(users.filter(user => !selectedUsers.includes(user.id)))
      setSelectedUsers([])
      setIsDeleteDialogOpen(false)
      setIsLoading(false)
      alert("Users deleted successfully")
    }, 1000)
  }

  const handleChangeRole = (newRole: string) => {
    setConfirmAction({ type: 'changeRole', payload: newRole })
    setIsConfirmDialogOpen(true)
  }

  const handleConfirmAction = () => {
    setIsLoading(true)
    // Simulating API call
    setTimeout(() => {
      if (confirmAction?.type === 'changeRole') {
        setUsers(users.map(user => 
          selectedUsers.includes(user.id) ? { ...user, role: confirmAction.payload } : user
        ))
        alert(`${selectedUsers.length} user(s) have been updated to ${confirmAction.payload}.`)
      }
      setSelectedUsers([])
      setIsConfirmDialogOpen(false)
      setIsLoading(false)
    }, 1000)
  }

  const toggleColumnVisibility = (column: keyof typeof visibleColumns) => {
    setVisibleColumns(prev => ({ ...prev, [column]: !prev[column] }))
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">User Management Dashboard</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder={`Search by ${searchField}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSearchField("lastName")}>Last Name</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchField("firstName")}>First Name</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchField("email")}>Email</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchField("role")}>Role</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchField("class")}>Class</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                View <Eye className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => toggleColumnVisibility("firstName")}>
                {visibleColumns.firstName ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}
                First Name
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleColumnVisibility("lastName")}>
                {visibleColumns.lastName ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}
                Last Name
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleColumnVisibility("email")}>
                {visibleColumns.email ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}
                Email
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleColumnVisibility("role")}>
                {visibleColumns.role ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}
                Role
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleColumnVisibility("class")}>
                {visibleColumns.class ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}
                Class
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter by Role</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleRoleFilter(null)}>All Roles</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleFilter("Manager")}>Manager</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleFilter("Student")}>Student</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRoleFilter("Teacher")}>Teacher</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter by Class</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleClassFilter(null)}>All Classes</DropdownMenuItem>
              {Object.entries(yearClasses).map(([year, classes]) => (
                <DropdownMenuSub key={year}>
                  <DropdownMenuSubTrigger>Year {year}</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    {classes.map((classValue) => (
                      <DropdownMenuItem key={classValue} onClick={() => handleClassFilter(classValue)}>
                        {classValue}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {selectedUsers.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-black dark:bg-white dark:text-black text-white dark:hover:bg-gray-200 hover:bg-gray-800">
                  Actions ({selectedUsers.length})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{selectedUsers.length} Selected</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>Delete</DropdownMenuItem>
                <DropdownMenuItem>Disable Account</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Change Role</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => handleChangeRole("Manager")}>Manager</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleChangeRole("Student")}>Student</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleChangeRole("Teacher")}>Teacher</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem>Change Class</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedUsers.length === paginatedUsers.length}
                  onCheckedChange={handleSelectAllUsers}
                />
              </TableHead>
              {visibleColumns.firstName && (
                <TableHead className="px-0">
                  <Button variant="ghost" onClick={() => handleSort('firstName')}
                    className={`flex items-center justify-start ${
                      sortConfig?.key === 'firstName'
                        ? 'text-black dark:text-white'
                        : 'text-gray-500'
                    }`}
                    >
                    First Name
                      {sortConfig?.key === 'firstName' ? (
                      sortConfig.direction === 'asc' ? (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      )
                    ) : (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
              )}
              {visibleColumns.lastName && (
                <TableHead className="px-0">
                  <Button variant="ghost" onClick={() => handleSort('lastName')}
                    className={`flex items-center justify-start ${
                      sortConfig?.key === 'lastName'
                        ? 'text-black dark:text-white'
                        : 'text-gray-500'
                    }`}
                    >
                    Last Name
                      {sortConfig?.key === 'lastName' ? (
                      sortConfig.direction === 'asc' ? (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      )
                    ) : (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
              )}
              {visibleColumns.email && (
                <TableHead className="px-0">
                  <Button variant="ghost" onClick={() => handleSort('email')}
                    className={`flex items-center justify-start ${
                      sortConfig?.key === 'email'
                        ? 'text-black dark:text-white'
                        : 'text-gray-500'
                    }`}
                    
                    >
                    Email
                    {sortConfig?.key === 'email' ? (
                      sortConfig.direction === 'asc' ? (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      )
                    ) : (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
              )}
               {visibleColumns.role && ( // CHANGE START
                <TableHead className="px-0">
                  <Button variant="ghost" onClick={() => handleSort('role')}
                    className={`flex items-center justify-start ${
                      sortConfig?.key === 'role'
                        ? 'text-black dark:text-white'
                        : 'text-gray-500'
                    }`}
                    >
                    Role
                    {sortConfig?.key === 'role' ? (
                      sortConfig.direction === 'asc' ? (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      )
                    ) : (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
              )}
              {visibleColumns.class && ( // CHANGE START
                <TableHead className="px-0">
                  <Button variant="ghost" onClick={() => handleSort('class')}
                    className={`flex items-center justify-start ${
                      sortConfig?.key === 'class'
                        ? 'text-black dark:text-white'
                        : 'text-gray-500'
                    }`}>
                    Class
                    {sortConfig?.key === 'class' ? (
                      sortConfig.direction === 'asc' ? (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      )
                    ) : (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={() => handleSelectUser(user.id)}
                  />
                </TableCell>
                {visibleColumns.firstName && <TableCell>{user.firstName}</TableCell>}
                {visibleColumns.lastName && <TableCell>{user.lastName}</TableCell>}
                {visibleColumns.email && <TableCell>{user.email}</TableCell>}
                {visibleColumns.role && (
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${roleColors[user.role]}`}>
                      {user.role}
                    </span>
                  </TableCell>
                )}
                {visibleColumns.class && <TableCell>{user.class}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {selectedUsers.length} of {filteredUsers.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value))
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={itemsPerPage.toString()} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the selected user(s) and remove their data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteUsers} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              {confirmAction?.type === 'changeRole' && `Are you sure you want to change the role of ${selectedUsers.length} user(s) to ${confirmAction.payload}?`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmAction} disabled={isLoading}>
              {isLoading ? "Updating..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}