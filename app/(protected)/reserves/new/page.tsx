import Form from '@/components/form'
import data from '@/json-data/reservations.json'
import { generateFormFields } from '@/utils/form'

export default function NewProject({
  searchParams
}: {
  searchParams: { projectId: string }
}) {
  const formFields = generateFormFields(data[0])
  const projectId = searchParams.projectId

  return <Form initialFormFields={formFields} projectId={projectId}/>
}
