export const appStyles = {
  app: "min-h-screen flex flex-col",
  mainContent: "flex-1 max-w-[1200px] w-full mx-auto p-8 max-md:p-4",
  tabs: "flex gap-2 mb-6 max-sm:flex-col",
  tab: "py-3 px-6 border-2 border-gray-200 bg-white rounded-lg text-[0.95rem] font-medium text-gray-500 cursor-pointer transition-all hover:border-primary hover:text-primary max-sm:text-center",
  tabActive: "py-3 px-6 border-2 border-transparent bg-gradient-to-br from-primary to-primary-dark rounded-lg text-[0.95rem] font-medium text-white cursor-pointer transition-all max-sm:text-center",
  scheduleContainer: "grid grid-cols-[1fr_400px] gap-6 items-start max-[900px]:grid-cols-1",
  leftPanel: "min-w-0",
  rightPanel: "sticky top-8 max-[900px]:static",
} as const;
