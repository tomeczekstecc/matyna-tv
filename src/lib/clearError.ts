export const clearError = (errors, setErrors, key) => {

  if (errors && errors[key]) {
    delete errors[key]
    setErrors({...errors})
  }
}
