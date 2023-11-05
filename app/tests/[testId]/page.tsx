import prismadb from "@/lib/prisma";
import TestForm from "./_components/test-form";
import { TestNameForm } from "./_components/test-name-form";
import SubTestsComponent from "./_components/sub-tests-component";

interface TestPageProps {
  params: { testId: string };
}

const TestPage: React.FC<TestPageProps> = async ({ params }) => {
  const test = await prismadb.test.findUnique({
    where: {
      id: params.testId,
    },
    include: {
      subTests: {
        include: {
          options: {
            orderBy: {
              order: "asc",
            },
          },
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (!test) return <div>404</div>;

  return (
    <div className="w-screen gap-4 p-4 grid grid-cols-1  md:grid-cols-9">
      {/* <TestForm test={test} /> */}
      <div className="col-span-1 md:col-span-4">
        <TestNameForm test={test} />
      </div>
      <div className="col-span-1 md:col-span-5">
        <SubTestsComponent subTests={test.subTests} />
      </div>
    </div>
  );
};

export default TestPage;
