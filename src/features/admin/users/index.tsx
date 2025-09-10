"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Shield,
  ShieldCheck,
  ShieldX,
  Users,
  UserCheck,
  UserX,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/labels";
import { MetricCard } from "~/components/ui/metric-card";
import { useUrlFilter } from "~/hooks/useFilters";
import { FilterGroup } from "~/components/filters/FilterGroup";

// Mock users data
const usersData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    role: "HR Manager",
    department: "Human Resources",
    status: "active",
    permissions: ["read", "write", "delete", "admin"],
    lastLogin: "2024-01-22T10:30:00Z",
    createdDate: "2023-06-15",
    avatar: "/placeholder.svg?height=40&width=40&text=JS",
    isRestricted: false,
    jobsCreated: 15,
    applicationsReviewed: 234,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "+1 (555) 234-5678",
    role: "Recruiter",
    department: "Human Resources",
    status: "active",
    permissions: ["read", "write"],
    lastLogin: "2024-01-22T09:15:00Z",
    createdDate: "2023-08-20",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    isRestricted: false,
    jobsCreated: 8,
    applicationsReviewed: 156,
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike.chen@company.com",
    phone: "+1 (555) 345-6789",
    role: "Hiring Manager",
    department: "Engineering",
    status: "active",
    permissions: ["read", "write"],
    lastLogin: "2024-01-21T16:45:00Z",
    createdDate: "2023-09-10",
    avatar: "/placeholder.svg?height=40&width=40&text=MC",
    isRestricted: false,
    jobsCreated: 5,
    applicationsReviewed: 89,
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@company.com",
    phone: "+1 (555) 456-7890",
    role: "HR Assistant",
    department: "Human Resources",
    status: "restricted",
    permissions: ["read"],
    lastLogin: "2024-01-20T14:20:00Z",
    createdDate: "2023-11-05",
    avatar: "/placeholder.svg?height=40&width=40&text=ED",
    isRestricted: true,
    jobsCreated: 2,
    applicationsReviewed: 45,
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@company.com",
    phone: "+1 (555) 567-8901",
    role: "Recruiter",
    department: "Human Resources",
    status: "inactive",
    permissions: ["read"],
    lastLogin: "2024-01-15T11:30:00Z",
    createdDate: "2023-07-12",
    avatar: "/placeholder.svg?height=40&width=40&text=DW",
    isRestricted: false,
    jobsCreated: 12,
    applicationsReviewed: 178,
  },
];

const roles = [
  {
    value: "HR Manager",
    label: "HR Manager",
    permissions: ["read", "write", "delete", "admin"],
  },
  { value: "Recruiter", label: "Recruiter", permissions: ["read", "write"] },
  {
    value: "Hiring Manager",
    label: "Hiring Manager",
    permissions: ["read", "write"],
  },
  { value: "HR Assistant", label: "HR Assistant", permissions: ["read"] },
  {
    value: "Admin",
    label: "System Admin",
    permissions: ["read", "write", "delete", "admin", "system"],
  },
];

