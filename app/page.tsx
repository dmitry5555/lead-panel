


// BG:        #FAFAF7
// Text main: #1F2933
// Text muted: #8A8F98
// Border:    #E5E7EB
// Success:   #43A047
// FB Blue:   #1877F2

import LeadRow from "@/components/LeadRow"

export default function Home() {
  return (
    <div className="flex flex-col bg-[#F4F4EE] divide-y divide-[#E5E7EB]">
      <div className="flex gap-4 px-8 py-3 w-full font-medium text-stone-100 bg-stone-900/90 border-b border-stone-800">
        <div className="w-1/12">ID</div>
        <div className="w-2/12">Источник</div>
        <div className="w-2/12">Дата</div>
        <div className="w-2/12">Camp.Name</div>
        <div className="w-2/12">Creat.ID</div>
        <div className="w-2/12">Статус</div>
      </div>
      <LeadRow />
      <LeadRow />
    </div>
    
  );
}
