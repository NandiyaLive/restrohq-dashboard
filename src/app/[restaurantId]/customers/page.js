"use client";

import PageHeader from "@/components/dashboard/page-header";
import { DataTable } from "@/components/ui/data-table";
import { useGetCustomersQuery } from "@/hooks/use-customer";
import { useRouter } from "next/navigation";
import { columns } from "./components/columns";

const Page = ({ restaurantId }) => {
  const router = useRouter();

  const { data, isLoading } = useGetCustomersQuery(restaurantId);

  const customers = data?.customers || [];

  return (
    <main className="p-8">
      <div className="flex justify-between">
        <PageHeader
          title="Customers"
          subtitle="Manage your restaurant's customers"
        />
      </div>

      <DataTable
        columns={columns}
        data={customers}
        keyword={"name"}
        isLoading={isLoading}
      />
    </main>
  );
};

export default Page;
