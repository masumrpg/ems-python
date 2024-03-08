import Link from "next/link";
import { CardTitle, CardHeader, CardContent, Card, CardDescription } from "@/components/ui/card";
import { ResponsiveLine } from "@nivo/line";
import { BellIcon, CalendarCheckIcon, CalendarIcon, DollarSignIcon, TrendingUpIcon, UsersIcon } from "lucide-react";
import Image from "next/image";

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
                            <Image
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
                            <Image
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
