import Form from "@/components/form";
import data from "@/json-data/reservations.json";
import { generateFormFields } from "@/utils/form";

export default function NewProject() {
  const formFields = generateFormFields(data[0]);
  return (
    <Form initialFormFields={formFields}/>
  )
}