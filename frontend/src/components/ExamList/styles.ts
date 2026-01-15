export const examListStyles = {
  container: "bg-white rounded-xl p-6 shadow-md",
  title: "m-0 mb-6 text-gray-800 text-xl",
  specialtyGroup: "mb-6 last:mb-0",
  specialtyTitle: "text-sm text-primary uppercase tracking-wide m-0 mb-3 pb-2 border-b-2 border-gray-100",
  examGrid: "grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3",
  examCard: "p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition-all hover:border-primary hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/15",
  examCardSelected: "p-4 border-2 border-primary rounded-lg cursor-pointer transition-all bg-gradient-to-br from-primary/5 to-primary-dark/5",
  examName: "m-0 mb-2 text-[0.95rem] text-gray-800",
  examDescription: "m-0 mb-2 text-[0.8rem] text-gray-500 leading-relaxed",
  examPrice: "m-0 text-[0.9rem] font-semibold text-green-600",
  loading: "text-center p-8 text-gray-500",
} as const;
