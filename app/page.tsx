


// BG:        #FAFAF7
// Text main: #1F2933
// Text muted: #8A8F98
// Border:    #E5E7EB
// Success:   #43A047
// FB Blue:   #1877F2

import LeadRow from "@/components/LeadRow"

export default function Home() {
  return (
    <div className="flex flex-col max-w-screen-lg mx-auto font-roboto">

      <div className="flex px-8 pt-8 pb-6 w-full font-medium text-slate-400 ">
        <div className="w-1/12">ID</div>
        <div className="w-2/12">Дата</div>
        <div className="w-2/12">Camp.Name</div>
        <div className="w-2/12">Creat.ID</div>
        <div className="w-2/12">Статус</div>
      </div>
      <div className="rounded-md border border-[#F4F4EE]">
        <LeadRow />
        <LeadRow />
      </div>
    </div>
    
  );
}
