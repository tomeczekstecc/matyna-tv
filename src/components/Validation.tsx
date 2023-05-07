// @ts-ignore
export const Validation = ({children, field, errors}) => {
  return (
    <div className="relative">
      {children}
      {errors && errors[field] && (
        <div className="text-red-500">{errors[field]}</div>
      )}
    </div>
  )
}
