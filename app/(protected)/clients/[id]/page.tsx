import Form from "@/components/form";
import data from "@/json-data/clients.json";
import { generateFormFields } from "@/utils/form";

export default function NewProject({ params }: { params: any }) {
  const formFields = generateFormFields(data[0]);
  const initialValues = data.find((item) => item.id === params.id);
  return (
    <Form initialFormFields={formFields} initialValues={initialValues}/>
  )
}