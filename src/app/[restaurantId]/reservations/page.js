"use client";

import PageHeader from "@/components/dashboard/page-header";
import { DataTable } from "@/components/ui/data-table";
import { useRouter } from "next/navigation";
import { columns } from "./components/columns";
import { useGetReservationsQuery } from "@/hooks/use-reservation";
import Loader from "@/components/common/loader";

const Page = ({ restaurantId }) => {
  const router = useRouter();

  const { data, isLoading } = useGetReservationsQuery(restaurantId);

  if (isLoading) {
    return <Loader />;
  }

  const reservations = data?.reservations || [];

  return (
    <main className="p-8">
      <div className="flex justify-between">
        <PageHeader
          title="Reservations"
          subtitle="Manage your restaurant's reservations"
        />
      </div>

      <DataTable columns={columns} data={reservations} />
    </main>
  );
};

export default Page;
