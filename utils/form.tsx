import { FormField, InputType, InputWidth } from "@/components/form";

function getInputType(key: string, value: any): InputType {
    if (typeof value === 'number') {
      return 'number';
    }
    if (typeof value === 'boolean') {
      return 'checkbox';
    }
    if (key.toLowerCase().includes('date')) {
      return 'date';
    }
    if (Array.isArray(value)) {
      return 'select';
    }
    return 'text';
  }
  

function getInputWidth(type: InputType): InputWidth {
    switch (type) {
      case 'number':
      case 'checkbox':
        return '25';
      case 'date':
        return '50';
      default:
        return '100';
    }
  }
  
  export function generateFormFields(data: any): FormField[] {
    return Object.keys(data).map(key => {
      const type = getInputType(key, data[key]);
      return {
        id: key,
        type: type,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        width: getInputWidth(type),
        options: Array.isArray(data[key]) ? data[key] : undefined,
      };
    });
  }