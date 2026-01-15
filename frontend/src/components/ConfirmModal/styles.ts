export const confirmModalStyles = {
  overlay: "fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] animate-fadeIn",
  container: "bg-white rounded-xl w-[90%] max-w-[400px] shadow-2xl animate-slideIn overflow-hidden",
  header: "py-5 px-6 border-b border-gray-200 [&_h3]:m-0 [&_h3]:text-lg [&_h3]:text-gray-800",
  body: "p-6 [&_p]:m-0 [&_p]:text-gray-600 [&_p]:text-[0.95rem] [&_p]:leading-relaxed",
  footer: "flex gap-3 py-4 px-6 bg-gray-50 border-t border-gray-200 justify-end",
  btnCancel: "py-2.5 px-5 rounded-md text-[0.9rem] font-medium cursor-pointer transition-all bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-100",
  btnConfirm: "py-2.5 px-5 rounded-md text-[0.9rem] font-medium cursor-pointer transition-all border-none text-white",
  btnConfirmDanger: "py-2.5 px-5 rounded-md text-[0.9rem] font-medium cursor-pointer transition-all border-none text-white bg-red-500 hover:bg-red-600",
  btnConfirmWarning: "py-2.5 px-5 rounded-md text-[0.9rem] font-medium cursor-pointer transition-all border-none text-white bg-amber-500 hover:bg-amber-600",
  btnConfirmInfo: "py-2.5 px-5 rounded-md text-[0.9rem] font-medium cursor-pointer transition-all border-none text-white bg-blue-500 hover:bg-blue-600",
} as const;
