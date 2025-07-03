interface FieldsDefinition {
  name?: string;
  description?: string;
  category?: string;
  year?: number;
  langs?: string;
}

export interface UpdateRequestBody {
  parameters: string;
  dataToUpdate: FieldsDefinition;
}
