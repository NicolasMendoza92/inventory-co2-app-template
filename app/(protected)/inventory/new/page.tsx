'use client'

import React, { useState, useCallback } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  GripVertical,
  SettingsIcon,
  XIcon,
  Pencil,
  Save,
  Backpack,
  ArrowBigLeftDashIcon,
  MoveLeft
} from 'lucide-react'
import { useLanguage } from '@/hooks/LanguageProvider'
import Link from 'next/link'

export type InputType = 'text' | 'number' | 'date' | 'checkbox' | 'select'
export type InputWidth = '25' | '50' | '75' | '100'

export interface FormField {
  id: string
  type: InputType
  label: string
  options?: string[]
  width: InputWidth
}

export const InputComponent: React.FC<{
  field: FormField
  value: any
  onChange: (value: any) => void
}> = ({ field, value, onChange }) => {
  switch (field.type) {
    case 'text':
    case 'number':
    case 'date':
      return (
        <Input
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full"
        />
      )
    case 'checkbox':
      return <Checkbox checked={value} onCheckedChange={onChange} />
    case 'select':
      return (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona una opción" />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    default:
      return null
  }
}

export const calculateWidth = (width: InputWidth) => {
  switch (width) {
    case '25':
      return 'w-[calc(25%-0.5rem)]'
    case '50':
      return 'w-[calc(50%-0.5rem)]'
    case '75':
      return 'w-[calc(75%-0.5rem)]'
    case '100':
      return 'w-full'
  }
}

interface DraggableFieldProps {
  field: FormField
  index: number
  moveField: (dragIndex: number, hoverIndex: number) => void
  isEditing: boolean
  onEdit: () => void
  onDelete: () => void
  value: any
  onChange: (value: any) => void
}

const DraggableField: React.FC<DraggableFieldProps> = ({
  field,
  index,
  moveField,
  isEditing,
  onEdit,
  onDelete,
  value,
  onChange
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'FIELD',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, drop] = useDrop({
    accept: 'FIELD',
    hover(item: { index: number }, monitor) {
      if (!drag) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      moveField(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })

  return (
    <div
      ref={(node) => {
        drag(drop(node))
      }}
      className={`bg-card p-4 rounded-lg shadow ${calculateWidth(
        field.width
      )} mb-4 ${isDragging ? 'opacity-50' : ''} ${
        isEditing ? 'cursor-move' : ''
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          {isEditing && (
            <div className="mr-2 cursor-move">
              <GripVertical size={20} />
            </div>
          )}
          <Label>{field.label}</Label>
        </div>
        {isEditing && (
          <div>
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <SettingsIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <InputComponent field={field} value={value} onChange={onChange} />
    </div>
  )
}

export default function Component() {
  const [formFields, setFormFields] = useState<FormField[]>([])
  const [formValues, setFormValues] = useState<Record<string, any>>({})
  const [editingField, setEditingField] = useState<FormField | null>(null)
  const [newFieldType, setNewFieldType] = useState<InputType>('text')
  const [newFieldWidth, setNewFieldWidth] = useState<InputWidth>('50')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { t } = useLanguage()

  const handleInputChange = (id: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [id]: value }))
  }

  const addField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      type: newFieldType,
      label: `Nuevo ${newFieldType}`,
      width: newFieldWidth,
      options: newFieldType === 'select' ? ['Opción 1', 'Opción 2'] : undefined
    }
    setFormFields((prev) => [...prev, newField])
  }

  const updateField = (updatedField: FormField) => {
    setFormFields((prev) =>
      prev.map((field) => (field.id === updatedField.id ? updatedField : field))
    )
    setEditingField(null)
    setDialogOpen(false)
  }

  const deleteField = (id: string) => {
    setFormFields((prev) => prev.filter((field) => field.id !== id))
  }

  const moveField = useCallback((dragIndex: number, hoverIndex: number) => {
    setFormFields((prevFields) => {
      const newFields = [...prevFields]
      const [removed] = newFields.splice(dragIndex, 1)
      newFields.splice(hoverIndex, 0, removed)
      return newFields
    })
  }, [])

  const renderFormFields = () => {
    let row: JSX.Element[] = []
    let availableWidth = 100
    const rows: JSX.Element[] = []

    formFields.forEach((field, index) => {
      const fieldWidth = parseInt(field.width, 10)

      if (fieldWidth > availableWidth) {
        if (row.length > 0) {
          rows.push(
            <div key={`row-${rows.length}`} className="flex justify-between">
              {row}
            </div>
          )
        }
        row = []
        availableWidth = 100
      }

      row.push(
        <DraggableField
          key={field.id}
          field={field}
          index={index}
          moveField={moveField}
          isEditing={isEditing}
          onEdit={() => {
            setEditingField(field)
            setDialogOpen(true)
          }}
          onDelete={() => deleteField(field.id)}
          value={formValues[field.id] || ''}
          onChange={(value) => handleInputChange(field.id, value)}
        />
      )

      availableWidth -= fieldWidth

      if (availableWidth <= 0) {
        rows.push(
          <div key={`row-${rows.length}`} className="flex justify-between">
            {row}
          </div>
        )
        row = []
        availableWidth = 100
      }
    })

    if (row.length > 0) {
      rows.push(
        <div key={`row-${rows.length}`} className="flex justify-between">
          {row}
        </div>
      )
    }

    return rows
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <Link href="/inventory" legacyBehavior passHref>
            <Button variant="outline" size="icon">
              <MoveLeft className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Formulario Personalizable</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? (
              <Save className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Pencil className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>
        {isEditing && (
          <div className="mb-4 p-4 bg-card rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Agregar nuevo campo</h2>
            <div className="flex space-x-4">
              <Select
                value={newFieldType}
                onValueChange={(value: InputType) => setNewFieldType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de campo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Texto</SelectItem>
                  <SelectItem value="number">Número</SelectItem>
                  <SelectItem value="date">Fecha</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                  <SelectItem value="select">Select</SelectItem>
                </SelectContent>
              </Select>
              <RadioGroup
                value={newFieldWidth}
                onValueChange={(value: InputWidth) => setNewFieldWidth(value)}
                className="flex space-x-2"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="25" id="w1" />
                    <Label htmlFor="w1">25%</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="50" id="w2" />
                    <Label htmlFor="w1">50%</Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="75" id="w3" />
                    <Label htmlFor="w1">75%</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="100" id="w2" />
                    <Label htmlFor="w2">100%</Label>
                  </div>
                </div>
              </RadioGroup>
              <Button onClick={addField}>Agregar Campo</Button>
            </div>
          </div>
        )}

        <div className="space-y-4">{renderFormFields()}</div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Campo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="label">Etiqueta</Label>
                <Input
                  id="label"
                  value={editingField?.label || ''}
                  onChange={(e) =>
                    setEditingField((prev) =>
                      prev ? { ...prev, label: e.target.value } : null
                    )
                  }
                />
              </div>
              {editingField?.type === 'select' && (
                <div>
                  <Label htmlFor="options">Opciones (separadas por coma)</Label>
                  <Input
                    id="options"
                    value={editingField?.options?.join(',') || ''}
                    onChange={(e) =>
                      setEditingField((prev) =>
                        prev
                          ? {
                              ...prev,
                              options: e.target.value.split(',')
                            }
                          : null
                      )
                    }
                  />
                </div>
              )}
              <RadioGroup
                value={editingField?.width || '50'}
                onValueChange={(value: InputWidth) =>
                  setEditingField((prev) =>
                    prev ? { ...prev, width: value } : null
                  )
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="25" id="w1" />
                  <Label htmlFor="w1">25%</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="50" id="w2" />
                  <Label htmlFor="w1">50%</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="75" id="w3" />
                  <Label htmlFor="w1">75%</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="100" id="w2" />
                  <Label htmlFor="w2">100%</Label>
                </div>
              </RadioGroup>
              <Button onClick={() => editingField && updateField(editingField)}>
                Guardar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DndProvider>
  )
}
