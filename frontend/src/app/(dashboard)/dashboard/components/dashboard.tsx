import Link from "next/link";
import { CardTitle, CardHeader, CardContent, Card, CardDescription } from "@/components/ui/card";
import { ResponsiveLine } from "@nivo/line";

export function Dashboard() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                        <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">250</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
                        <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">200</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">On Leave Employees</CardTitle>
                        <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">50</div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                        <BellIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <ul className="grid gap-2 text-sm">
                            <li>
                                <Link className="font-medium underline" href="#">
                    New task assigned
                                </Link>
                                <p className="text-xs text-gray-500 dark:text-gray-400">2 min ago</p>
                            </li>
                            <li>
                                <Link className="font-medium underline" href="#">
                    Upcoming meeting
                                </Link>
                                <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
                            </li>
                            <li>
                                <Link className="font-medium underline" href="#">
                    Holiday announcement
                                </Link>
                                <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                        <CalendarCheckIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <LineChart className="h-[200px] aspect-[2/1]" />
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Work Plans</CardTitle>
                    <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 text-sm">
                        <div className="flex items-center">
                            <div>Design review meeting</div>
                            <div className="ml-auto">10:00 AM</div>
                        </div>
                        <div className="flex items-center">
                            <div>Project presentation</div>
                            <div className="ml-auto">2:00 PM</div>
                        </div>
                        <div className="flex items-center">
                            <div>Team building activity</div>
                            <div className="ml-auto">4:00 PM</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Calendar</CardTitle>
                        <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-2 text-sm">
                            <div className="flex items-center">
                                <div>Design review meeting</div>
                                <div className="ml-auto">10:00 AM</div>
                            </div>
                            <div className="flex items-center">
                                <div>Project presentation</div>
                                <div className="ml-auto">2:00 PM</div>
                            </div>
                            <div className="flex items-center">
                                <div>Team building activity</div>
                                <div className="ml-auto">4:00 PM</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Performance</CardTitle>
                        <TrendingUpIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <CurvedlineChart className="h-[200px] aspect-[2/1]" />
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Payroll</CardTitle>
                    <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2 text-sm">
                        <div className="flex items-center">
                            <div>Design review meeting</div>
                            <div className="ml-auto">10:00 AM</div>
                        </div>
                        <div className="flex items-center">
                            <div>Project presentation</div>
                            <div className="ml-auto">2:00 PM</div>
                        </div>
                        <div className="flex items-center">
                            <div>Team building activity</div>
                            <div className="ml-auto">4:00 PM</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>Latest News</CardTitle>
                    <CardDescription>Read the latest news and updates</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 text-sm">
                        <div className="flex items-start gap-4">
                            <img
                                alt="Thumbnail"
                                className="rounded-md"
                                height="100"
                                src="/placeholder.svg"
                                style={{
                                    aspectRatio: "100/100",
                                    objectFit: "cover"
                                }}
                                width="100"
                            />
                            <div>
                                <h3 className="font-semibold">New Employee Orientation</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Join us for the new employee orientation session on Monday, 10th July 2023 at 10:00 AM in the
                    conference room. Refreshments will be provided.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <img
                                alt="Thumbnail"
                                className="rounded-md"
                                height="100"
                                src="/placeholder.svg"
                                style={{
                                    aspectRatio: "100/100",
                                    objectFit: "cover"
                                }}
                                width="100"
                            />
                            <div>
                                <h3 className="font-semibold">Quarterly Townhall</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                    The quarterly townhall meeting will be held on Friday, 14th July 2023 at 3:00 PM. The management
                    will provide updates on the company&apos;s progress and future plans. All employees are encouraged to
                    attend.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}


function SearchIcon({...props}) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}


function UsersIcon({...props}) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}


function BellIcon({...props}) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
    );
}


function CalendarCheckIcon({...props}) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
            <path d="m9 16 2 2 4-4" />
        </svg>
    );
}


function LineChart({...props}) {
    return (
        <div {...props}>
            <ResponsiveLine
                data={[
                    {
                        id: "Desktop",
                        data: [
                            { x: "Jan", y: 43 },
                            { x: "Feb", y: 137 },
                            { x: "Mar", y: 61 },
                            { x: "Apr", y: 145 },
                            { x: "May", y: 26 },
                            { x: "Jun", y: 154 }
                        ]
                    },
                    {
                        id: "Mobile",
                        data: [
                            { x: "Jan", y: 60 },
                            { x: "Feb", y: 48 },
                            { x: "Mar", y: 177 },
                            { x: "Apr", y: 78 },
                            { x: "May", y: 96 },
                            { x: "Jun", y: 204 }
                        ]
                    }
                ]}
                margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
                xScale={{
                    type: "point"
                }}
                yScale={{
                    type: "linear"
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 16
                }}
                axisLeft={{
                    tickSize: 0,
                    tickValues: 5,
                    tickPadding: 16
                }}
                colors={["#2563eb", "#e11d48"]}
                pointSize={6}
                useMesh={true}
                gridYValues={6}
                theme={{
                    tooltip: {
                        chip: {
                            borderRadius: "9999px"
                        },
                        container: {
                            fontSize: "12px",
                            textTransform: "capitalize",
                            borderRadius: "6px"
                        }
                    },
                    grid: {
                        line: {
                            stroke: "#f3f4f6"
                        }
                    }
                }}
                role="application"
            />
        </div>
    );
}


function CalendarIcon({...props}) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
    );
}


function TrendingUpIcon({...props}) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
        </svg>
    );
}


function CurvedlineChart({...props}) {
    return (
        <div {...props}>
            <ResponsiveLine
                data={[
                    {
                        id: "Desktop",
                        data: [
                            { x: "Jan", y: 43 },
                            { x: "Feb", y: 137 },
                            { x: "Mar", y: 61 },
                            { x: "Apr", y: 145 },
                            { x: "May", y: 26 },
                            { x: "Jun", y: 154 }
                        ]
                    },
                    {
                        id: "Mobile",
                        data: [
                            { x: "Jan", y: 60 },
                            { x: "Feb", y: 48 },
                            { x: "Mar", y: 177 },
                            { x: "Apr", y: 78 },
                            { x: "May", y: 96 },
                            { x: "Jun", y: 204 }
                        ]
                    }
                ]}
                margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
                xScale={{
                    type: "point"
                }}
                yScale={{
                    type: "linear",
                    min: 0,
                    max: "auto"
                }}
                curve="monotoneX"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 16
                }}
                axisLeft={{
                    tickSize: 0,
                    tickValues: 5,
                    tickPadding: 16
                }}
                colors={["#2563eb", "#e11d48"]}
                pointSize={6}
                useMesh={true}
                gridYValues={6}
                theme={{
                    tooltip: {
                        chip: {
                            borderRadius: "9999px"
                        },
                        container: {
                            fontSize: "12px",
                            textTransform: "capitalize",
                            borderRadius: "6px"
                        }
                    },
                    grid: {
                        line: {
                            stroke: "#f3f4f6"
                        }
                    }
                }}
                role="application"
            />
        </div>
    );
}


function DollarSignIcon({...props}) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    );
}
