export function optionalFormString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function requiredFormString(formData: FormData, key: string, label: string) {
  const value = optionalFormString(formData, key);

  if (!value) {
    throw new Error(`Pflichtfeld fehlt: ${label}`);
  }

  return value;
}