interface UserFilters {
  [key: string]: string;
  search: string;
  status: string;
  role: string;
}
export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { filters, setFilters } = useUrlFilter<UserFilters>();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "restricted":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <UserCheck className="h-3 w-3" />;
      case "inactive":
        return <UserX className="h-3 w-3" />;
      case "restricted":
        return <ShieldX className="h-3 w-3" />;
      default:
        return <Users className="h-3 w-3" />;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "HR Manager":
      case "Admin":
        return <ShieldCheck className="h-4 w-4" />;
      case "Recruiter":
      case "Hiring Manager":
        return <Shield className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const search = searchTerm?.trim().toLowerCase() || "";

  const filteredUsers = usersData.filter((user) => {
    const name = user.name?.toLowerCase() || "";
    const email = user.email?.toLowerCase() || "";
    const role = user.role?.toLowerCase() || "";
    const status = user.status?.toLowerCase() || "";

    const matchesSearch =
      !search ||
      name.includes(search) ||
      email.includes(search) ||
      role.includes(search);

    const matchesStatus =
      !filters.status ||
      filters.status === "all" ||
      status === filters.status.toLowerCase();

    const matchesRole =
      !filters.role ||
      filters.role === "all" ||
      role === filters.role.toLowerCase();

    return matchesSearch && matchesStatus && matchesRole;
  });

  const statusCounts = {
    all: usersData.length,
    active: usersData.filter((u) => u.status === "active").length,
    inactive: usersData.filter((u) => u.status === "inactive").length,
    restricted: usersData.filter((u) => u.status === "restricted").length,
  };

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting user:", selectedUser);
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const userMetrics = [
    {
      title: "Total Users",
      value: usersData.length,
      icon: Users,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      change: "+4.2%",
      changeType: "up",
    },
    {
      title: "Active Users",
      value: statusCounts.active,
      icon: UserCheck,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      change: "+1.1%",
      changeType: "up",
    },
    {
      title: "Restricted Users",
      value: statusCounts.restricted,
      icon: ShieldX,
      iconColor: "text-red-600",
      iconBg: "bg-red-100",
      change: "-2.3%",
      changeType: "down",
    },
    {
      title: "Inactive Users",
      value: statusCounts.inactive,
      icon: UserX,
      iconColor: "text-gray-600",
      iconBg: "bg-gray-100",
      change: "-0.5%",
      changeType: "down",
    },
  ] as const;

  const filterConfigs = [
    {
      label: "Status",
      value: filters.status || "all",
      onChange: (val: string) => setFilters({ status: val }),
      placeholder: "Filter by status",
      options: [
        { value: "all", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "restricted", label: "Restricted" },
      ],
      className: "w-48",
    },
    {
      label: "Role",
      value: filters.role || "all",
      onChange: (val: string) => setFilters({ role: val }),
      placeholder: "Filter by role",
      options: [
        { value: "all", label: "All Roles" },
        { value: "HR Manager", label: "HR Manager" },
        { value: "Recruiter", label: "Recruiter" },
        { value: "Hiring Manager", label: "Hiring Manager" },
        { value: "HR Assistant", label: "HR Assistant" },
        { value: "Admin", label: "Admin" },
      ],
      className: "w-48",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <div className="flex space-x-2">
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>
                  Add a new user to the system with appropriate roles and
                  permissions.
                </DialogDescription>
              </DialogHeader>
              <CreateUserForm onClose={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {userMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <FilterGroup filters={filterConfigs} />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-white shadow-lg">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(user.role)}
                      <span>{user.role}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={`${getStatusColor(
                          user.status
                        )} flex items-center space-x-1`}
                      >
                        {getStatusIcon(user.status)}
                        <span className="capitalize">{user.status}</span>
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-4 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-blue-600">
                          {user.jobsCreated}
                        </div>
                        <div className="text-gray-500">Jobs</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-purple-600">
                          {user.applicationsReviewed}
                        </div>
                        <div className="text-gray-500">Reviews</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right bg-white">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 cursor-pointer"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsDetailsDialogOpen(true);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-600 cursor-pointer"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Users className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No users found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria or create a new user.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedUser?.name}</DialogTitle>
            <DialogDescription>User details and permissions</DialogDescription>
          </DialogHeader>
          {selectedUser && <UserDetailsView user={selectedUser} />}
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information, role, and permissions.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <EditUserForm
              user={selectedUser}
              onClose={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedUser?.name}? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Create User Form Component
function CreateUserForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    status: "active",
    isRestricted: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle user creation
    console.log("Creating user:", formData);
    onClose();
  };

  const selectedRole = roles.find((r) => r.value === formData.role);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="department">Department</Label>
          <Select
            value={formData.department}
            onValueChange={(value) =>
              setFormData({ ...formData, department: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Human Resources">Human Resources</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="role">Role</Label>
          <Select
            value={formData.role}
            onValueChange={(value) => setFormData({ ...formData, role: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="restricted">Restricted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedRole && (
        <div>
          <Label>Permissions</Label>
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <div className="flex flex-wrap gap-2">
              {selectedRole.permissions.map((permission) => (
                <Badge key={permission} variant="secondary">
                  {permission}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Switch
          id="restricted"
          checked={formData.isRestricted}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, isRestricted: checked })
          }
        />
        <Label htmlFor="restricted">Restrict user access</Label>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Create User</Button>
      </DialogFooter>
    </form>
  );
}

// Edit User Form Component
function EditUserForm({ user, onClose }: { user: any; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    department: user.department,
    status: user.status,
    isRestricted: user.isRestricted,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle user update
    console.log("Updating user:", formData);
    onClose();
  };

  const selectedRole = roles.find((r) => r.value === formData.role);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="restricted">Restricted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="role">Role</Label>
        <Select
          value={formData.role}
          onValueChange={(value) => setFormData({ ...formData, role: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedRole && (
        <div>
          <Label>Permissions</Label>
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">
            <div className="flex flex-wrap gap-2">
              {selectedRole.permissions.map((permission) => (
                <Badge key={permission} variant="secondary">
                  {permission}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Switch
          id="restricted"
          checked={formData.isRestricted}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, isRestricted: checked })
          }
        />
        <Label htmlFor="restricted">Restrict user access</Label>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Update User</Button>
      </DialogFooter>
    </form>
  );
}

// User Details View Component
function UserDetailsView({ user }: { user: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-2">Personal Information</h4>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Department:</strong> {user.department}
            </p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Account Information</h4>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            <p>
              <strong>Status:</strong> {user.status}
            </p>
            <p>
              <strong>Created:</strong>{" "}
              {new Date(user.createdDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Last Login:</strong>{" "}
              {new Date(user.lastLogin).toLocaleString()}
            </p>
            <p>
              <strong>Restricted:</strong> {user.isRestricted ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Permissions</h4>
        <div className="flex flex-wrap gap-2">
          {user.permissions.map((permission: string) => (
            <Badge key={permission} variant="secondary">
              {permission}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Activity Statistics</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">
              {user.jobsCreated}
            </p>
            <p className="text-sm text-gray-600">Jobs Created</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">
              {user.applicationsReviewed}
            </p>
            <p className="text-sm text-gray-600">Applications Reviewed</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {user.permissions.length}
            </p>
            <p className="text-sm text-gray-600">Total Permissions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
