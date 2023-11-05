import Container from "@/components/container";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./_components/table";
import { PatientType, columns } from "./_components/columns";
import { getPatients } from "@/actions/patients/get-patients";
import { AddPatientButton } from "./_components/add-patient-button";

interface PatientsProps {}

const Patients: React.FC<PatientsProps> = async () => {
  const data = (await getPatients()) as PatientType[];
  return (
    <Container>
      <div className="w-full">
        <div className="pb-4 w-full flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
            <p className="text-sm font-bold text-muted-foreground">
              Mange all you&apos;r patients
            </p>
          </div>
          <AddPatientButton />
        </div>
        <Separator />
      </div>
      <DataTable columns={columns} data={data} />
    </Container>
  );
};

export default Patients;
