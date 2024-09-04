import Form from '@/components/form'
import data from '@/json-data/operations.json'
import { generateFormFields } from '@/utils/form'

export default function Operation({ params }: { params: { id: string } }) {
  const formFields = generateFormFields(data[0])
  const initialValues = data.find((item) => item.id === params.id)

  return <Form initialFormFields={formFields} initialValues={initialValues} />
}
