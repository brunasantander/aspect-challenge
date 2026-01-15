export const appointmentFormStyles = {
  container: "bg-white rounded-xl p-6 shadow-md",
  title: "m-0 mb-6 text-gray-800 text-xl",
  successMessage: "bg-green-100 text-green-800 py-3 px-4 rounded-md mb-4 text-[0.9rem]",
  form: "flex flex-col gap-4",
  formRow: "grid grid-cols-2 gap-4 max-md:grid-cols-1",
  formGroup: "flex flex-col gap-1.5 [&_label]:text-[0.85rem] [&_label]:font-medium [&_label]:text-gray-600 [&_input]:py-3 [&_input]:px-3 [&_input]:border-2 [&_input]:border-gray-200 [&_input]:rounded-md [&_input]:text-[0.95rem] [&_input]:transition-colors [&_input]:w-full [&_input:focus]:outline-none [&_input:focus]:border-primary [&_select]:py-3 [&_select]:px-3 [&_select]:border-2 [&_select]:border-gray-200 [&_select]:rounded-md [&_select]:text-[0.95rem] [&_select]:transition-colors [&_select]:w-full [&_select]:cursor-pointer [&_select]:bg-white [&_select:focus]:outline-none [&_select:focus]:border-primary [&_textarea]:py-3 [&_textarea]:px-3 [&_textarea]:border-2 [&_textarea]:border-gray-200 [&_textarea]:rounded-md [&_textarea]:text-[0.95rem] [&_textarea]:transition-colors [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:min-h-[80px] [&_textarea:focus]:outline-none [&_textarea:focus]:border-primary",
  errorInput: "!border-red-500",
  errorText: "text-[0.8rem] text-red-500",
  submitBtn: "py-3.5 px-6 bg-gradient-to-br from-primary to-primary-dark text-white border-none rounded-md text-base font-semibold cursor-pointer transition-all mt-2 hover:enabled:-translate-y-0.5 hover:enabled:shadow-lg hover:enabled:shadow-primary/35 disabled:opacity-70 disabled:cursor-not-allowed",
} as const;
