
// BG:        #FAFAF7
// Text main: #1F2933
// Text muted: #8A8F98
// Border:    #E5E7EB
// Success:   #43A047
// FB Blue:   #1877F2

import LeadsList from "@/components/LeadsList"

export default function Home() {
  return (
    <div className="flex flex-col max-w-screen-lg mx-auto font-roboto font-medium py-6">

      <div className="flex items-center px-8 pb-4 w-full opacity-70">
        <div className="w-1/12">id</div>
        <div className="w-2/12">date</div>
        <div className="w-4/12">сamp.name</div>
        <div className="w-2/12">creat.id</div>
        <div className="w-2/12">status</div>
        <div className="w-1/12"></div>
      </div>
      <LeadsList />
    </div>
    
  );
}
