import { getResults } from "@/actions/results/get-results";
import Container from "@/components/container";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { ResultType, columns } from "./_components/columns";
import { DataTable } from "./_components/table";

const Results = async () => {
  const results = (await getResults()) as ResultType[];
  return (
    <Container>
      <div className="w-full">
        <div className="pb-4 w-full flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Results</h1>
            <p className="text-sm font-bold text-muted-foreground">
              Mange all you&apos;r results
            </p>
          </div>
          {/* <PrintResult /> */}
        </div>
        <Separator />
      </div>
      <DataTable data={results} columns={columns} />
    </Container>
  );
};

export default Results;
