"use client";
import getUsersAction, { ResponseUsers } from "@/server/action/getUsersAction";
import {
  Badge,
  Card,
  Grid,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import { useEffect, useState } from "react";
import { FaRegFlag } from "react-icons/fa";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const data = await getUsersAction();
      setData(data);
    })();
  }, []);

  return (
    <>
      <Title>Dashboard</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>Karyawan</Tab>
          <Tab>Overview</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="flex items-center justify-center">
            <Card className="max-w-fit">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Nama Lengkap</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((user: ResponseUsers) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.full_name}</TableCell>
                      <TableCell>
                        {user.is_active ? (
                          <Badge color="emerald" icon={FaRegFlag}>
                            Aktif
                          </Badge>
                        ) : (
                          <Badge color="red" icon={FaRegFlag}>
                            Tidak Aktif
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            </div>
          </TabPanel>
          <TabPanel>
            <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
              <Card>
                {/* Placeholder to set height */}
                <div className="h-28" />
              </Card>
              <Card>
                {/* Placeholder to set height */}
                <div className="h-28" />
              </Card>
              <Card>
                {/* Placeholder to set height */}
                <div className="h-28" />
              </Card>
            </Grid>
            <div className="mt-6">
              <Card>
                <div className="h-80" />
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
}
