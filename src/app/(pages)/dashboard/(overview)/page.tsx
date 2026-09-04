import { CardWrapper } from "@/src/app/components/Dashboard/Card";
import { Chart } from "@/src/app/components/Dashboard/Charts";
import { Suspense } from "react";

export default async function Page() {
  return (
    <section className="flex flex-col gap-4">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 ">
        <Suspense>
          <CardWrapper />
        </Suspense>
      </div>
      <Chart />
      <div className="w-full h-full bg-orange-300 "></div>
    </section>
  );
}
